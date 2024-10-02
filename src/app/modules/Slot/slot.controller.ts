import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { slotService } from './slot.service';
import { Room } from '../Room/room.model';
import { Slot } from './slot.model';

// Create Slot Controller
const createSlotIntoDB = catchAsync(async (req, res) => {
  const roomInfo = await Room.findById(req.body.room);
  if (roomInfo && !roomInfo.isDeleted) {
    const result = await slotService.createSlotIntoDB(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Slots created successfully',
      data: result,
    });
  } else {
    res.status(httpStatus.NOT_FOUND).json({
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'No Data Found',
      data: [],
    });
  }
});

// Get All Slots Controller
const getAllSlots = catchAsync(async (req, res) => {
  const result = await slotService.getAllSlotDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All slots retrieved successfully',
    data: result,
  });
});

// Get Available Slots Controller
const getAvailableSlots = catchAsync(async (req, res) => {
  const { date, roomId } = req.query;
  const roomInfo = await Room.findById(roomId);
  const dateInfo = await Slot.findOne({ date: date });

  if (dateInfo && roomInfo) {
    const availableSlots = await slotService.getAvailableSlotsFormDB(
      date as string,
      roomId as string
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Available slots retrieved successfully',
      data: availableSlots,
    });
  } else {
    res.status(httpStatus.NOT_FOUND).json({
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'No Data Found',
      data: [],
    });
  }
});

// Get Single Slot by ID Controller
const getSlotById = catchAsync(async (req, res) => {
  const slotId = req.params.slotId;
  const result = await slotService.getSlotByIdFromDB(slotId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Slot retrieved successfully',
    data: result,
  });
});

// Update Slot Controller
const updateSlot = catchAsync(async (req, res) => {
  const slotId = req.params.slotId;
  const result = await slotService.updateSlotInDB(slotId, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Slot updated successfully',
    data: result,
  });
});

// Delete Slot Controller
const deleteSlot = catchAsync(async (req, res) => {
  const slotId = req.params.slotId;
  const result = await slotService.deleteSlotFromDB(slotId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Slot deleted successfully',
    data: result,
  });
});

export const slotControllers = {
  createSlotIntoDB,
  getAvailableSlots,
  getAllSlots,
  getSlotById,
  updateSlot,
  deleteSlot,
};
