import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { slotService } from './slot.service';

const createSlotIntoDB = catchAsync(async (req, res) => {
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