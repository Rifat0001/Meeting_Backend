import auth from "../../middlewares/auth";
import express from 'express';
// import validateRequest from "../../middlewares/validateRequest";
import { BookingController } from "./booking.controller";
// import { bookingValidation } from "./booking.validate";
import { USER_ROLE } from "../Auth/auth.constant";
import validateRequest from "../../middlewares/validateRequest";
import { bookingValidation } from "./booking.validate";

const router = express.Router();

router.post('/bookings', validateRequest(bookingValidation.createBookingValidationSchema), auth(USER_ROLE.user), BookingController.createBooking);

router.get('/bookings', auth(USER_ROLE.admin), BookingController.getAllBookings);
// Update Bookings route
router.put(
    '/bookings/:id',
    auth(USER_ROLE.admin),
    BookingController.updateBooking
);

router.get('/my-bookings', auth(USER_ROLE.user), BookingController.getUserBookings);

// Deleted Booking Route
router.delete(
    '/bookings/:id',
    auth(USER_ROLE.admin),
    BookingController.deleteBooking
);
export const bookingRoute = router;

