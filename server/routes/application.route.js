import express from 'express';
import { getApplicantsByJob, addApplicantToJob } from '../controllers/application.controller.js';

const router = express.Router();

router.get('/:jobId/applicants', getApplicantsByJob);

router.post('/:jobId/apply', addApplicantToJob);

export default router;
