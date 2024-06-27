import moment from 'moment'; // Assuming moment.js is installed and imported=
// import { createSlotSchema } from './slot.validate';
// import { Types, ObjectId } from 'mongoose';
import { SlotModel } from './slot.model';
import { TSlot } from './slot.interface';

// Update Slot interface to match your definition (assuming Types.ObjectId is used for room)

export const createSlots = async (slots: TSlot[]) => {
  const createdSlots = await SlotModel.create(slots);
  return createdSlots;
};
export const generateSlots = async (
    room: string,
    date: Date,
    startTime: string,
    endTime: string,
  ) => {
    // Validate input parameters (room ID, date, start/end times)
    if (!room || !date || !startTime || !endTime) {
      throw new Error('Missing required fields: room, date, startTime, endTime');
    }
  
    function getNumberFromString(timeString: string): number {
      const [hourString] = timeString.split(':');
      const hour = parseInt(hourString, 10);
      const minutes = hour * 60;
      return minutes;
    }
  
    const startMinutes = getNumberFromString(startTime);
    const endMinutes = getNumberFromString(endTime);
  
    const totalDuration = endMinutes - startMinutes;
  
    if (totalDuration <= 0) {
      throw new Error(
        'Invalid slot duration: Start time must be before end time.'
      );
    }
  
    // Calculate number of slots based on total duration and assumed default slot duration (modify if needed)
    const defaultSlotDuration = 60; // Adjust this value as needed (in minutes)
    const numSlots = Math.ceil(totalDuration / defaultSlotDuration);
  
    const generatedSlots: TSlot[] = []; // Use Slot directly for type
    let currentStartTime = moment(startTime); // Use moment to create a moment object
  
    for (let i = 0; i < numSlots; i++) {
      const currentEndTime = moment(currentStartTime).add(defaultSlotDuration, 'minutes').format('HH:mm');
  
      generatedSlots.push({
        room,
        date,
        startTime: currentStartTime.format('HH:mm'),
        endTime: currentEndTime,
        isBooked: false,
      });
  
      // Update currentStartTime for the next slot
      currentStartTime = moment(currentEndTime);
    }
  
    // Call createSlots to save slots to the database (assuming createSlots is defined elsewhere)
    const createdSlots = await createSlots(generatedSlots);
    return createdSlots;
  };
  
