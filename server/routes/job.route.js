import express from "express";
import {
  getJobs,
  deleteJob,
  updateJob,
  createJob,
} from "../controllers/job.controller.js";

const router = express.Router();

router.get("/", getJobs);
    
router.post("/", createJob);

router.delete("/:id", deleteJob);

router.put("/:id", updateJob);

export default router;
