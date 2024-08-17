import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
import passport from "passport";
import localStrategy from "passport-local"

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
    crypto: {
    secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
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

// //routes 
// app.use("/", userRoutes);
app.use("/auth", authRoutes);

//passport auth middlewares
app.use(passport.initialize());
app.use(passport.session()); 
passport.use(new localStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function(err, user) {
        if (err) return done(err);
        if (!user) return done(null, false, { message: 'Incorrect username.' });
  
        user.comparePassword(password).then(isMatch => {
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Incorrect password.' });
          }
        }).catch(err => done(err));
      });
    }
  ));
  
  // Serialize and deserialize user
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    User.findById(id, function(err, user) {
      done(err, user);
    });
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


//server start
app.listen(8080,()=>{
    console.log("Server started on port 8080");
});
