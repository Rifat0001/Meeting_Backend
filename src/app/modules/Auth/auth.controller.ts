import httpStatus from 'http-status';
import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

const getAllStudents = catchAsync(async (req, res) => {
  const result = await AuthServices.getAllUser();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All users are retrieved successfully',
    data: result,
  });
});

const signUpUser = catchAsync(async (req, res) => {
  const result = await AuthServices.signUpUsersIntoDB(req.body);

  const responseData = {
    _id: result._id,
    name: result.name,
    email: result.email,
    phone: result.phone,
    role: result.role,
    address: result.address,
  };

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered successfully',
    data: responseData,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { refreshToken, accessToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });
  const { _id, name, email, phone, role, address } = result.user;

  const data = {
    _id,
    name,
    email,
    phone,
    role,
    address,
  };
  res.send({
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfully',
    token: accessToken,
    data,
  });
});

export const AuthControllers = {
  loginUser,
  getAllStudents,
  signUpUser,
  // changePassword,
  // refreshToken,
};
