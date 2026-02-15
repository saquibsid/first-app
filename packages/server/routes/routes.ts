import express, { Request, Response } from 'express';
import { chatController } from '../controllers/chat.controller';
import { reviewController } from '../controllers/review.controller';
import { userController } from '../controllers/user.controller';
import { asyncHandler } from '../utils/async-handler';
import { validate } from '../middlewares/validate';
import { registerUserSchema } from '../validators/user.schema';
import { loginUserSchema } from '../validators/login-user-schema';
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
   res.json({ message: 'Hello, World!' });
});

router.post('/api/chat', async (req, res) => {
   chatController.sendMessage(req, res);
});

router.get('/api/product/:id/reviews', async (req, res) => {
   reviewController.getReviews(req, res);
});

router.post('/api/product/:id/reviews/summarize', async (req, res) => {
   reviewController.summarizeReviews(req, res);
});

router.post(
   '/api/user/register',
   validate(registerUserSchema),
   asyncHandler(userController.register)
);

router.post(
   '/api/user/login',
   validate(loginUserSchema),
   asyncHandler(userController.loginUser)
);

export default router;
