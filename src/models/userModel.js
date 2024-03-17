import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    username : {
        type : String, 
        required : true,
        unique : true,
        lowercase : true,

    }, 
    email : {
        type : String, 
        required : true,
        unique : true,
        lowercase : true,

    }, 
    password : {
        type: String, 
        required: true,
    }, 
    
}, {timestamps:true});


userSchema.pre("save", async function (password){
    // everytime hash the password before storing/ updating new details
    // check if the password is modified or not.. if not, don't hash it and move to next middleware
    if(!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log("here is hashed", this.password)
    return this.password;

})

userSchema.methods.isPasswordCorrect = (async function(password){
    // console.log("Input password:", password);
    // console.log("Stored hashed password:", this.password);
    const result = await bcrypt.compare(password, this.password);
    // console.log("Comparison result:", result);
    return result;
})

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id : this._id, 
            username : this.username,
            
        }, 
        process.env.ACCESS_TOKEN,
        {
            expiresIn : '1d'
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id : this._id, 
            username : this.username,
            
        }, 
        process.env.REFRESH_TOKEN,
        {
            expiresIn : '7d'
        }
    )
}

export const User = mongoose.model("User", userSchema);