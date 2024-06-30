import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Room } from "../Room/room.model";
import { TSlot } from "./slot.interface";
import createSlots from "./slot.utility";
import { Slot } from "./slot.model";

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
    console.log(err)
  }
};

// Get Available Slots Service
const getAvailableSlotsFormDB = async (date?: string, roomId?: string) => {
  const query = {
    isBooked: false,
  };

  // Check roomId is valid
  if (roomId) {
    const existingRoom = await Room.findById(roomId);
    if (!existingRoom) {
      throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
    }
  }

  // Check date is valid
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


export const slotService = {
  createSlotIntoDB, getAvailableSlotsFormDB
}