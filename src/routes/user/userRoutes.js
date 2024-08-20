import { Router } from "express";

import { loginUser } from "../../controllers/user/login.js";
import { registerUser } from "../../controllers/user/register.js";
import { createEntry } from "../../controllers/user/test.js";
import { dashboard } from "../../controllers/user/dashboard.js";

import { verifyJWT } from "../../middleware/userMiddleware.js";

const router = Router();

router.post('/login', loginUser)
router.post('/register', registerUser)
router.post('/test', verifyJWT, createEntry);
router.get('/dashboard', verifyJWT, dashboard)

export default router;
