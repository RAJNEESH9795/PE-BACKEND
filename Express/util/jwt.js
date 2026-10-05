const jsonwebtoken = require('jsonwebtoken');
const generateToken = (user) => {
jwt.sign(
    {
        id:user._id,
        email:user.email,
    },
        process.env.SECRET_KEY,
    
   {
    expiiresIn: '1h',
   } 
)
}
module.exports = generateToken;