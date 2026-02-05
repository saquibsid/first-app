import { PrismaClient, Review } from '../generated/prisma/client';

export const reviewRepository = {
   async getReviewsByProductId(productId: number): Promise<Review[]> {
      const prisma = new PrismaClient();
      return prisma.review.findMany({
         where: {
            productId: productId,
         },
      });
   },
};
