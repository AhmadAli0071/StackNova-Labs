import { Router } from 'express';
import { body, query } from 'express-validator';
import {
  submitContact,
  getContacts,
  updateContactStatus,
  deleteContact,
} from '../controllers/contactController.js';
import auth, { adminOnly } from '../middleware/auth.js';
import { validate } from '../middleware/validation.js';

const router = Router();

router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('message').trim().notEmpty().withMessage('Message is required'),
    validate,
  ],
  submitContact as any
);

router.get(
  '/',
  auth,
  adminOnly,
  [
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 100 }),
    validate,
  ],
  getContacts as any
);

router.patch(
  '/:id',
  auth,
  adminOnly,
  [body('status').isIn(['new', 'read', 'replied']).withMessage('Invalid status'), validate],
  updateContactStatus as any
);

router.delete('/:id', auth, adminOnly, deleteContact as any);

export default router;
