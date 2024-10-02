import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../Auth/auth.constant';
import { slotControllers } from './slot.controller';
import validateRequest from '../../middlewares/validateRequest';
import { SlotValidations } from './slot.validate';

const router = express.Router();

// Route to create a new slot (Admin only)
router.post(
    '/slots',
    auth(USER_ROLE.admin),
    validateRequest(SlotValidations.createSlotValidationSchema),
    slotControllers.createSlotIntoDB
);

// Route to get available slots (No authentication required)
router.get('/availability', slotControllers.getAvailableSlots);

// Route to get all slots (Admin only)
router.get('/slots', slotControllers.getAllSlots);

// Route to get a single slot by ID (Admin only)
router.get('/slots/:slotId', slotControllers.getSlotById);

// Route to update a slot by ID (Admin only)
router.put(
    '/slots/:slotId', auth(USER_ROLE.admin), slotControllers.updateSlot
);

// Route to delete a slot by ID (Admin only)
router.delete(
    '/slots/:slotId',
    auth(USER_ROLE.admin), slotControllers.deleteSlot
);

export const slotRoutes = router;
