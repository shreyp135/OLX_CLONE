import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    userName:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },

},{timestamps: true});

const User = mongoose.model("User", userSchema);
  
// Method to compare passwords
UserSchema.methods.comparePassword = function(userPassword, dbPassword) {
return bcryptjs.compare(userPassword, dbPassword);
};
  

export default User;