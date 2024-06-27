import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../Auth/auth.constant';
import { createSlotController } from './slot.controller';

const router = express.Router();

router.post('/slots', auth(USER_ROLE.admin), createSlotController);

export const slotRoutes = router;
