import express from 'express';
import { roomControllers } from './room.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../Auth/auth.constant';

const router = express.Router();

router.post('/rooms', auth(USER_ROLE.admin), roomControllers.createRoom);

router.get('/rooms', roomControllers.getAllRooms);
router.get('/rooms/:roomId', roomControllers.getSingleRoom);
router.put(
  '/rooms/:roomId',
  auth(USER_ROLE.admin),
  roomControllers.updateSingleProduct,
);
router.delete(
  '/rooms/:roomId',
  auth(USER_ROLE.admin),
  roomControllers.deleteRoom,
);

export const roomRoutes = router;
