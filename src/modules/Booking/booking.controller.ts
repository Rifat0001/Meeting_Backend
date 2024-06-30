import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { bookingService } from "./booking.service";
import { User } from "../Auth/auth.model";
import { Room } from "../Room/room.model";
import { Slot } from "../Slot/slot.model";
import { Booking } from "./booking.model";

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
    const bookingExist = await Booking.findById(id);
    if (bookingExist) {
        const result = await bookingService.updateBookingIntoDB(id, req.body);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Booking updated successfully',
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

// Deleted Booking Controller
const deleteBooking = catchAsync(async (req, res) => {
    // console.log('i am finding', req.user)
    const { id } = req.params;
    const bookingExist = await Booking.findById(id);
    if (bookingExist) {
        const result = await bookingService.deleteBookingFromDB(id);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Booking deleted successfully',
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

//Get User's Bookings Controller
const getUserBookings = catchAsync(async (req, res) => {
    const user = req.user.userId;
    const userEx = await User.findById(user);
    const result = await bookingService.getUserBookingsFromDB(user);
    sendResponse(res, {
        statusCode: !result.length ? httpStatus.NOT_FOUND : httpStatus.OK,
        success: !result.length ? false : true,
        message: !result.length
            ? 'No Data Found'
            : 'User bookings retrieved successfully',
        data: result,
    });
});

export const BookingController = {
    createBooking,
    getAllBookings, updateBooking, deleteBooking, getUserBookings
    // getAllBooking,
    // getUserBookings,
    // updateBooking,
    // deleteBooking,
};
