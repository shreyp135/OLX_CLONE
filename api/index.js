import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
import passport from "passport";
import localStrategy from "passport-local";
import authRoutes from "./routes/auth";
import listingsRoutes from "./routes/listing";
import User from "./models/user";
import bcrypt from "bcryptjs";

//.env file config
dotenv.config();

//database connection
mongoose.connect(process.env.MONGO_URL).then(() =>{
    console.log("Connected to MongoDB server successfully");
}).catch((err)=>{
    console.log(err);
});

const store = MongoStore.create({
    mongoUrl: process.env.ATLASDB_URL,
    collectionName: 'sessions',
  });

//cookie settings
const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUnitialized: true,
    cookie:{
      expires: Date.now() +7*24*60*60*1000,
      maxage: 7*24*60*60*1000,
      httpOnly: true,
    }
  };  

//express app 
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session(sessionOptions));


// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Passport Local Strategy
passport.use(
  new localStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      const isUser = await bcrypt.compare(password, user.password);
      if (!isUser) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);  
// Serialize and Deserialize User
passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

//error handling middleware
app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
    });
});

// //routes 
app.use("/api/listings", listingsRoutes);
app.use("/api/auth", authRoutes);


//server start
app.listen(8080,()=>{
    console.log("Server started on port 8080");
});
