const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login.html');
    }
};

// Dummy user data
const users = {
    admin: { password: 'adminpassword', role: 'admin' },
    user: { password: 'userpassword', role: 'user' }
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET || 'a-weak-secret-for-dev', // Use an environment variable in production
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false, // Set to true if using HTTPS
        httpOnly: true,
        sameSite: 'lax'
    }
}));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Protected route
app.get('/', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password, role } = req.body;
    if (users[username] && users[username].password === password && users[username].role === role) {
        req.session.user = { username, role };
        res.status(200).json({ message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Logout endpoint
app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Could not log out.' });
        }
        res.clearCookie('connect.sid');
        res.status(200).json({ message: 'Logout successful' });
    });
});

// Check-auth endpoint
app.get('/check-auth', isAuthenticated, (req, res) => {
    res.status(200).json({ authenticated: true, user: req.session.user });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
