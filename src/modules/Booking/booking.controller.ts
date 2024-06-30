import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { bookingService } from "./booking.service";
import { User } from "../Auth/auth.model";
import { Room } from "../Room/room.model";
import { Slot } from "../Slot/slot.model";

// Create Booking Controller
const createBooking = catchAsync(async (req, res) => {
    const { room, slots, date, user } = req.body;

    const userExist = await User.findById(user);
    const roomExist = await Room.findById(room);
    const dateInfo = await Slot.findOne({ date: date });
    const slotInfoPromises = slots.map((slotId: string) => Slot.findById(slotId));
    const slotInfoResults = await Promise.all(slotInfoPromises);

    if (userExist && roomExist && dateInfo && slotInfoResults.length) {
        const result = await bookingService.createBookingIntoDB(req.body);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Booking created successfully',
            data: result,
        });
    } else {
        res.status(200).json({
            "success": false,
            "statusCode": 404,
            "message": "No Data Found",
            "data": []
        });
    }

});

const getAllBookings = catchAsync(async (req, res) => {
    const result = await bookingService.getAllBookingsFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All bookings retrieved successfully',
        data: result,
    });
});

// Update Booking
const updateBooking = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await bookingService.updateBookingIntoDB(id, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Booking updated successfully',
        data: result,
    });
});

// Deleted Booking Controller
const deleteBooking = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await bookingService.deleteBookingFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Booking deleted successfully',
        data: result,
    });
});


export const BookingController = {
    createBooking,
    getAllBookings, updateBooking, deleteBooking
    // getAllBooking,
    // getUserBookings,
    // updateBooking,
    // deleteBooking,
};
