import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../generated/prisma/client';
import { userRepositary } from '../repositories/user.repository';
import { AppError } from '../utils/AppError';

export const userService = {
   async register(userdata: User) {
      const existingUser = await userRepositary.getUserByEmail(userdata.email);
      if (existingUser) {
         throw new AppError('Email already exist!', 400);
      }
      const hash = await bcrypt.hash(userdata.password, 10);
      userdata.password = hash;
      return userRepositary.addUser(userdata);
   },
   async loginUser(email: string, password: string) {
      const user = await userRepositary.getUserByEmail(email);
      if (!user) {
         throw new AppError('Email is not registered with us', 400);
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
         throw new AppError('Invalid credentials', 400);
      }
      const accessToken = jwt.sign(
         {
            id: user.id,
         },
         null,
         {
            algorithm: 'none',
            expiresIn: '10m',
         }
      );
      return { accessToken };
   },
};
