import mongoose from "mongoose";
import Job from "../models/job.model.js";  // Assuming your Job model is in this path

// Get all jobs
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({});
    res.status(200).json({ success: true, data: jobs });
  } catch (error) {
    console.error("Error in fetching jobs: ", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getCurrentJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ isActive: true }); 
    res.status(200).json({ success: true, data: jobs });
  } catch (error) {
    console.error("Error in fetching jobs: ", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;  
    const job = await Job.findById(jobId); 
    
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    res.status(200).json({ success: true, data: job });
  } catch (error) {
    console.error("Error in fetching job by ID: ", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// Create a new job
export const createJob = async (req, res) => {
  const job = req.body;

  // fields validation
  if (!job.title || !job.postedBy || !job.postedAt || !job.location || !job.salary || !job.description || !job.requiredSkills) {
    return res.status(400).json({ success: false, message: "Please provide all required fields" });
  }

  const newJob = new Job(job);

  try {
    await newJob.save();
    res.status(201).json({ success: true, data: newJob });
  } catch (error) {
    console.error("Error in creating job: ", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update a job by ID
export const updateJob = async (req, res) => {
  const { id } = req.params;
  const job = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Job not found" });
  }

  try {
    const updatedJob = await Job.findByIdAndUpdate(id, job, { new: true });
    res.status(200).json({ success: true, data: updatedJob });
  } catch (error) {
    console.error("Error in updating job: ", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete a job by ID
export const deleteJob = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Job not found" });
  }

  try {
    await Job.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Job deleted" });
  } catch (error) {
    console.error("Error in deleting job: ", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Find jobs by recruiter
export const getJobsByRecruiter = async (req, res) => {
  const recruiterId = req.params.recruiterId;  // Assuming recruiterId is passed as a URL parameter
  // Check if recruiterId is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(recruiterId)) {
    return res.status(400).json({ success: false, message: "Invalid recruiter ID" });
  }

  try {
    // Find all jobs posted by the recruiter
    const jobs = await Job.find({ postedBy: recruiterId });

    if (jobs.length === 0) {
      return res.status(404).json({ success: false, message: "No jobs found for this recruiter" });
    }

    res.status(200).json({ success: true, data: jobs });
  } catch (error) {
    console.error("Error in fetching jobs by recruiter: ", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
