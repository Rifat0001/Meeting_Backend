import { USER_ROLE } from './auth.constant';

export type TLoginUser = {
  email: string;
  password: string;
};

export interface TUser {
  name: string;
  email: string;
  password: string;
  phone: string; // Optional phone number
  address: string; // Optional address
  role: 'user' | 'admin'; // Assuming these are relevant statuses
  isDeleted: boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
