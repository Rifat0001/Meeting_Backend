import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { createSlotIntoDBNew } from './slot.service';

export const createSlotNew = catchAsync(async (req, res) => {
  const result = await createSlotIntoDBNew(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Slots created successfully',
    data: result,
  });
});
