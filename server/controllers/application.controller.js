import Application from '../models/application.model.js';
import Job from '../models/job.model.js';

export const getApplicantsByJob = async (req, res) => {
  const jobId = req.params.jobId;

  try {
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const applications = await Application.find({ job: jobId })

    if (applications.length === 0) {
      return res.status(404).json({ message: 'No applicants found for this job' });
    }

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
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const existingApplication = await Application.findOne({ job: jobId, applicant: applicantId });
    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }

    const newApplication = new Application({
      job: jobId,
      applicant: applicantId,
      fullName: req.body.fullName,
      email: req.body.email,
      skills: req.body.skills,
      status: 'applied',
      jobTitle: job.title, 
      jobLocation: job.location,
      salary: job.salary,
      requiredSkills: job.requiredSkills,
    });

    await newApplication.save();

    // const application = await Application.findById(newApplication._id)
    //   .populate('applicant', 'name email')
    //   .populate('job', 'title location');

    return res.status(201).json({
      message: 'Successfully applied for the job',
      application: newApplication,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateStatusApplication = async (req, res) => {
  const applicationId = req.params.applicationId;
  const { status } = req.body;

  try {
    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }


    application.status = status;

    await application.save();

    return res.status(200).json({
      message: 'Application status updated successfully',
      application,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getApplicationsByApplicant = async (req, res) => {
  const applicantId = req.params.applicantId;

  try {
    const applications = await Application.find({ applicant: applicantId });

    if (applications.length === 0) {
      return res.status(404).json({ message: 'No applications found for this applicant' });
    }

    return res.status(200).json(applications);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

