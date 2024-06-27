import { Request, Response } from 'express';
import { generateSlots } from './slot.service';

export const createSlotController = async (req: Request, res: Response) => {
  try {
    const { room, date, startTime, endTime } = req.body;
    console.log(room);
    // Optional validation (consider using a validation library like Joi)
    if (!room || !date || !startTime || !endTime) {
      return res
        .status(400)
        .json({ success: false, message: 'Missing required fields' });
    }
    // console.log('going'); 
    const createdSlots = await generateSlots(room, date, startTime, endTime);
    // console.log('fun');
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Slots created successfully',
      data: createdSlots,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error creating slots' });
  }
};
