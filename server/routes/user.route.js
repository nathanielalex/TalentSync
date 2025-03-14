import express from "express";
import { updateProfile, getUserDetails } from "../controllers/user.controller.js";

const router = express.Router();

router.put("/:userId", updateProfile);
router.get("/:userId", getUserDetails);

export default router;
