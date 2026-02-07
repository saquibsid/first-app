import dayjs from 'dayjs';
import { PrismaClient, Review } from '../generated/prisma/client';
import { get } from 'react-hook-form';

const prisma = new PrismaClient();
export const reviewRepository = {
   async getReviewsByProductId(
      productId: number,
      limit?: number
   ): Promise<Review[]> {
      return prisma.review.findMany({
         where: {
            productId: productId,
         },
         take: limit,
      });
   },
   async storeSummary(productId: number, summary: string) {
      const now = new Date();
      const expiresAt = dayjs().add(7, 'day').toDate();
      const data = {
         content: summary,
         productId,
         expiresAt,
         generatedAt: now,
      };
      return prisma.summary.upsert({
         where: {
            productId: productId,
         },
         create: data,
         update: data,
      });
   },

   async getSummaryByProductId(productId: number): Promise<string | null> {
      const summary = await prisma.summary.findFirst({
         where: {
            AND: [{ productId: productId }, { expiresAt: { gt: new Date() } }],
         },
      });
      return summary ? summary.content : null;
   },
};
