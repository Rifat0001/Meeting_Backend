import auth from "../../middlewares/auth";
import express from 'express';
// import validateRequest from "../../middlewares/validateRequest";
import { BookingController } from "./booking.controller";
// import { bookingValidation } from "./booking.validate";
import { USER_ROLE } from "../Auth/auth.constant";

const router = express.Router();
router.post('/bookings', auth(USER_ROLE.user), BookingController.createBooking);
router.get('/bookings', auth(USER_ROLE.admin), BookingController.getAllBookings);
export const bookingRoute = router;

