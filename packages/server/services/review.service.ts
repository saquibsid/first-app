import { Review } from '../generated/prisma/client';
import { reviewRepository } from '../repositories/review.repository';
import { llmClient } from '../llm/llm.client';
import template from '../prompts/review-prompt.txt';
export const reviewService = {
   async getReviewsByProductId(
      productId: number,
      limit?: number
   ): Promise<Review[]> {
      return reviewRepository.getReviewsByProductId(productId, limit);
   },

   async summarizeReviews(productId: number): Promise<string> {
      const existingSummary =
         await reviewRepository.getSummaryByProductId(productId);
      if (existingSummary) {
         return existingSummary;
      }

      const reviews = await reviewRepository.getReviewsByProductId(
         productId,
         10
      );
      const joinedReviews = reviews.map((r) => r.content).join('\n\n');
      const prompt = template.replace('{reviews}', joinedReviews);

      // const response = await llmClient.generateResponse({
      //    model: 'gpt-4o-mini',
      //    prompt,
      //    temperature: 0.3,
      //    maxOutputTokens: 150,
      // });
      const summary = await llmClient.summarizeReviews(joinedReviews);
      // const summary = response.text;
      await reviewRepository.storeSummary(productId, summary);
      return summary;
   },
};
