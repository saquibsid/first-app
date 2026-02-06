import { Review } from '../generated/prisma/client';
import { reviewRepository } from '../repositories/review.repository';
import { llmClient } from '../llm/llm.client';

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
      const prompt = `You are an expert product reviewer.
      Summarize the following product reviews: consider positive and negative sentiment\n\n${joinedReviews}`;

      const response = await llmClient.generateResponse({
         model: 'gpt-4o-mini',
         prompt,
         temperature: 0.3,
         maxOutputTokens: 150,
      });
      const summary = response.text;
      return summary;
   },
};
