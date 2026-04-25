import { Router } from 'express';
import { body } from 'express-validator';
import { verifyPin } from '../controllers/adminController.js';
import { validate } from '../middleware/validation.js';

const router = Router();

router.post(
  '/login',
  [body('pin').isLength({ min: 6, max: 6 }).withMessage('PIN must be 6 digits'), validate],
  verifyPin as any
);

export default router;
