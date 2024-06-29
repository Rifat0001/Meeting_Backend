import { z } from "zod";

export const createSlotValidationSchema = z.object({
  body: z.object({
    room: z.string(),
    date: z.string(),
    startTime: z.string(),
    endTime: z.string(),
    isBooked: z.boolean().optional(),
  }),
});