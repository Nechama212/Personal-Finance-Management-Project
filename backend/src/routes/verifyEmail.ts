import { Router } from 'express';
import { verifyEmail } from '../controllers/verifyEmailController'; // Correct import path

const router = Router();

router.get('/success', verifyEmail);

export { router as verifyEmailRouter };

