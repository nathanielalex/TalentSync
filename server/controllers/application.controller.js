import Application from '../models/application.model.js';
import Job from '../models/job.model.js';

// Get applicants for a specific job
export const getApplicantsByJob = async (req, res) => {
  const jobId = req.params.jobId;

  try {
    // Find the job by ID
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Get all applications for the job
    const applications = await Application.find({ job: jobId })
      .populate('applicant', 'name email') // Populating applicant details (you can customize the fields)
      .populate('job', 'title location'); // Populating job details (if needed)

    if (applications.length === 0) {
      return res.status(404).json({ message: 'No applicants found for this job' });
    }

    // Respond with the list of applicants
    return res.status(200).json(applications);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const addApplicantToJob = async (req, res) => {
  const jobId = req.params.jobId;
  const applicantId = req.body.userId;

  try {
    // Check if the job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if the user already applied for the job
    const existingApplication = await Application.findOne({ job: jobId, applicant: applicantId });
    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }

    // Create a new application
    const newApplication = new Application({
      job: jobId,
      applicant: applicantId,
      status: 'applied', // You can set the initial status to "applied"
    });

    await newApplication.save();

    const application = await Application.findById(newApplication._id)
      .populate('applicant', 'name email')
      .populate('job', 'title location');

    return res.status(201).json({
      message: 'Successfully applied for the job',
      application,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};