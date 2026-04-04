import express from "express";
import { register, login } from "../controllers/authController.js";
import { trackActivity } from "../middleware/activityMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", trackActivity('login', 'User logged in'), login);

export default router;
