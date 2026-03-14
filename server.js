const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Setup upload directory
const uploadDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(uploadDir));

app.use(session({
    secret: 'helphive_secret_key_2026',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 86400000 } // 1 day
}));

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => cb(null, uploadDir),
        filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
    })
});

// Bad word filter list
const BANNED_WORDS = ['scam', 'spam', 'hate', 'badword1'];

// Middleware to check authentication
const isAuth = (req, res, next) => {
    if (req.session && req.session.userId) return next();
    res.status(401).json({ error: 'Unauthorized' });
};

// Middleware to check admin role
const isAdmin = (req, res, next) => {
    if (req.session && req.session.role === 'admin') return next();
    res.status(403).json({ error: 'Forbidden' });
};

// -------- AUTH ROUTES --------
app.post('/api/auth/register', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || username.length < 4) {
        return res.status(400).json({ error: 'Username must be at least 4 characters long' });
    }
    if (!password || password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    const lowerUsername = username.toLowerCase();
    const hasBadWord = BANNED_WORDS.some(word => lowerUsername.includes(word));
    if (hasBadWord) {
        return res.status(400).json({ error: 'Username contains inappropriate words' });
    }

    try {
        const hash = await bcrypt.hash(password, 10);
        db.run('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hash], function (err) {
            if (err) return res.status(400).json({ error: 'Username or email already exists' });
            res.status(201).json({ message: 'User registered successfully', userId: this.lastID });
        });
    } catch (e) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;
    db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
        if (err || !user) return res.status(400).json({ error: 'Invalid username or password' });

        const match = await bcrypt.compare(password, user.password);
        if (match) {
            req.session.userId = user.id;
            req.session.username = user.username;
            req.session.role = user.role;
            res.json({ message: 'Logged in', user: { id: user.id, username: user.username, role: user.role } });
        } else {
            res.status(400).json({ error: 'Invalid username or password' });
        }
    });
});

app.post('/api/auth/logout', (req, res) => {
    req.session.destroy();
    res.json({ message: 'Logged out' });
});

app.get('/api/auth/me', (req, res) => {
    if (req.session.userId) {
        db.get('SELECT id, username, email, kindness_score, role FROM users WHERE id = ?', [req.session.userId], (err, row) => {
            if (row) res.json(row);
            else res.status(401).json({ error: 'User not found' });
        });
    } else {
        res.status(401).json({ error: 'Not authenticated' });
    }
});

// -------- REQUEST ROUTES --------
app.get('/api/requests', (req, res) => {
    const userId = req.session ? req.session.userId : null;
    let query = `SELECT r.*, u.username, u.kindness_score
            FROM requests r 
            JOIN users u ON r.user_id = u.id 
            WHERE r.status = 'approved'`;
    let params = [];

    if (userId) {
        query += ` OR r.user_id = ?`;
        params.push(userId);
    }

    query += ` ORDER BY r.created_at DESC`;

    db.all(query, params, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.get('/api/requests/:id', (req, res) => {
    db.get(`SELECT r.*, u.username, u.kindness_score
            FROM requests r JOIN users u ON r.user_id = u.id WHERE r.id = ?`, [req.params.id], (err, row) => {
        if (err || !row) return res.status(404).json({ error: 'Request not found' });
        res.json(row);
    });
});

app.post('/api/requests', isAuth, upload.single('proof_image'), (req, res) => {
    const { title, description, category, goal_amount, location } = req.body;
    let proof_image = req.file ? '/uploads/' + req.file.filename : null;
    let verification_level = proof_image ? 2 : 1;

    const goal = goal_amount ? parseFloat(goal_amount) : 0;

    db.run(`INSERT INTO requests (user_id, title, description, category, goal_amount, verification_level, location, proof_image, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'approved')`,
        [req.session.userId, title, description, category, goal, verification_level, location, proof_image],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: 'Request posted successfully!', requestId: this.lastID });
        });
});

// -------- INTERACTION ROUTES --------
app.post('/api/requests/:id/donate', isAuth, (req, res) => {
    const { amount } = req.body;
    const reqId = req.params.id;
    const donorId = req.session.userId;
    const amt = parseFloat(amount);

    db.serialize(() => {
        db.run('INSERT INTO donations (donor_id, request_id, amount) VALUES (?, ?, ?)', [donorId, reqId, amt]);
        db.run('UPDATE requests SET current_amount = current_amount + ? WHERE id = ?', [amt, reqId]);
        db.run('UPDATE users SET kindness_score = kindness_score + 10 WHERE id = ?', [donorId], (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Donation successful! +10 Kindness Score' });
        });
    });
});

app.post('/api/requests/:id/skill', isAuth, (req, res) => {
    const { skill_description } = req.body;
    const reqId = req.params.id;
    const helperId = req.session.userId;

    db.serialize(() => {
        db.run('INSERT INTO skills (helper_id, request_id, skill_description) VALUES (?, ?, ?)', [helperId, reqId, skill_description]);
        db.run('UPDATE users SET kindness_score = kindness_score + 15 WHERE id = ?', [helperId], (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Skill offered! +15 Kindness Score' });
        });
    });
});

app.post('/api/requests/:id/item', isAuth, (req, res) => {
    const helperId = req.session.userId;
    db.run('UPDATE users SET kindness_score = kindness_score + 10 WHERE id = ?', [helperId], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Item donation offered! +10 Kindness Score' });
    });
});

// -------- PROFILE ROUTE --------
app.get('/api/users/:id', (req, res) => {
    db.get('SELECT id, username, kindness_score, role, created_at FROM users WHERE id = ?', [req.params.id], (err, user) => {
        if (err || !user) return res.status(404).json({ error: 'User not found' });

        db.all(`SELECT r.*, u.username, u.kindness_score FROM requests r JOIN users u ON r.user_id = u.id WHERE r.user_id = ? ORDER BY r.created_at DESC`, [user.id], (err, requests) => {
            db.get('SELECT SUM(amount) as total FROM donations WHERE donor_id = ?', [user.id], (err, donationsRow) => {
                db.all('SELECT * FROM skills WHERE helper_id = ?', [user.id], (err, skills) => {
                    const profile = {
                        ...user,
                        requests,
                        total_donated: donationsRow ? donationsRow.total || 0 : 0,
                        skills
                    };
                    res.json(profile);
                });
            });
        });
    });
});

// -------- ADMIN ROUTES --------
app.get('/api/admin/requests', isAdmin, (req, res) => {
    db.all(`SELECT r.*, u.username FROM requests r JOIN users u ON r.user_id = u.id ORDER BY r.created_at DESC`, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.post('/api/admin/requests/:id/status', isAdmin, (req, res) => {
    const { status, verification_level } = req.body;
    let query = 'UPDATE requests SET status = ?';
    let params = [status];
    if (verification_level) {
        query += ', verification_level = ?';
        params.push(verification_level);
    }
    query += ' WHERE id = ?';
    params.push(req.params.id);

    db.run(query, params, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Request updated' });
    });
});

app.listen(PORT, () => {
    console.log(`HelpHive server running on port ${PORT}`);
});
