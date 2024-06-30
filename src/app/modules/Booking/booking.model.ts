import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";

const bookingSchema = new Schema<TBooking>({
    date: {
        type: String,
        required: [true, 'Date is required'],
    },

    slots: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Slot',
            required: [true, 'Slots Id is required'],
        },
    ],

    room: {
        type: Schema.Types.ObjectId,
        required: [true, 'Room Id is required'],
        ref: 'Room',
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User Id is required'],
    },

    totalAmount: {
        type: Number,
    },

    isConfirmed: {
        type: String,
        enum: ['confirmed', 'unconfirmed', 'canceled'],
        default: 'unconfirmed',
    },

    isDeleted: {
        type: Boolean,
        default: false,
    },
});

// checking if Booking is already exist!
bookingSchema.statics.isBookingExists = async function (id: string) {
    return await Booking.findById(id);
};

export const Booking = model<TBooking>('Booking', bookingSchema);
