import Skeleton from "react-loading-skeleton";

const ProductSkeleton = () => {
  return (
    <ul className="grid grid-cols-4 justify-between gap-4">
      {Array.from({ length: 12 }).map((_, idx) => (
        <li key={idx} className="">
          <Skeleton containerClassName="" height={150} />
        </li>
      ))}
    </ul>
  );
};

export default ProductSkeleton;
