import express from "express";
import { updateSeekerDetails, getUserDetails } from "../controllers/user.controller.js";

const router = express.Router();

router.put("/seeker/:userId", updateSeekerDetails);
router.get("/:userId", getUserDetails);

export default router;
