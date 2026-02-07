import Skeleton from 'react-loading-skeleton';

const ReviewSkeleton = () => {
   return (
      <div className="flex flex-col gap-5">
         <Skeleton width={100} />
         <Skeleton count={2} />
         <Skeleton width={150} />
      </div>
   );
};

export default ReviewSkeleton;
