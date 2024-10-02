import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Room } from "../Room/room.model";
import { TSlot } from "./slot.interface";
import createSlots from "./slot.utility";
import { Slot } from "./slot.model";

// Create Slot Service
export const createSlotIntoDB = async (payload: TSlot) => {
  try {
    const { startTime, endTime, date, room } = payload;

    const roomId = payload?.room;
    const roomInfo = await Room.findById(roomId);
    if (!roomInfo) {
      throw new AppError(httpStatus.NOT_FOUND, 'Room not found!');
    }

    const slots = createSlots(startTime, endTime, date, room);
    const result = await Slot.create(slots);
    return result;
  } catch (err) {
    console.log(err);
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to create slot');
  }
};

// Get All Slots Service
const getAllSlotDB = async () => {
  const result = await Slot.find().populate('room');
  return result;
};

// Get Available Slots Service
const getAvailableSlotsFormDB = async (date?: string, roomId?: string) => {
  const query = { isBooked: false };

  if (roomId) {
    const existingRoom = await Room.findById(roomId);
    if (!existingRoom) {
      throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
    }
  }

  if (date) {
    const availableSlotsCount = await Slot.countDocuments({
      date,
      isBooked: false,
    });
    if (availableSlotsCount === 0) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'No available slots for this date'
      );
    }
  }

  const result = await Slot.find(query).populate('room');
  return result;
};

// Get Single Slot by ID
const getSlotByIdFromDB = async (slotId: string) => {
  const slot = await Slot.findOne({ _id: slotId }).populate('room');
  if (!slot) {
    throw new AppError(httpStatus.NOT_FOUND, 'Slot not found');
  }
  return slot;
};

// Update Slot Service
const updateSlotInDB = async (slotId: string, payload: Partial<TSlot>) => {
  const existingSlot = await Slot.findById(slotId);
  if (!existingSlot) {
    throw new AppError(httpStatus.NOT_FOUND, 'Slot not found');
  }

  const updatedSlot = await Slot.findByIdAndUpdate(slotId, payload, {
    new: true, // return the updated document
    runValidators: true, // validate the data
  }).populate('room');

  return updatedSlot;
};

// Delete Slot Service
const deleteSlotFromDB = async (slotId: string) => {
  const slot = await Slot.findById(slotId);
  if (!slot) {
    throw new AppError(httpStatus.NOT_FOUND, 'Slot not found');
  }

  await Slot.findByIdAndDelete(slotId);
  return { message: 'Slot deleted successfully' };
};

// Exporting slot services
export const slotService = {
  createSlotIntoDB,
  getAvailableSlotsFormDB,
  getAllSlotDB,
  getSlotByIdFromDB,
  updateSlotInDB,
  deleteSlotFromDB,
};
