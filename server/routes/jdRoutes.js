import express from "express";
import { analyzeJD } from "../controllers/jdController.js";

const router = express.Router();

router.post("/", analyzeJD);

export default router;
