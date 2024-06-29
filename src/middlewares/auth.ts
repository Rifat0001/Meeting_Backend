import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { TUserRole } from '../modules/Auth/auth.interface';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import config from '../config';
import { User } from '../modules/Auth/auth.model';
// au 

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // catch the token from 
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You have no authorized token',
      );}

    if (authHeader) {
      // first remove the Bearer and get the actual token
      const token = authHeader.replace('Bearer ', '').trim();
      // console.log(token);
      // check is token is given
    
        // check the Bearer is in the start
      if (!authHeader?.startsWith('Bearer ')) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'No Bearer at the first');
      }
      // console.log(token);
      // checking if the given token is valid
      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;

      const { role, userId } = decoded;
      console.log(userId);
      // checking if the token is missing

      // checking if the user is exist
      const user = await User.findById(userId);

      if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
      }
      // checking if the user is already deleted

      if (requiredRoles && !requiredRoles.includes(role)) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          'You are not authorized  hi!',
        );
      }

      req.user = decoded as JwtPayload;
      next();
    }
  });
};
export default auth;
