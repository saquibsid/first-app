import { PrismaClient, User } from '../generated/prisma/client';

const prisma = new PrismaClient();

export const userRepositary = {
   async addUser(userData: User) {
      return prisma.user.create({
         data: userData,
      });
   },

   async getUserByEmail(email: string) {
      return prisma.user.findUnique({
         where: { email: email },
      });
   },
};
