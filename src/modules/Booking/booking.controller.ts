import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { createBookingIntoDB } from "./booking.service";

const createBooking = catchAsync(async (req, res) => {
    const result = await createBookingIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Booking created successfully',
        data: result,
    });
});

export const BookingController = {
    createBooking,
    // getAllBooking,
    // getUserBookings,
    // updateBooking,
    // deleteBooking,
};
