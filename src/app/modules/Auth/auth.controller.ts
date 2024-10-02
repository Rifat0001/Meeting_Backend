import httpStatus from 'http-status';
import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';
import { TUser } from './auth.interface';

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

  console.log(result)
  res.send({
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfully',
    token: accessToken,
    data,
  });
});

// Update user role controller
const updateUserRoleController = catchAsync(async (req, res) => {
  const userId = req.params.id; // Get userId from route params
  console.log('hi', userId)
  const updatedUser = await AuthServices.updateUserRole(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User role updated successfully',
    data: updatedUser,
  });
});

const getUserById = catchAsync(async (req, res) => {
  const userId = req.params.id;
  const result = await AuthServices.getSingleUserFromDB(userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'user retrieved successfully',
    data: result,
  });
});

// Update user information controller
const updateUserInfo = catchAsync(async (req, res) => {
  const userId = req.user.userId; // Get userId from the decoded token.

  const updatedUser = await AuthServices.updateUserInformation(userId, req.body);
  console.log('update', updatedUser)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User information updated successfully',
    data: updatedUser,
  });
});


export const AuthControllers = {
  loginUser,
  getAllStudents,
  signUpUser,
  updateUserRoleController,
  getUserById,
  updateUserInfo
};
