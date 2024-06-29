import express from 'express';
import { AuthControllers } from './auth.controller';

const router = express.Router();

router.post('/login', AuthControllers.loginUser);
router.post(
  '/signup',
  AuthControllers.signUpUser,
);

router.get('/user', AuthControllers.getAllStudents);

export const AuthRoutes = router;
