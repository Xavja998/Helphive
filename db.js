const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    // Users table
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        kindness_score INTEGER DEFAULT 0,
        role TEXT DEFAULT 'user',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Requests table
    db.run(`CREATE TABLE IF NOT EXISTS requests (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        category TEXT NOT NULL,
        goal_amount REAL DEFAULT 0,
        current_amount REAL DEFAULT 0,
        verification_level INTEGER DEFAULT 1,
        status TEXT DEFAULT 'pending',
        proof_image TEXT,
        location TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
    )`);

    // Donations table
    db.run(`CREATE TABLE IF NOT EXISTS donations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        donor_id INTEGER,
        request_id INTEGER,
        amount REAL NOT NULL,
        date DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (donor_id) REFERENCES users (id),
        FOREIGN KEY (request_id) REFERENCES requests (id)
    )`);

    // Skills table
    db.run(`CREATE TABLE IF NOT EXISTS skills (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        helper_id INTEGER,
        request_id INTEGER,
        skill_description TEXT NOT NULL,
        status TEXT DEFAULT 'offered',
        FOREIGN KEY (helper_id) REFERENCES users (id),
        FOREIGN KEY (request_id) REFERENCES requests (id)
    )`);

    // Admin table initialization logic
    // Create default admin if not exists
    const bcrypt = require('bcrypt');
    db.get("SELECT id FROM users WHERE username = 'admin'", (err, row) => {
        if (!row) {
            const hash = bcrypt.hashSync('admin123', 10);
            db.run("INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
                ['admin', 'admin@helphive.com', hash, 'admin'], function () {

                    // Seed a few dummy users
                    const hashAngel = bcrypt.hashSync('angel123', 10);
                    db.run("INSERT INTO users (username, email, password, kindness_score) VALUES (?, ?, ?, ?)",
                        ['AngelBees', 'angel@helphive.com', hashAngel, 1240], function () {
                            const angelId = this.lastID;

                            db.run("INSERT INTO requests (user_id, title, description, category, goal_amount, status, verification_level) VALUES (?, ?, ?, ?, ?, ?, ?)",
                                [angelId, 'Urgent: medical bills for my son', 'My son recently broke his arm and we need 5000 to cover the remaining hospital bills.', 'Angel Help', 5000, 'approved', 2]);

                            db.run("INSERT INTO requests (user_id, title, description, category, status, verification_level) VALUES (?, ?, ?, ?, ?, ?)",
                                [angelId, 'Looking for old winter clothes', 'My little sister needs warm clothes for the upcoming school trip, any old jackets would be amazing.', 'Item Help', 'approved', 1]);
                        });

                    const hashJohn = bcrypt.hashSync('johndoe123', 10);
                    db.run("INSERT INTO users (username, email, password, kindness_score) VALUES (?, ?, ?, ?)",
                        ['JohnDoe', 'john@helphive.com', hashJohn, 890], function () {
                            const johnId = this.lastID;

                            db.run("INSERT INTO requests (user_id, title, description, category, status, verification_level) VALUES (?, ?, ?, ?, ?, ?)",
                                [johnId, 'Need help fixing my roof leak', 'There is a small leak in my roof, looking for someone with carpentry skills who can patch it up.', 'Skill Help', 'approved', 1]);

                            db.run("INSERT INTO requests (user_id, title, description, category, status, verification_level) VALUES (?, ?, ?, ?, ?, ?)",
                                [johnId, 'Seeking canned goods for local shelter', 'The local shelter is running very low on non-perishable food, would love to get a couple boxes of canned goods.', 'Item Help', 'approved', 1]);
                        });
                });
        }
    });
});

module.exports = db;
