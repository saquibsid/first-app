import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { FaHandSparkles } from 'react-icons/fa';
import { StarRating } from './StarRating';
import { Button } from '../ui/Button';
import ReviewSkeleton from './ReviewSkeleton';

type Props = {
   productId: number;
};

type ReviewData = {
   id: number;
   productId: number;
   rating: number;
   content: string;
   createdAt: string;
};

type ReviewAPIResponse = {
   reviews: ReviewData[];
   summary: string;
};

type SummarizeResponse = {
   summary: string;
};

export const ReviewList = ({ productId }: Props) => {
   const fetchReviews = async () => {
      const { data } = await axios.get<ReviewAPIResponse>(
         `/api/product/${productId}/reviews`
      );
      return data;
   };
   const fetchReviewsQuery = useQuery({
      queryKey: ['reviews', productId],
      queryFn: fetchReviews,
   });

   const summarizeReviews = async () => {
      const { data } = await axios.post<SummarizeResponse>(
         `/api/product/${productId}/reviews/summarize`
      );
      return data;
   };

   const summarizeMutation = useMutation<SummarizeResponse>({
      mutationFn: () => summarizeReviews(),
   });

   if (fetchReviewsQuery.isLoading)
      return (
         <div className="flex flex-col gap-5">
            {[1, 2, 3].map((placeholder) => (
               <ReviewSkeleton key={placeholder} />
            ))}
         </div>
      );
   if (fetchReviewsQuery.error)
      return <p className="text-red-500">{fetchReviewsQuery.error.message}</p>;

   if (fetchReviewsQuery.data?.reviews.length === 0)
      return <p>No reviews found.</p>;
   const contentSummary =
      fetchReviewsQuery.data?.summary || summarizeMutation.data?.summary;
   return (
      <div>
         <div className="mb-3">
            {contentSummary ? (
               <p className="text-lg font-semibold">
                  Summary: {contentSummary}
               </p>
            ) : (
               <div>
                  <Button
                     disabled={summarizeMutation.isPending}
                     onClick={() => summarizeMutation.mutate()}
                  >
                     <FaHandSparkles />
                     Summarize
                  </Button>
                  {summarizeMutation.isPending && <ReviewSkeleton />}
                  {summarizeMutation.error && (
                     <p className="text-red-500">
                        {summarizeMutation.error.message}
                     </p>
                  )}
               </div>
            )}
         </div>
         <div className="flex flex-col gap-5">
            {fetchReviewsQuery.data?.reviews.map((review) => (
               <div key={review.id}>
                  <StarRating value={review.rating} />
                  <p>{review.content}</p>
                  <p>
                     Created at:{' '}
                     {new Date(review.createdAt).toLocaleDateString()}
                  </p>
               </div>
            ))}
         </div>
      </div>
   );
};
