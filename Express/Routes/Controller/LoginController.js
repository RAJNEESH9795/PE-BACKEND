 const userModel = require("../Models/userModel");
 const loginController = async (req, res) => {
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
        //tokens
        
const token=generateToken(User);
res.cookie("token",token,{
    httpOnly:true,
    secure:process.env.SECRET_KEY,
    maxAge:60*60*1000
})

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
 }