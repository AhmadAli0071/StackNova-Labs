import { Router } from 'express';
import { body } from 'express-validator';
import {
  getBlogPosts,
  getBlogPost,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} from '../controllers/blogController.js';
import auth, { adminOnly } from '../middleware/auth.js';
import { validate } from '../middleware/validation.js';

const router = Router();

router.get('/', getBlogPosts as any);
router.get('/:id', getBlogPost as any);

router.post(
  '/',
  auth,
  adminOnly,
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('slug').trim().notEmpty().withMessage('Slug is required'),
    body('excerpt').trim().notEmpty().withMessage('Excerpt is required'),
    body('content').trim().notEmpty().withMessage('Content is required'),
    body('category').trim().notEmpty().withMessage('Category is required'),
    body('author').trim().notEmpty().withMessage('Author is required'),
    validate,
  ],
  createBlogPost as any
);

router.put(
  '/:id',
  auth,
  adminOnly,
  [body('title').optional().trim().notEmpty(), body('content').optional().trim().notEmpty(), validate],
  updateBlogPost as any
);

router.delete('/:id', auth, adminOnly, deleteBlogPost as any);

export default router;
