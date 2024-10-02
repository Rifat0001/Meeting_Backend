import express from 'express';
import { AuthControllers } from './auth.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './auth.constant';

const router = express.Router();

router.post('/login', AuthControllers.loginUser);
router.post(
  '/signup',
  AuthControllers.signUpUser,
);

router.get('/user', AuthControllers.getAllStudents);

router.get('/user/:id', AuthControllers.getUserById);

router.put('/user/:id', auth(USER_ROLE.admin), AuthControllers.updateUserRoleController);

router.put('/user/update/:id', auth(USER_ROLE.admin, USER_ROLE.user), AuthControllers.updateUserInfo);

// Route to delete a slot by ID (Admin only)
router.delete('/user/:id', auth(USER_ROLE.admin), AuthControllers.deleteUser);

export const AuthRoutes = router;
