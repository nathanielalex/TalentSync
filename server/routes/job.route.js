import express from "express";
import {
  getJobs,
  deleteJob,
  updateJob,
  createJob,
  getJobById,
  getCurrentJobs,
  getJobsByRecruiter
} from "../controllers/job.controller.js";

const router = express.Router();

router.get("/", getJobs);

router.get("/current", getCurrentJobs);

router.get("/:id", getJobById);
    
router.post("/", createJob);

router.delete("/:id", deleteJob);

router.put("/:id", updateJob);

router.get('/recruiter-jobs/:recruiterId', getJobsByRecruiter);

export default router;
