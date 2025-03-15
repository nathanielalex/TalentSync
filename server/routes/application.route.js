import express from 'express';
import { getApplicantsByJob, addApplicantToJob, updateStatusApplication } from '../controllers/application.controller.js';

const router = express.Router();

router.get('/:jobId/applicants', getApplicantsByJob);

router.post('/:jobId/apply', addApplicantToJob);

router.put('/:applicationId/update-status', updateStatusApplication);

export default router;
