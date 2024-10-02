import { Schema, model } from 'mongoose';
import { TRoom } from './room.interface';

const roomSchema = new Schema<TRoom>({
  name: { type: String, required: true },
  roomNo: { type: Number, required: true },
  floorNo: { type: Number, required: true },
  capacity: { type: Number, required: true },
  pricePerSlot: { type: Number, required: true },
  amenities: { type: [String], required: true },
  images: { type: [String], required: true }, // Allow for multiple image uploads
  isDeleted: { type: Boolean, required: true, default: false },
});



export const Room = model('Room', roomSchema);
