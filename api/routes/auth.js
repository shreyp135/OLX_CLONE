import express from "express";
import { signup, signout} from "../controllers/auth.js";
import passport from "passport";

const router = express.Router();

router.post("/signup",signup);
router.post('/signin', passport.authenticate('local'), (req, res) => {
    res.json({ message: 'Logged in successfully',
      token: req.user._id.toString(),
     });
  });   
router.get('/signout',signout);

export default router;