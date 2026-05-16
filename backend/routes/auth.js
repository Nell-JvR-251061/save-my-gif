const express = require('express');
const router = express.Router();
const User = require("../models/user");

// REGISTER
router.post("/register", async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.send("User registered");
});

// LOGIN


module.exports = router;