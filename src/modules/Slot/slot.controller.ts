import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { slotService } from './slot.service';
import { Room } from '../Room/room.model';
import AppError from '../../errors/AppError';
import { Slot } from './slot.model';

const createSlotIntoDB = catchAsync(async (req, res) => {
  const roomInfo = await Room.findById(req.body.room);
  if (roomInfo) {
    const result = await slotService.createSlotIntoDB(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Slots created successfully',
      data: result,
    });
  } else {
    res.status(200).json({
      "success": false,
      "statusCode": 404,
      "message": "No Data Found",
      "data": []
    });
  }

});

// Get Available Slots Controller
const getAvailableSlots = catchAsync(async (req, res) => {
  const { date, roomId } = req.query;
  const roomInfo = await Room.findById(roomId);
  const dateInfo = await Slot.findOne({ date: date });
  console.log('date', dateInfo);
  if (dateInfo && roomInfo) {
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
  } else {
    res.status(200).json({
      "success": false,
      "statusCode": 404,
      "message": "No Data Found",
      "data": []
    });
  }

});



export const slotControllers = {
  createSlotIntoDB, getAvailableSlots
}