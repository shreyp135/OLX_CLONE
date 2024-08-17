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

// Hashing the password
UserSchema.pre('save', async function(next) {
    const user = this;
    if (user.isModified('password') || user.isNew) 
      user.password = bcryptjs.hash(user.password, 9);
    next();
  });
  
// Method to compare passwords
UserSchema.methods.comparePassword = function(userPassword, dbPassword) {
return bcryptjs.compare(userPassword, dbPassword);
};
  

export default User;