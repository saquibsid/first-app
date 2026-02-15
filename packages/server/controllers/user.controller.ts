import { Request, Response } from 'express';
import { userService } from '../services/user.service';

export const userController = {
   async register(req: Request, res: Response) {
      const user = await userService.register(req.body);
      return res
         .status(200)
         .json({ user, message: 'User is added successfully!' });
   },

   async loginUser(req: Request, res: Response) {
      const { email, password } = req.body;
      const accessToken = await userService.loginUser(email, password);
      return res.status(200).json(accessToken);
   },
};
