import { Schema, model } from "mongoose";
import { TSlot } from "./slot.interface";

const slotSchema = new Schema<TSlot>({
  room: {
    type: Schema.Types.ObjectId,
    required: [true, 'Room Id is required'],
    ref: 'Room',
  },
  date: {
    type: String,
    required: [true, 'Date is required'],
  },
  startTime: {
    type: String,
    required: [true, 'Start-Time is required'],
  },
  endTime: {
    type: String,
    required: [true, 'End-Time is required'],
  },
  isBooked: {
    type: Boolean,
    default: false,
  },
});

export const Slot = model<TSlot>('Slot', slotSchema);