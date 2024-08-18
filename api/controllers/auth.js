import User from "../models/user.js";
import bcrypt from "bcryptjs";

export const signup = async (req,res)=>{
    try{
        const { name, email, password } = req.body;
        let userCheck = await User.findOne({ email });
        if(userCheck)
             return res.status(400).send('User already exists.');
    const newUser = new User;
    newUser.name = name;
    newUser.email = email;
    const salt = await bcrypt.genSalt(9);
    newUser.password = await bcrypt.hash(password, salt);
    await newUser.save();
        console.log("User saved to database");
    } catch (err){
        console.log(err.message);
    }
};

export const signout = async (req,res) =>{
    req.logout((err) => {
        if (err) {
          return res.status(500).send('internal server error');
        }
        res.json({ message: 'Logged out successfully' });
      });    
};
