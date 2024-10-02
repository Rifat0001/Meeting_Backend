import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import { TUserRole } from '../modules/Auth/auth.interface';
import { User } from '../modules/Auth/auth.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // catch the token from 
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(httpStatus.NOT_FOUND).json({
        "success": false,
        "statusCode": 401,
        "message": "You have no access to this route header",
      });
    }

    if (authHeader) {
      const token = authHeader;

      // if (!authHeader?.startsWith('Bearer ')) {
      //   throw new AppError(httpStatus.UNAUTHORIZED, 'No Bearer at the first');
      // }

      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;

      const { role, userId } = decoded;

      const userExist = await User.findById(userId);

      if (!userExist) {
        return res.status(httpStatus.NOT_FOUND).json({
          "success": false,
          "statusCode": 401,
          "message": "You have no access to this route user no",
        });
      }

      if (requiredRoles && !requiredRoles.includes(role)) {
        return res.status(httpStatus.NOT_FOUND).json({
          "success": false,
          "statusCode": 401,
          "message": "You have no access to this route role",
        });
      }

      req.user = decoded as JwtPayload;
      next();
    }
  });
};

export default auth;

