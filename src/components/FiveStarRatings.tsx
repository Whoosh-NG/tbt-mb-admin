import { useGlobalHooks } from '@/Hooks/globalHooks';
import { BsStarFill } from 'react-icons/bs';

const FiveStarRatings = ({
  ratings,
  size,
}: {
  ratings: number;
  size: number;
}) => {
  const { getColor } = useGlobalHooks();

  return (
    <div className='w-7/12 flex gap-3'>
      {ratings !== null
        ? //    Generate an array based on the value of maxrating
          [...Array(5)].map((_, index) => (
            <BsStarFill
              key={index}
              size={size}
              className={getColor(ratings, index)}
            />
          ))
        : '-'}
    </div>
  );
};

export default FiveStarRatings;
