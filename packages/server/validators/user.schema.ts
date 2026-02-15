import z from 'zod';

export const registerUserSchema = z.object({
   body: z.object({
      firstName: z
         .string()
         .trim()
         .min(3, 'First name should be atleast 3 characters!'),
      lastName: z
         .string()
         .trim()
         .min(3, 'Last name should be atleast 3 characters!'),
      email: z.email(),
      password: z.string().min(6),
   }),
});

export type RegisterUserInput = z.infer<typeof registerUserSchema>['body'];
