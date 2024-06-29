import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../Auth/auth.constant';
import { createSlotNew } from './slot.controller';

const router = express.Router();

router.post('/slots', auth(USER_ROLE.admin), createSlotNew);

export const slotRoutes = router;
