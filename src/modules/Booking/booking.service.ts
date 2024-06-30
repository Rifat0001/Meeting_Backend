import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../Auth/auth.model";
import { TBooking } from "./booking.interface";
import { Room } from "../Room/room.model";
import { Slot } from "../Slot/slot.model";
import { Booking } from "./booking.model";

export const createBookingIntoDB = async (bookingData: TBooking) => {
    console.log('user ID:', bookingData.user);
    try {
      const user = await User.findById(bookingData.user);
      console.log('user', user);
    } catch (error) {
      // Type guard to check if error is an Error object
      if (error instanceof Error) {
        console.error('Error finding user:', error.message);
        throw error; // Re-throw the error for handling in controller
      } else {
        // Handle unexpected errors (consider logging or throwing a custom error)
        console.error('Unknown error finding user:', error);
      }
    }
  
    console.log('room ID:', bookingData.room);
    try {
      const room = await Room.findById(bookingData.room);
      if (!room) {
        throw new Error('Room not found');
      }
    } catch (error) {
      // Type guard to check if error is an Error object
      if (error instanceof Error) {
        console.error('Error finding room:', error.message);
        throw error; // Re-throw the error for handling in controller
      } else {
        // Handle unexpected errors (consider logging or throwing a custom error)
        console.error('Unknown error finding room:', error);
      }
    }
  
    // Check if all slots exist using $in operator (MongoDB)
    const slotsExist = await Slot.find({ _id: { $in: bookingData.slots } });
    if (slotsExist.length !== bookingData.slots.length) {
      throw new Error('One or more slots not found');
    }
  
    // Booking creation logic assuming validation is done elsewhere
    const booking = await Booking.create(bookingData);
    return booking;
  };
  


// export const createBookingIntoDB = async (payload: TBooking) => {
//     const { room, slots, date, user } = payload;
//     console.log('payload', payload);

//     // Check if user exists
//     const userinfo = await User.findById(user);
//     if (!userinfo) {
//         throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
//     }

//     // Check if room exists and is not deleted
//     const isExistingRoom = await Room.findById(room);
//     if (!isExistingRoom) {
//         throw new AppError(httpStatus.NOT_FOUND, 'This Room not found!');
//     }
//     if (isExistingRoom.isDeleted) {
//         throw new AppError(httpStatus.BAD_REQUEST, 'Unable to book, this room is deleted');
//     }

//     // Check if slots are provided and valid
//     if (!Array.isArray(slots) || slots.length === 0) {
//         throw new AppError(httpStatus.BAD_REQUEST, 'At least one slot must be provided');
//     }

//     // Check for duplicate slots in the array
//     const uniqueSlots = [...new Set(slots)];
//     if (uniqueSlots.length !== slots.length) {
//         throw new AppError(httpStatus.BAD_REQUEST, 'Duplicate slots are not allowed');
//     }

//     // Check if all slots exist and are not already booked
//     const nonExistingSlots = [];
//     for (const slotId of slots) {
//         const existingSlot = await Slot.findById(slotId);
//         if (!existingSlot) {
//             nonExistingSlots.push(slotId);
//         } else if (existingSlot.isBooked) {
//             throw new AppError(httpStatus.BAD_REQUEST, `Slot already booked: ${slotId}`);
//         }
//     }
//     if (nonExistingSlots.length > 0) {
//         throw new AppError(httpStatus.NOT_FOUND, `Slot(s) not found: ${nonExistingSlots.join(', ')}`);
//     }

//     // Calculate total amount based on the room's price per slot
//     const totalAmount = slots.length * isExistingRoom.pricePerSlot;

//     // Create booking
//     const createdBooking = await Booking.create({
//         ...payload,
//         totalAmount,
//     });

//     // Populate room, slots, and user fields in the booking
//     const result = await Booking.findById(createdBooking._id)
//         .populate('room')
//         .populate('slots')
//         .populate('user');

//     return result;
// };

export const bookingService = {
    createBookingIntoDB
}