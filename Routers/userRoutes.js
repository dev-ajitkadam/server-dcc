const express = require('express');
const router = express.Router();
const UserModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userController = require('../controllers/userController');

const SECRET_KEY = process.env.JWT_SECRET;

// auth/verify-token
router.get('/auth/verify-token', (req, res) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const tokenParts = token.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(401).json({ message: 'Invalid token format' });
    }

    const actualToken = tokenParts[1];

    jwt.verify(actualToken, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Failed to authenticate token' });
        }

        res.status(200).json({ role: decoded.role });
    });
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user || user.status !== true) {
            return res.status(404).json({ error: 'User not found or inactive' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Incorrect password' });
        }

        // Set token expiration to 7 days
        const token = jwt.sign(
            { email: user.email, role: user.role },
            SECRET_KEY,
            { expiresIn: '7d' } 
        );

        // Set the token in a cookie with a 7-day expiration
        res.cookie('token', token, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
        });

        res.json({ role: user.role, email: user.email, name: user.name });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/getuser', async (req, res) => {
    try {
        const users = await UserModel.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/signup', async (req, res) => {
    try {
        const { name, address, email, number, role, cId, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user) {
            const hashedPassword = await bcrypt.hash(password, 10);
            await UserModel.create({ name, address, email, number, role, cId, password: hashedPassword });
            res.status(201).json({ status: 'success' });
        } else {
            res.status(409).json({ status: 'Email already exists' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/:userId/add', async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await UserModel.findByIdAndUpdate(userId, { status: true }, { new: true });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/:userId/block', async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await UserModel.findByIdAndUpdate(userId, { status: false }, { new: true });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        await UserModel.findByIdAndDelete(userId);
        res.json({ status: 'success' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/client', userController.getClients);
router.get('/siteeng', userController.getSiteeng);

module.exports = router;
