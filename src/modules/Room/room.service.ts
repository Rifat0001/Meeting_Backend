import mongoose from 'mongoose';
import { TRoom } from './room.interface';
import { Room } from './room.model';
import { createRoomSchema } from './room.validation';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createRoomIntoDB = async (payload: TRoom) => {
  // Validate the payload against the createRoomSchema
  const parsedData = createRoomSchema.safeParse(payload);

  // Check if validation failed
  if (!parsedData.success) {
    const errors = parsedData.error.issues.map((issue) => {
      const { path, message } = issue;
      // Extract field name from path (assuming paths are field names)
      const fieldName = path.join('.');

      // Handle missing field errors
      if (message.includes('required')) {
        return `Error: '${fieldName}' is required.`;
      }

      // Handle other validation errors (e.g., invalid positive number)
      return `Error: Field '${fieldName}': ${message}`;
    });

    // Throw an error with specific field errors joined by newlines
    throw new Error(errors.join('\n'));
  }

  // Check for existing room and floor number before creation
  const { roomNo, floorNo } = parsedData.data;
  const existingRoom = await Room.findOne({ roomNo, floorNo });

  if (existingRoom) {
    throw new Error(
      'Error: Room with this room number and floor number already exists.',
    );
  }

  // If validation succeeds, proceed with room creation
  const result = await Room.create(parsedData.data);
  return result;
};

const getAllRoomsFromDB = async () => {
  const result = await Room.find();
  return result;
};

const getSingleRoomFromDB = async (id: string) => {
  const result = await Room.findById(id);
  //   console.log('result', result);
  return result;
};

const updateRoomFromDB = async (_id: string, updatedRoom: Partial<TRoom>) => {
  try {
    const room = await Room.findById(_id); // Find the room to update

    if (!room) {
      throw new Error('Room not found'); // Handle room not found error
    }

    // Update specific fields using destructuring assignment
    const {
      name,
      roomNo,
      floorNo,
      capacity,
      pricePerSlot,
      amenities,
      isDeleted,
    } = updatedRoom;
    room.set({
      name: name || room.name, // Update only if provided
      roomNo: roomNo || room.roomNo,
      floorNo: floorNo || room.floorNo,
      capacity: capacity || room.capacity,
      pricePerSlot: pricePerSlot || room.pricePerSlot,
      amenities: amenities || room.amenities,
      isDeleted: isDeleted !== undefined ? isDeleted : room.isDeleted, // Handle isDeleted specifically
    });

    // Validate updated fields if necessary
    await room.validate(); // Can be used for additional validation logic

    const updatedDoc = await room.save(); // Save the updated room
    return updatedDoc;
  } catch (err) {
    console.error(err); // Log the error for debugging
    throw err; // Re-throw for potential error handling in the calling code
  }
};

const deleteRoomFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedRoom = await Room.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    console.log(id, 'deleted', deletedRoom);

    if (!deletedRoom) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete room');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedRoom;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to delete student');
  }
};

export const roomServices = {
  createRoomIntoDB,
  getAllRoomsFromDB,
  getSingleRoomFromDB,
  updateRoomFromDB,
  deleteRoomFromDB,
};
