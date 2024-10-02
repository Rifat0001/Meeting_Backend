import httpStatus from 'http-status';
import { TLoginUser, TUser } from './auth.interface';
import bcrypt from 'bcrypt';
import { createToken } from './auth.utils';
// import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { User } from './auth.model';
import AppError from '../../errors/AppError';
import { USER_ROLE } from './auth.constant';

const signUpUsersIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist on this email
  const user = await User.findOne({ email: payload.email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  // checking if the user is blocked

  //checking if the password is correct
  const isPasswordValid = await bcrypt.compare(
    payload?.password,
    user?.password,
  );

  if (!isPasswordValid)
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  //create token and sent to the  client

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
    user,
    // needsPasswordChange: user?.needsPasswordChange,
  };
};

const getAllUser = async () => {
  const result = await User.find();

  return result;
};

// Update user role service
const updateUserRole = async (id: string): Promise<TUser | null> => {
  const user = await User.findOne({ _id: id });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  // Toggle user role
  user.role = user.role === 'user' ? 'admin' : 'user';
  await user.save();
  return user;
};

const getSingleUserFromDB = async (id: string) => {
  // console.log('room id = ', roomId);
  const userExist = await User.findOne({ _id: id });
  if (!userExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is not found !');
  }
  return userExist;
}

// Update user information service
const updateUserInformation = async (id: string, updates: Partial<TUser>): Promise<TUser | null> => {
  const user = await User.findOne({ _id: id });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  // Update the user information while preserving the role
  user.name = updates.name ?? user.name;
  user.email = updates.email ?? user.email;
  user.phone = updates.phone ?? user.phone;
  user.address = updates.address ?? user.address;

  // Only update the password if provided
  if (updates.password) {
    user.password = await bcrypt.hash(updates.password, 10);
  }

  await user.save();
  return user;
};



export const AuthServices = {
  loginUser,
  signUpUsersIntoDB,
  getAllUser,
  updateUserRole,
  getSingleUserFromDB,
  updateUserInformation
};
