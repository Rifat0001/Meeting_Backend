import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../Auth/auth.constant';
import { slotControllers } from './slot.controller';
import validateRequest from '../../middlewares/validateRequest';
import { SlotValidations } from './slot.validate';

const router = express.Router();

router.post('/slots', auth(USER_ROLE.admin), validateRequest(SlotValidations.createSlotValidationSchema), slotControllers.createSlotIntoDB);

router.get('/availability', slotControllers.getAvailableSlots);

export const slotRoutes = router;
