import express from 'express';
// import auth from '../../middlewares/auth';
// import validateRequest from '../../middlewares/validateRequest';
// import { USER_ROLE } from './../user/user.constant';
import { AuthControllers } from './auth.controller';
// import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post('/login', AuthControllers.loginUser);

// router.post('/signup',validateRequest(createUserSchema), AuthControllers.signUpUser);

router.post(
  '/signup',
  AuthControllers.signUpUser,
);

router.get('/user', AuthControllers.getAllStudents);
// router.post(
//   '/change-password',
//   auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
//   validateRequest(AuthValidation.changePasswordValidationSchema),
//   AuthControllers.changePassword,
// );

// router.post(
//   '/refresh-token',
//   validateRequest(AuthValidation.refreshTokenValidationSchema),
//   AuthControllers.refreshToken,
// );

export const AuthRoutes = router;
