import { z } from 'zod';

export const createSlotSchema = z.object({
  room: z.string(), // Assuming room ID is a UUID
  date: z.date(),
  startTime: z.string(), // Format: HH:MM
  endTime: z.string() // Format: HH:MM
});
