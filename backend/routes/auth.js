const express = require('express');
const router = express.Router();
const User = require("../models/user");

// Register (post)
router.post('/', async (req, res) => {
    try {
        const newUser = new User(req.body);
        const saved = await newUser.save();

        res.status(201).json(saved);
    }
    catch (error){
        res.status(400).json({ message: error.message });
    }
});

// Login (get)
router.get('/:id', async (req, res) => {
    try{
        const users = await User.findById(req.params.id);;

        if(!users){
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(users);
    }
    catch (error){
        res.status(500).json({ message: error.message });
    }
})

module.exports = router;