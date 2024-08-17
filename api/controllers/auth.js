import User from "../models/user.js"
import jwt from "jsonwebtoken";

export const signup = async (req,res,next)=>{
    try{
    const {userName, password} =  req.body;
    if(User.findOne({userName}))
        return res.status(400).send('User already exists.');
    const newUser = new User;
    newUser.userName = userName;
    newUser.password = password;
    await newUser.save();
        console.log("User saved to database");
    } catch (err){
        next(err);
    }
};


export const signin = async (req,res,next)=>{
    try{
        const {email, password} =  req.body;
        const currUser = await User.findOne({email});
        if (!currUser) 
            return next(errorHandler(152,"User not found"));
        const isUser = (currUser.password === password);
        if(!isUser) 
            return next(errorHandler(153,"Wrong credentials"));
        console.log("successs");
        const token  = jwt.sign({ id: currUser._id }, process.env.JWT_SECRET);
        const {password: pass, ...cred} = currUser._doc;
        const expiryDate = new Date(Date.now() + 259200000)//expiry after 3 days
        res.cookie("access_token", token, {httpOnly: true, expires: expiryDate}).status(200).json(cred);//creating a cookie
    }   catch (err){
        next(err);
        }

};

export const googleHandler = async (req, res, next) => {
    try {
      const currentUser = await User.findOne({ email: req.body.email });
      if (currentUser) {
        const token = jwt.sign({ id: currentUser._id }, process.env.JWT_SECRET);
        const { password: pass, ...cred } = currentUser._doc;
        const expiryDate = new Date(Date.now() + 259200000)//expiry after 3 days
        res
          .cookie('access_token', token, {
            httpOnly: true,
            expires: expiryDate,
          })
          .status(200)
          .json(cred);
      } else {
        const generatedPassword =
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8);
        const newUser = new User({
        //   username:
        //     req.body.name.split(' ').join('').toLowerCase() +
        //     Math.random().toString(36).slice(-8),
          email: req.body.email,
          password: generatedPassword,
        //   profilePicture: req.body.photo,
        });
        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
        const { password: pass, ...cred } = newUser._doc;
        const expiryDate = new Date(Date.now() + 259200000)//expiry after 3 days
        res
          .cookie('access_token', token, {
            httpOnly: true,
            expires: expiryDate,
          })
          .status(200)
          .json(cred);
      }
    } catch (error) {
      next(error);
    }
  };

export const signout = async (req,res,next) =>{
    res.clearCookie('access_token').status(200).json('Signout success!');
};
