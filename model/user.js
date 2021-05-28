const mongoose = require("mongoose");
const { isEmail } = require("validator")
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, 'please enter your email'],
        validate: [isEmail, 'Please enter a valid email']

    },
    password: {
        type: String,
        minlength: [8, 'password should not be less than 8 characters'],
        required: [true, 'Please fill the password field']
    }
})

//mongo hook to hash password before create user
userSchema.pre('save', async function(next) {

    const salt = await bcrypt.genSalt();
    // console.log(salt);
    this.password = await bcrypt.hash(this.password, salt);
    // console.log(this.password)
    next();
})

//login static method
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email: email })
    if (user) {
        const checkPassword = await bcrypt.compare(password, user.password);
        if (checkPassword) {
            return user;
        }
        throw Error('incorrect password')
    }
    throw Error('incorrect email')
}


const User = mongoose.model('user', userSchema);
module.exports = User;