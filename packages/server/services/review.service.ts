import { Review } from '../generated/prisma/client';
import { reviewRepository } from '../repositories/review.repository';

export const reviewService = {
   async getReviewsByProductId(productId: number): Promise<Review[]> {
      return reviewRepository.getReviewsByProductId(productId);
   },

   async summarizeReviews(productId: number): Promise<string> {
      const reviews = await reviewRepository.getReviewsByProductId(
         productId,
         10
      );
      const joinedReviews = reviews.map((r) => r.content).join('\n\n');
      const summary = 'this is a placeholder summary'; // Replace with actual summarization logic
      return summary;
   },
};
