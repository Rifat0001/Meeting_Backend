// import { Types } from 'mongoose';
export type TSlot = {
  room: string;
  date: Date;
  startTime: string;
  endTime: string;
  isBooked: boolean;
};
