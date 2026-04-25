import { Router } from 'express';
import { body } from 'express-validator';
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController.js';
import auth, { adminOnly } from '../middleware/auth.js';
import { validate } from '../middleware/validation.js';

const router = Router();

router.get('/', getProjects as any);
router.get('/:id', getProject as any);

router.post(
  '/',
  auth,
  adminOnly,
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('client').trim().notEmpty().withMessage('Client is required'),
    body('category').trim().notEmpty().withMessage('Category is required'),
    validate,
  ],
  createProject as any
);

router.put(
  '/:id',
  auth,
  adminOnly,
  [body('title').optional().trim().notEmpty(), body('description').optional().trim().notEmpty(), validate],
  updateProject as any
);

router.delete('/:id', auth, adminOnly, deleteProject as any);

export default router;
