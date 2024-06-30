import { z } from 'zod';

export const createRoomSchema = z.object({
  // Name is required and must be a string
  name: z.string(),

  // Room number must be a positive number and is required
  roomNo: z.number().positive('Room number must be positive'),

  // Floor number must be a positive number and is required
  floorNo: z.number().positive('Floor number must be positive'),

  // Capacity must be a positive number and is required
  capacity: z.number().positive('Capacity must be positive'),

  // Price per slot must be a positive number and is required
  pricePerSlot: z.number().positive('Price must be positive'),

  // Amenities must be an array of strings and is required
  amenities: z.array(z.string()),

  // isDeleted is optional and defaults to false (not deleted)
  isDeleted: z.boolean().optional(),
});
