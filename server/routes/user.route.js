import express from "express";
import { updateProfile } from "../controllers/user.controller.js";

const router = express.Router();

// PUT request to update the user's profile by userId
router.put("/:userId", updateProfile);

export default router;
