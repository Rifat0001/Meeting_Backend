import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Room } from "../Room/room.model";
import { TSlot } from "./slot.interface";
import createSlots from "./slot.utility";
import { Slot } from "./slot.model";

export const createSlotIntoDBNew = async (payload: TSlot) => {
  const { startTime, endTime, date, room } = payload;

  const roomId: any = payload?.room;
  const roomInfo = await Room.findById(roomId);
  //check room available or not
  if (!roomInfo) {
    throw new AppError(httpStatus.NOT_FOUND, 'Room not found!');
  }

  //check room is deleted or not
  if (roomInfo.isDeleted) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Can't create slots, This room deleted!"
    );
  }

  const slots = createSlots(startTime, endTime, date, room);

  const result = await Slot.create(slots);
  return result;
};