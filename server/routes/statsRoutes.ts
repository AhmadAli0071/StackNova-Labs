import { Router } from 'express';
import { getDashboardStats } from '../controllers/statsController.js';
import auth, { adminOnly } from '../middleware/auth.js';

const router = Router();

router.get('/dashboard', auth, adminOnly, getDashboardStats as any);

export default router;
