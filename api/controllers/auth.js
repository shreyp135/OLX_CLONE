import User from "../models/user.js";
import bcrypt from "bcryptjs";

export const signup = async (req,res,next)=>{
    try{
        const { name, email, password } = req.body;
        if(User.findOne({email}))
             return res.status(400).send('User already exists.');
    const newUser = new User;
    newUser.name = name;
    newUser.email = email;
    const salt = await bcrypt.genSalt(9);
    newUser.password = await bcrypt.hash(password, salt);
    await newUser.save();
        console.log("User saved to database");
    } catch (err){
        next(err);
    }
};

export const signout = async (req,res,next) =>{
    req.logout((err) => {
        if (err) {
          return res.status(500).send('internal server error');
        }
        res.json({ message: 'Logged out successfully' });
      });    
};
