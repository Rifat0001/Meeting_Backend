import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { slotService } from './slot.service';
import { Room } from '../Room/room.model';
import AppError from '../../errors/AppError';

const createSlotIntoDB = catchAsync(async (req, res) => {
  const roomInfo = await Room.findById(req.body.room);

  console.log('myinfo', req.body)
  //check room available or not
  if (!roomInfo) {
    throw new AppError(httpStatus.NOT_FOUND, `Room with Id:${req.body.room} not found`);
  }
  const result = await slotService.createSlotIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Slots created successfully',
    data: result,
  });
});

// Get Available Slots Controller
const getAvailableSlots = catchAsync(async (req, res) => {
  const { date, roomId } = req.query;

  const availableSlots = await slotService.getAvailableSlotsFormDB(
    date as string,
    roomId as string
  );

  // Send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Available slots retrieved successfully',
    data: availableSlots,
  });
});


export const slotControllers = {
  createSlotIntoDB, getAvailableSlots
}