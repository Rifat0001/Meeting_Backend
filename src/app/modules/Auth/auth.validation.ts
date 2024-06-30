import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string({ required_error: 'name is required.' }), // Optional if desired
  email: z
    .string({ required_error: 'email is required.' })
    .email('Invalid email')
    .trim(),
  password: z
    .string({ required_error: 'password is required.' })
    .min(8, 'Password must be at least 8 characters long'),
  phone: z.string({ required_error: 'phone is required.' }), // Optional if desired
  address: z.string({ required_error: 'address is required.' }), // Optional if desired
  role: z.enum(['user', 'admin'], { required_error: 'role is required.' }),
  isDeleted: z.boolean({ required_error: 'isDeleted is required.' }),
});

const loginValidationSchema = z.object({
  email: z.string({ required_error: 'email is required.' }),
  password: z.string({ required_error: 'Password is required' }),
});

const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'Old password is required',
    }),
    newPassword: z.string({ required_error: 'Password is required' }),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required!',
    }),
  }),
});

export const AuthValidation = {
  loginValidationSchema,
  changePasswordValidationSchema,
  refreshTokenValidationSchema,
};
