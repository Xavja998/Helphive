// Views content HTML logic
const views = {
    login: `
        <div class="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden mt-10 border border-gray-100">
            <div class="bg-primary p-6 text-center">
                <i class="fa-solid fa-bug text-4xl text-accent mb-2"></i>
                <h2 class="text-2xl font-black text-accent">Welcome Back</h2>
                <p class="text-accent/80 text-sm">Login to your HelpHive account</p>
            </div>
            <div class="p-8">
                <form id="form-login" class="space-y-5">
                    <div id="login-error" class="hidden bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-200"></div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input type="text" id="login-username" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition" required>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input type="password" id="login-password" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition" required>
                    </div>
                    <button type="submit" class="w-full bg-accent text-white font-bold py-3 rounded-lg hover:bg-gray-800 transition shadow-md">Login to Hive</button>
                </form>
                <div class="mt-6 text-center text-sm text-gray-600">
                    Don't have an account? <a href="#register" class="text-primary font-bold hover:underline">Join Now</a>
                </div>
            </div>
        </div>
    `,
    register: `
        <div class="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden mt-6 border border-gray-100">
            <div class="bg-primary p-6 text-center">
                <i class="fa-solid fa-user-plus text-4xl text-accent mb-2"></i>
                <h2 class="text-2xl font-black text-accent">Join The Hive</h2>
                <p class="text-accent/80 text-sm">Create an account to help and be helped</p>
            </div>
            <div class="p-8">
                <form id="form-register" class="space-y-4">
                    <div id="register-error" class="hidden bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-200"></div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Username <span class="text-xs text-gray-400 font-normal">(Min 4 chars)</span></label>
                        <input type="text" id="reg-username" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition" required minlength="4">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input type="email" id="reg-email" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition" required>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Password <span class="text-xs text-gray-400 font-normal">(Min 6 chars)</span></label>
                        <input type="password" id="reg-password" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition" required minlength="6">
                    </div>
                    <button type="submit" class="w-full bg-primary text-accent font-bold py-3 rounded-lg hover:bg-yellow-400 transition shadow-md mt-2">Create Account</button>
                </form>
                <div class="mt-6 text-center text-sm text-gray-600">
                    Already have an account? <a href="#login" class="text-accent font-bold hover:underline">Login Here</a>
                </div>
            </div>
        </div>
    `,
    home: `
        <!-- Create Post Box -->
        <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex space-x-4 items-center cursor-pointer hover:shadow-md transition" onclick="window.location.hash='#create'">
            <div class="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center text-gray-500 font-bold" id="post-avatar">?</div>
            <div class="flex-grow bg-gray-100 rounded-full px-4 py-3 text-gray-500 hover:bg-gray-200 transition">
                Need help with something, or offering help?
            </div>
            <div class="flex space-x-2">
                <button class="p-2 text-primary hover:bg-yellow-50 rounded-full transition"><i class="fa-solid fa-image"></i></button>
            </div>
        </div>
        
        <!-- Feed filters -->
        <div class="flex space-x-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
            <button class="px-4 py-2 rounded-full font-bold text-sm bg-accent text-white shadow-sm whitespace-nowrap">All Helps</button>
            <button class="px-4 py-2 rounded-full font-semibold text-sm bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 whitespace-nowrap"><i class="fa-solid fa-money-bill-wave text-green-500 mr-1"></i> Angel Help</button>
            <button class="px-4 py-2 rounded-full font-semibold text-sm bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 whitespace-nowrap"><i class="fa-solid fa-screwdriver-wrench text-blue-500 mr-1"></i> Skill Help</button>
            <button class="px-4 py-2 rounded-full font-semibold text-sm bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 whitespace-nowrap"><i class="fa-solid fa-box text-orange-500 mr-1"></i> Item Help</button>
        </div>

        <div id="feed-container" class="space-y-6">
            <!-- Feed items will be injected here -->
            <div class="text-center py-10 text-gray-400"><i class="fa-solid fa-circle-notch fa-spin text-3xl"></i></div>
        </div>
    `,
    create: `
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="p-4 border-b border-gray-100 flex items-center justify-between">
                <h2 class="font-bold text-lg"><i class="fa-solid fa-pen-to-square text-primary mr-2"></i>Create Help Request</h2>
                <a href="#home" class="text-gray-400 hover:text-red-500"><i class="fa-solid fa-xmark text-xl"></i></a>
            </div>
            <div class="p-6">
                <form id="form-create" class="space-y-5">
                    <div id="create-msg" class="hidden p-3 rounded-lg text-sm mb-4"></div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">I need help with... (Title)</label>
                        <input type="text" id="create-title" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" placeholder="e.g., Groceries for the week, Plumber needed" required>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select id="create-category" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" required onchange="toggleGoalAmount(this.value)">
                            <option value="Angel Help">Angel Help (Money Donation)</option>
                            <option value="Skill Help">Skill Help (Services)</option>
                            <option value="Item Help">Item Help (Donation of Goods)</option>
                        </select>
                    </div>

                    <div id="goal-amount-container">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Goal Amount (₱)</label>
                        <input type="number" id="create-goal" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" placeholder="1500" min="1">
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea id="create-desc" rows="4" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none resize-none" placeholder="Explain your situation..." required></textarea>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Upload Proof (Level 2+ Verification)</label>
                        <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:bg-gray-50 transition cursor-pointer" onclick="document.getElementById('create-proof').click()">
                            <div class="space-y-1 text-center">
                                <i class="fa-solid fa-cloud-arrow-up text-4xl text-gray-400 mb-2"></i>
                                <div class="flex text-sm text-gray-600 justify-center">
                                    <span class="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-yellow-600 focus-within:outline-none">
                                        <span>Upload a file</span>
                                        <input id="create-proof" name="proof_image" type="file" class="sr-only" accept="image/*">
                                    </span>
                                </div>
                                <p class="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                                <p id="file-name-display" class="text-xs font-bold text-green-600 mt-2"></p>
                            </div>
                        </div>
                    </div>

                    <button type="submit" class="w-full bg-primary text-accent font-bold py-3 rounded-lg hover:bg-yellow-400 transition shadow-md mt-4">Submit Request for Approval</button>
                </form>
            </div>
        </div>
    `,
    details: `
        <div id="request-details-container">
            <div class="text-center py-10"><i class="fa-solid fa-circle-notch fa-spin text-3xl text-primary"></i></div>
        </div>
    `,
    profile: `
        <div id="profile-container">
             <div class="text-center py-10"><i class="fa-solid fa-circle-notch fa-spin text-3xl text-primary"></i></div>
        </div>
    `,
    admin: `
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="bg-accent p-6 text-white flex justify-between items-center">
                <div>
                    <h2 class="font-bold text-2xl"><i class="fa-solid fa-shield-halved text-red-500 mr-2"></i>Admin Dashboard</h2>
                    <p class="text-sm text-gray-300">Manage community requests</p>
                </div>
            </div>
            <div class="p-6">
                <h3 class="font-bold mb-4 text-gray-700">Pending Requests</h3>
                <div id="admin-requests-container" class="space-y-4">
                    <div class="text-center py-4 text-gray-400"><i class="fa-solid fa-circle-notch fa-spin text-xl"></i></div>
                </div>
            </div>
        </div>
    `
};

let currentUser = null;

// Routing logic
window.addEventListener('hashchange', router);
window.addEventListener('load', async () => {
    await checkAuth();
    router();
});

function router() {
    const hash = window.location.hash || '#home';
    const mainContent = document.getElementById('main-content');
    const leftSidebar = document.getElementById('left-sidebar');
    const rightSidebar = document.getElementById('right-sidebar');

    const isAuthRoute = hash === '#login' || hash === '#register';

    if (isAuthRoute) {
        if (currentUser) {
            window.location.hash = '#home'; // Redirect if already logged in
            return;
        }
        leftSidebar.classList.add('hidden');
        rightSidebar.classList.add('hidden');
        mainContent.classList.replace('md:w-2/4', 'w-full');
    } else {
        if (!currentUser) {
            window.location.hash = '#login'; // Force login
            return;
        }
        leftSidebar.classList.remove('hidden');
        rightSidebar.classList.remove('hidden');
        mainContent.classList.replace('w-full', 'md:w-2/4');
    }

    if (hash === '#login') {
        mainContent.innerHTML = views.login;
        document.getElementById('form-login').addEventListener('submit', handleLogin);
    } else if (hash === '#register') {
        mainContent.innerHTML = views.register;
        document.getElementById('form-register').addEventListener('submit', handleRegister);
    } else if (hash === '#home') {
        mainContent.innerHTML = views.home;
        loadFeed();
    } else if (hash === '#create') {
        mainContent.innerHTML = views.create;
        document.getElementById('form-create').addEventListener('submit', handleCreateRequest);
        document.getElementById('create-proof').addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                document.getElementById('file-name-display').innerText = 'Selected: ' + e.target.files[0].name;
            }
        });
    } else if (hash.startsWith('#request/')) {
        const id = hash.split('/')[1];
        mainContent.innerHTML = views.details;
        loadRequestDetails(id);
    } else if (hash === '#profile') {
        mainContent.innerHTML = views.profile;
        loadUserProfile(currentUser.id);
    } else if (hash === '#admin') {
        if (currentUser.role !== 'admin') {
            window.location.hash = '#home';
            return;
        }
        mainContent.innerHTML = views.admin;
        loadAdminRequests();
    } else {
        window.location.hash = '#home';
    }
}

// Auth API Calls
async function checkAuth() {
    try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
            currentUser = await res.json();
            updateUIAfterAuth();
        } else {
            currentUser = null;
        }
    } catch (e) { console.error(e); }
}

async function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    try {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();

        if (res.ok) {
            await checkAuth();
            window.location.hash = '#home';
        } else {
            const errDiv = document.getElementById('login-error');
            errDiv.innerText = data.error;
            errDiv.classList.remove('hidden');
        }
    } catch (err) { console.error(err); }
}

async function handleRegister(e) {
    e.preventDefault();
    const username = document.getElementById('reg-username').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;

    try {
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });
        const data = await res.json();

        if (res.ok) {
            // Auto login
            await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            await checkAuth();
            window.location.hash = '#home';
        } else {
            const errDiv = document.getElementById('register-error');
            errDiv.innerText = data.error;
            errDiv.classList.remove('hidden');
        }
    } catch (err) { console.error(err); }
}

document.getElementById('btn-logout').addEventListener('click', async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    currentUser = null;
    document.getElementById('nav-user-menu').classList.add('hidden');
    document.getElementById('nav-login-menu').classList.remove('hidden');
    window.location.hash = '#login';
});

function updateUIAfterAuth() {
    if (currentUser) {
        document.getElementById('nav-login-menu').classList.add('hidden');
        const userMenu = document.getElementById('nav-user-menu');
        userMenu.classList.remove('hidden');
        document.getElementById('nav-username').innerText = currentUser.username;
        document.getElementById('nav-user-initial').innerText = currentUser.username.charAt(0).toUpperCase();
        document.getElementById('post-avatar').innerText = currentUser.username.charAt(0).toUpperCase();
        document.getElementById('sidebar-score').innerText = currentUser.kindness_score;

        if (currentUser.role === 'admin') {
            document.getElementById('link-admin').classList.remove('hidden');
        }
    }
}

// Feed rendering
async function loadFeed() {
    try {
        const res = await fetch('/api/requests');
        const requests = await res.json();
        const container = document.getElementById('feed-container');

        if (requests.length === 0) {
            container.innerHTML = '<div class="text-center py-10 bg-white rounded-xl border border-gray-100"><i class="fa-solid fa-wind text-4xl text-gray-300 mb-3"></i><p class="text-gray-500 font-medium">No help requests right now.</p></div>';
            return;
        }

        container.innerHTML = requests.map(generateRequestCard).join('');
    } catch (e) { console.error(e); }
}

function generateRequestCard(req, isDetail = false) {
    const isVerified = req.verification_level > 1;
    const verifyBadge = isVerified ? `<span class="ml-2 text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full border border-blue-100 inline-flex items-center" title="Admin or Doc Verified"><i class="fa-solid fa-circle-check mr-1"></i> Verified</span>` : '';

    let btnHtml = '';
    if (req.category === 'Angel Help') {
        const progress = req.goal_amount > 0 ? Math.min((req.current_amount / req.goal_amount) * 100, 100) : 0;
        btnHtml = `
            <div class="mb-4">
                <div class="flex justify-between text-xs font-bold mb-1">
                    <span class="text-gray-600">Raised: ₱${req.current_amount}</span>
                    <span class="text-gray-400">Goal: ₱${req.goal_amount}</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2 mb-1">
                    <div class="bg-primary h-2 rounded-full" style="width: ${progress}%"></div>
                </div>
                <div class="text-right text-xs text-primary font-bold">${Math.round(progress)}%</div>
            </div>
            ${!isDetail ? `<a href="#request/${req.id}" class="block text-center w-full bg-primary text-accent font-bold py-2 rounded-lg hover:bg-yellow-400 transition">Donate Money</a>` : ''}
        `;
    } else if (req.category === 'Skill Help') {
        btnHtml = !isDetail ? `<a href="#request/${req.id}" class="block text-center w-full bg-secondary text-white font-bold py-2 rounded-lg hover:bg-gray-800 transition">Offer Skill</a>` : '';
    } else {
        btnHtml = !isDetail ? `<a href="#request/${req.id}" class="block text-center w-full bg-accent text-white font-bold py-2 rounded-lg hover:bg-black transition">Donate Item</a>` : '';
    }

    return `
        <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div class="flex justify-between items-start mb-3">
                <div class="flex items-center space-x-3 cursor-pointer" onclick="window.location.hash='#profile'">
                    <div class="w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center font-bold text-lg">${req.username.charAt(0).toUpperCase()}</div>
                    <div>
                        <h4 class="font-bold text-sm text-gray-900 border-b border-transparent hover:border-gray-900 inline-block flex items-center">
                            ${req.username} ${verifyBadge}
                        </h4>
                        <p class="text-xs text-gray-500">${new Date(req.created_at).toLocaleDateString()} • ${req.category} ${req.status === 'pending' ? '<span class="text-yellow-600 font-bold ml-1">(Pending Approval)</span>' : ''}</p>
                    </div>
                </div>
                <button class="text-gray-400 hover:text-gray-600"><i class="fa-solid fa-ellipsis"></i></button>
            </div>
            
            <h3 class="font-bold text-lg mb-2 text-gray-800">${req.title}</h3>
            <p class="text-sm text-gray-600 mb-4 whitespace-pre-wrap">${isDetail ? req.description : req.description.substring(0, 150) + (req.description.length > 150 ? '...' : '')}</p>
            
            ${req.proof_image && isDetail ? `<div class="mb-4 rounded-lg overflow-hidden border border-gray-200"><img src="${req.proof_image}" class="w-full max-h-64 object-contain bg-gray-50" alt="Proof Document"></div>` : ''}
            
            ${btnHtml}
            
            ${!isDetail ? `
            <hr class="my-3 border-gray-100">
            <div class="flex justify-around text-gray-500 text-sm font-medium">
                <button class="hover:text-primary transition flex items-center"><i class="fa-regular fa-comment mr-2 text-lg"></i> Comment</button>
                <button class="hover:text-primary transition flex items-center"><i class="fa-solid fa-share mr-2 text-lg"></i> Share</button>
            </div>` : ''}
        </div>
    `;
}

// Create request logic
window.toggleGoalAmount = function (val) {
    const goalDiv = document.getElementById('goal-amount-container');
    if (val === 'Angel Help') goalDiv.style.display = 'block';
    else goalDiv.style.display = 'none';
}

async function handleCreateRequest(e) {
    e.preventDefault();
    const title = document.getElementById('create-title').value;
    const category = document.getElementById('create-category').value;
    const desc = document.getElementById('create-desc').value;
    const goal = document.getElementById('create-goal').value;
    const proofFile = document.getElementById('create-proof').files[0];

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('description', desc);
    if (goal) formData.append('goal_amount', goal);
    if (proofFile) formData.append('proof_image', proofFile);

    try {
        const res = await fetch('/api/requests', {
            method: 'POST',
            body: formData // multipart/form-data
        });
        const data = await res.json();
        const msgDiv = document.getElementById('create-msg');
        msgDiv.classList.remove('hidden');
        if (res.ok) {
            msgDiv.className = 'p-3 rounded-lg text-sm mb-4 bg-green-50 text-green-700 border border-green-200';
            msgDiv.innerHTML = '<i class="fa-solid fa-check-circle mr-2"></i> ' + data.message;
            document.getElementById('form-create').reset();
            setTimeout(() => window.location.hash = '#home', 2000);
        } else {
            msgDiv.className = 'p-3 rounded-lg text-sm mb-4 bg-red-50 text-red-700 border border-red-200';
            msgDiv.innerText = data.error;
        }
    } catch (err) { console.error(err); }
}

// Request Details & Donation
async function loadRequestDetails(id) {
    try {
        const res = await fetch('/api/requests/' + id);
        if (!res.ok) throw new Error('Not found');
        const req = await res.json();

        let actionForm = '';
        if (req.category === 'Angel Help') {
            actionForm = `
                <div class="bg-yellow-50 p-5 rounded-xl border border-yellow-200 mt-4">
                    <h4 class="font-bold text-lg mb-2 text-yellow-800"><i class="fa-solid fa-hand-holding-dollar mr-2"></i>Donate to ${req.username}</h4>
                    <div class="flex space-x-2 mb-3">
                        <button onclick="setDonation(50)" class="flex-1 bg-white border border-yellow-300 py-2 rounded-lg font-bold text-yellow-700 hover:bg-yellow-100 transition">₱50</button>
                        <button onclick="setDonation(100)" class="flex-1 bg-white border border-yellow-300 py-2 rounded-lg font-bold text-yellow-700 hover:bg-yellow-100 transition">₱100</button>
                        <button onclick="setDonation(500)" class="flex-1 bg-white border border-yellow-300 py-2 rounded-lg font-bold text-yellow-700 hover:bg-yellow-100 transition">₱500</button>
                    </div>
                    <div class="flex items-center space-x-2 mb-3">
                        <span class="text-gray-500 font-bold">₱</span>
                        <input type="number" id="custom-amount" class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary" placeholder="Or custom amount">
                    </div>
                    <button onclick="submitDonation(${req.id})" class="w-full bg-primary text-accent font-bold py-3 rounded-lg shadow hover:bg-yellow-400 transition animate-pulse">Complete Donation (+10 Kindness)</button>
                </div>
            `;
        } else if (req.category === 'Skill Help') {
            actionForm = `
                <div class="bg-blue-50 p-5 rounded-xl border border-blue-200 mt-4">
                    <h4 class="font-bold text-lg mb-2 text-blue-800"><i class="fa-solid fa-toolbox mr-2"></i>Offer Your Skills</h4>
                    <textarea id="skill-desc" class="w-full px-3 py-2 rounded-lg border border-blue-200 mb-3" rows="3" placeholder="Describe how you can help..."></textarea>
                    <button onclick="submitSkill(${req.id})" class="w-full bg-blue-600 text-white font-bold py-3 rounded-lg shadow hover:bg-blue-700 transition">Send Offer (+15 Kindness)</button>
                </div>
            `;
        } else {
            actionForm = `
                <div class="bg-orange-50 p-5 rounded-xl border border-orange-200 mt-4">
                    <h4 class="font-bold text-lg mb-2 text-orange-800"><i class="fa-solid fa-box mr-2"></i>Donate Item</h4>
                    <p class="text-sm text-gray-600 mb-3">Let the requester know you have an item for them. They will contact you to arrange dropoff.</p>
                    <button onclick="submitItem(${req.id})" class="w-full bg-orange-600 text-white font-bold py-3 rounded-lg shadow hover:bg-orange-700 transition">Donate Item (+10 Kindness)</button>
                </div>
            `;
        }

        document.getElementById('request-details-container').innerHTML = `
            <div class="mb-4">
                <button onclick="window.history.back()" class="text-gray-500 hover:text-primary font-medium"><i class="fa-solid fa-arrow-left mr-2"></i>Back to Feed</button>
            </div>
            ${generateRequestCard(req, true)}
            ${actionForm}
        `;
    } catch (e) {
        document.getElementById('request-details-container').innerHTML = '<div class="text-red-500 text-center py-10">Error loading request</div>';
    }
}

window.setDonation = function (amt) {
    document.getElementById('custom-amount').value = amt;
};

window.submitDonation = async function (reqId) {
    const amt = document.getElementById('custom-amount').value;
    if (!amt || amt <= 0) return alert('Enter valid amount');
    await fetch(`/api/requests/${reqId}/donate`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ amount: amt })
    });
    alert('Thank you for your generous donation! You earned 10 Kindness points.');
    checkAuth();
    loadRequestDetails(reqId);
};

window.submitSkill = async function (reqId) {
    const desc = document.getElementById('skill-desc').value;
    if (!desc) return alert('Describe your skill');
    await fetch(`/api/requests/${reqId}/skill`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ skill_description: desc })
    });
    alert('Skill offered successfully! You earned 15 Kindness points.');
    checkAuth();
    window.location.hash = '#home';
};

window.submitItem = async function (reqId) {
    await fetch(`/api/requests/${reqId}/item`, { method: 'POST' });
    alert('Item donation initiated! You earned 10 Kindness points.');
    checkAuth();
    window.location.hash = '#home';
};

// Profile Route
async function loadUserProfile(userId) {
    try {
        const res = await fetch('/api/users/' + userId);
        const user = await res.json();

        let html = `
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
                <div class="h-32 bg-primary"></div>
                <div class="px-6 pb-6 relative">
                    <div class="w-24 h-24 rounded-full bg-accent border-4 border-white text-white flex items-center justify-center font-bold text-4xl absolute -top-12 shadow-lg">
                        ${user.username.charAt(0).toUpperCase()}
                    </div>
                    <div class="pt-14 flex justify-between items-start">
                        <div>
                            <h2 class="text-2xl font-black text-gray-800">${user.username}</h2>
                            <p class="text-sm text-gray-500">Joined ${new Date(user.created_at).toLocaleDateString()}</p>
                        </div>
                        <div class="bg-yellow-100 px-4 py-2 rounded-xl text-center">
                            <span class="block text-xs text-yellow-800 font-bold uppercase tracking-wider">Kindness Score</span>
                            <span class="block text-xl font-black text-primary drop-shadow-sm">${user.kindness_score}</span>
                        </div>
                    </div>
                    
                    <div class="mt-6 flex gap-4 text-center border-t border-gray-100 pt-4">
                        <div class="flex-1">
                            <div class="font-bold text-lg">${user.requests.length}</div>
                            <div class="text-xs text-gray-500 uppercase tracking-wide">Requests</div>
                        </div>
                        <div class="flex-1 border-l border-gray-100">
                            <div class="font-bold text-lg">₱${user.total_donated || 0}</div>
                            <div class="text-xs text-gray-500 uppercase tracking-wide">Donated</div>
                        </div>
                        <div class="flex-1 border-l border-gray-100">
                            <div class="font-bold text-lg">${user.skills ? user.skills.length : 0}</div>
                            <div class="text-xs text-gray-500 uppercase tracking-wide">Skills Offered</div>
                        </div>
                    </div>
                    
                    <div class="mt-6 pt-4 border-t border-gray-100">
                        <p class="text-xs text-yellow-700 mb-2 text-center font-medium"><i class="fa-solid fa-circle-info mr-1"></i> Friendly reminder: HelpHive deducts a 5% platform fee from your raised funds upon withdrawal.</p>
                        <button onclick="alert('Withdrawal request submitted! Our team will process the transfer minus the 5% platform fee.')" class="w-full bg-gray-800 text-white font-bold py-2 rounded-lg hover:bg-black transition text-sm">Withdraw Raised Funds</button>
                    </div>
                </div>
            </div>
            
            <h3 class="font-bold text-gray-700 mb-4 px-2">Recent Requests</h3>
            <div class="space-y-4">
                ${user.requests.map(r => generateRequestCard(r)).join('') || '<p class="text-gray-500 px-2 text-sm">No requests created yet.</p>'}
            </div>
        `;
        document.getElementById('profile-container').innerHTML = html;
    } catch (e) { console.error(e); }
}

// Admin Route
async function loadAdminRequests() {
    try {
        const res = await fetch('/api/admin/requests');
        const reqs = await res.json();

        const container = document.getElementById('admin-requests-container');
        if (reqs.length === 0) {
            container.innerHTML = '<p class="text-gray-500">No requests found.</p>';
            return;
        }

        container.innerHTML = reqs.map(r => `
            <div class="bg-white p-4 rounded-lg shadow-sm border ${r.status === 'pending' ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200'}">
                <div class="flex justify-between items-center mb-2">
                    <span class="font-bold text-sm">${r.username}</span>
                    <span class="text-xs px-2 py-1 rounded bg-gray-200 font-medium">${r.status.toUpperCase()}</span>
                </div>
                <h4 class="font-bold mb-1">${r.title}</h4>
                <p class="text-xs text-gray-600 mb-2">${r.category} ${r.goal_amount > 0 ? '| Goal: ₱' + r.goal_amount : ''}</p>
                ${r.proof_image ? `<a href="${r.proof_image}" target="_blank" class="text-xs text-blue-500 font-bold hover:underline mb-2 block"><i class="fa-solid fa-file-image mr-1"></i>View Uploaded Proof Document</a>` : ''}
                
                ${r.status === 'pending' ? `
                    <div class="flex space-x-2 mt-3">
                        <button onclick="updateRequestStatus(${r.id}, 'approved', ${r.proof_image ? 2 : 1})" class="flex-1 bg-green-500 text-white py-1 rounded shadow-sm text-sm font-bold hover:bg-green-600">Approve</button>
                        <button onclick="updateRequestStatus(${r.id}, 'rejected', 0)" class="flex-1 bg-red-500 text-white py-1 rounded shadow-sm text-sm font-bold hover:bg-red-600">Reject</button>
                    </div>` : ''}
            </div>
        `).join('');

    } catch (e) { console.error(e); }
}

window.updateRequestStatus = async function (id, status, verLevel) {
    if (!confirm('Are you sure you want to ' + status + ' this request?')) return;
    try {
        await fetch('/api/admin/requests/' + id + '/status', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status, verification_level: verLevel })
        });
        loadAdminRequests(); // reload
    } catch (e) { console.error(e); }
}

