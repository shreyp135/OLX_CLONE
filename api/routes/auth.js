import express from "express";
import { signup, signin , googleHandler,signout} from "../controllers/auth_controller.js";

const router = express.Router();

router.post("/signup",signup);
router.post("/signin",signin);
router.post("/google",googleHandler);
router.get('/signout',signout);

export default router;