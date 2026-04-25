import { Router } from 'express';
import { body } from 'express-validator';
import { subscribe, unsubscribe, getSubscribers } from '../controllers/newsletterController.js';
import auth, { adminOnly } from '../middleware/auth.js';
import { validate } from '../middleware/validation.js';

const router = Router();

router.post(
  '/subscribe',
  [body('email').isEmail().withMessage('Valid email is required'), validate],
  subscribe as any
);

router.post(
  '/unsubscribe',
  [body('email').isEmail().withMessage('Valid email is required'), validate],
  unsubscribe as any
);

router.get('/subscribers', auth, adminOnly, getSubscribers as any);

export default router;
