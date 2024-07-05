import { loginUser } from "../../controllers/user/login.js";
import { registerUser } from "../../controllers/user/register.js";
import { Router } from "express";
const router = Router();

router.post('/login', loginUser)
router.post('/register', registerUser)

export default router;
