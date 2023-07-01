import { Router } from 'express';

// controller functions
import { signupUser, loginUser } from '../controllers/userController';

const router = Router();

// route to login
router.post('/api/user/login', loginUser)

// route to signup
router.post('/api/user/signup', signupUser)

export default router