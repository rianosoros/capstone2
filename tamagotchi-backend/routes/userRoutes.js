const express = require('express');
const router = express.Router();

// User registration
router.post('/register', async (req, res) => {
    res.send('Register');
});

// User login
router.post('/login', async (req, res) => {
    res.send('Login');
});

// User profile
router.get('/profile', async (req, res) => {
    res.send('Profile');
});

// User logout
router.post('/logout', async (req, res) => {
    res.send('Logout');
});



module.exports = router;
