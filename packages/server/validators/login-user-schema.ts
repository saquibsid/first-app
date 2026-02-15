import { password } from 'bun';
import z from 'zod';

export const loginUserSchema = z.object({
   body: z.object({
      email: z.email(),
      password: z.string().min(6),
   }),
});

export type loginUserInput = z.infer<typeof loginUserSchema>['body'];
