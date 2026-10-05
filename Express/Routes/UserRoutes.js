
const express = require("express");
const checkRoles = require("../Middleware/roleMiddleware");
const User = require("../Models/userModel");
const bcrypt = require("bcrypt");

const router = express.Router();

// CREATE USER
router.post("/createUser", async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({
                message: "Data is missing"
            });
        }

        const user = await User.findOne({ email });

        if (user) {
            return res.status(409).json({
                message: "User already exists"
            });
        }

        const hashPass = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashPass,
            role
        });

        return res.status(201).json({
            message: "User created",
            user: {
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        });

    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
});


// LOGIN
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password is required"
            });
        }

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({
                message: "User doesn't exist"
            });
        }

        const comparePass = await bcrypt.compare(
            password,
            existingUser.password
        );

        if (!comparePass) {
            return res.status(400).json({
                message: "Password is incorrect"
            });
        }

        return res.status(200).json({
            message: "Logged in",
            user: {
                name: existingUser.name,
                email: existingUser.email,
                role: existingUser.role
            }
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error occurred during login",
            error: error.message
        });
    }
});

module.exports = router;
