import { Router } from 'express';
import { signUpUser, loginUser } from '../controllers/loginController'; // ייבוא הפונקציות של כניסה והרשמה

const router = Router();

router.post('/login', loginUser);

router.post('/signup', signUpUser);

export { router as loginRouter }; 