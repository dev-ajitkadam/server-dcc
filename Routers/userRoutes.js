const express = require('express');
const router = express.Router();
const UserModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userController = require('../controllers/userController');

const SECRET_KEY = process.env.JWT_SECRET;

// auth/verify-token
router.get('/auth/verify-token', (req, res) => {
    // Get the token from the Authorization header
    const authHeader = req.headers['authorization'];

    // Check if the Authorization header is missing
    if (!authHeader) {
        return res.status(401).json({ message: 'No token provided' });
    }

    // Split the token from the 'Bearer <token>' format
    const tokenParts = authHeader.split(' ');
    
    // Check the format of the token
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(401).json({ message: 'Invalid token format' });
    }

    const token = tokenParts[1];

    // Verify the token
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            // Handle specific JWT errors for better feedback
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expired' });
            } else if (err.name === 'JsonWebTokenError') {
                return res.status(401).json({ message: 'Invalid token' });
            } else {
                return res.status(401).json({ message: 'Failed to authenticate token' });
            }
        }

        // If token is valid, return the user's role
        res.status(200).json({ role: decoded.role });
    });
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate the input
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Find the user by email
        const user = await UserModel.findOne({ email });

        // Check if user exists and is active
        if (!user || user.status !== true) {
            return res.status(404).json({ error: 'User not found or inactive' });
        }

        // Validate the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Incorrect password' });
        }

        // Generate a JWT token
        const tokenId = jwt.sign(
            { email: user.email, role: user.role },
            SECRET_KEY,
            { expiresIn: '7d' } // Set token expiration to 7 days
        );

       

        // Send a response with user details
        res.json({ token:tokenId, role: user.role, email: user.email, name: user.name });

    } catch (error) {
        console.error('Login error:', error);
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

router.get('/getuser', async (req, res) => {
    try {
        const users = await UserModel.find();
        res.send(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/client', userController.getClients);
router.get('/siteeng', userController.getSiteeng);

module.exports = router;
