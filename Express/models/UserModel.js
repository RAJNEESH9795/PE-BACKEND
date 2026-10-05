const UserModel = mongoose.model('User', UserSchema);
const Userschema = new mongoose.Schema({
    name: {
        type: String,   
        required: true  
    },
    email: {
        type: String,
        required: true,
        unique: true
    },  
    Password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'teacher'],
        required: true
    }
});
module.exports = UserModel;
