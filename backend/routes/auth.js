const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/user");

// Register (post)
router.post('/register', async (req, res) => {
    try {
        const { name, surname, email, password, authCode, gif } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            surname,
            email,
            password: hashedPassword,
            authCode,
            gif
        });

        const saved = await newUser.save();

        res.status(201).json(saved);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Login (get)
router.post('/login', async (req, res) => {
    try {
        const { email, password, authCode } = req.body;

        if ([email, password, authCode].some((val) => !val)) {
            console.log(email);
            console.log(password);
            console.log(authCode);
            return res.status(401).json({ message: 'Not all information received' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        const matchPassword = await bcrypt.compare(password, user.password);
        const matchCode = authCode === user.authCode;

        if (!matchPassword || !matchCode) {
            return res.status(401).json({ message: 'Authentication Failed' });
        }

        const token = jwt.sign(
            {
                id: user._id,
                name: user.name,
            },
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        );

        res.status(200).json({
            token,
            name: user.name,
            url: user.gif
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
})

module.exports = router;