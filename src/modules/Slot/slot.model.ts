import { TSlot } from './slot.interface';
import mongoose, { model } from 'mongoose';

const slotSchema = new mongoose.Schema<TSlot>({
  room: { type: String, required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  isBooked: { type: Boolean, default: false },
});

// interface Slot {
//   room: Types.ObjectId;
//   date: Date;
//   startTime: string;
//   endTime: string;
//   isBooked: boolean;
// }

export const SlotModel = model<TSlot>('Slot', slotSchema);
