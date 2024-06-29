import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../Auth/auth.constant';
import { slotControllers } from './slot.controller';

const router = express.Router();

router.post('/slots', auth(USER_ROLE.admin), slotControllers.createSlotIntoDB);

router.get('/availability', slotControllers.getAvailableSlots);

export const slotRoutes = router;
