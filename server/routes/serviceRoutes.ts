import { Router } from 'express';
import { body } from 'express-validator';
import {
  getServices,
  createService,
  updateService,
  deleteService,
} from '../controllers/serviceController.js';
import auth, { adminOnly } from '../middleware/auth.js';
import { validate } from '../middleware/validation.js';

const router = Router();

router.get('/', getServices as any);

router.post(
  '/',
  auth,
  adminOnly,
  [
    body('id').trim().notEmpty().withMessage('Service ID is required'),
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('icon').trim().notEmpty().withMessage('Icon is required'),
    validate,
  ],
  createService as any
);

router.put(
  '/:id',
  auth,
  adminOnly,
  [body('title').optional().trim().notEmpty(), body('description').optional().trim().notEmpty(), validate],
  updateService as any
);

router.delete('/:id', auth, adminOnly, deleteService as any);

export default router;
