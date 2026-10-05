const User = require("../Models/userModel");
const bcrypt = require("bcrypt");
const regUser=async (req,res)=>{
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
    }}