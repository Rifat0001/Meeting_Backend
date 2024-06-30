import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { roomServices } from './room.service';
import { Request, Response } from 'express';
import { Room } from './room.model';

const createRoom = catchAsync(async (req, res) => {
  const result = await roomServices.createRoomIntoDB(req.body);
  const responseData = {
    _id: result._id,
    name: result.name,
    roomNo: result.roomNo,
    floorNo: result.floorNo,
    capacity: result.capacity,
    pricePerSlot: result.pricePerSlot,
    amenities: result.amenities,
    isDeleted: result.isDeleted,
  };
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room added successfully',
    data: responseData,
  });
});

const getAllRooms = catchAsync(async (req, res) => {
  const result = await roomServices.getAllRoomsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rooms retrieved successfully',
    data: result,
  });
});

// const getSingleRoom = catchAsync(async (req, res) => {
//   // console.log(req.params);
// const { roomId } = req.params;
// const result = await roomServices.getSingleRoomFromDB(roomId);
//   //   console.log('single', result);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Room retrieved successfully',
//     data: result,
//   });
// });
// search a single product by it's id
const getSingleRoom = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;
    console.log('room controller', roomId)
    const roomExist = await Room.findById(roomId);
    if (!roomExist) {
      res.status(200).json({
        "success": false,
        "statusCode": 404,
        "message": "No Data Found",
        "data": []
      });
    } else {
      const result = await roomServices.getSingleRoomFromDB(roomId);
      res.status(200).json({
        success: true,
        message: 'Product fetched successfully!',
        data: result,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const updateSingleProduct = async (req: Request, res: Response) => {
  const { roomId } = req.params;
  const updatedProduct = req.body; // Assuming product data is in request body
  const roomExist = await Room.findById(roomId);
  if (!roomExist) {
    res.status(200).json({
      "success": false,
      "statusCode": 404,
      "message": "No Data Found",
      "data": []
    });
  } else {
    const result = await roomServices.updateRoomFromDB(roomId, updatedProduct);
    const responseData = {
      _id: result._id,
      name: result.name,
      roomNo: result.roomNo,
      floorNo: result.floorNo,
      capacity: result.capacity,
      pricePerSlot: result.pricePerSlot,
      amenities: result.amenities,
      isDeleted: result.isDeleted,
    };
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Room updated successfully',
      data: responseData,
    });
  }


};

const deleteRoom = catchAsync(async (req, res) => {
  const { roomId } = req.params;
  const roomExist = await Room.findById(roomId);
  if (roomExist) {
    const result = await roomServices.deleteRoomFromDB(roomId);
    const responseData = {
      _id: result._id,
      name: result.name,
      roomNo: result.roomNo,
      floorNo: result.floorNo,
      capacity: result.capacity,
      pricePerSlot: result.pricePerSlot,
      amenities: result.amenities,
      isDeleted: result.isDeleted,
    };
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Room deleted successfully',
      data: responseData,
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

export const roomControllers = {
  createRoom,
  getAllRooms,
  getSingleRoom,
  updateSingleProduct,
  deleteRoom,
};
