import { Router } from 'express';

import { getBalance, createBalance } from '../controllers/balanceController';

import requireAuth from '../middleware/requireAuth';

const router = Router()

//require auth for API routes
router.use(requireAuth)

// GET a user's balance
router.get('/api/balance', getBalance)

// POST (create) a new balance entry
router.post('/api/balance', createBalance)

export default router