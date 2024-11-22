import { Product } from "@/types/Markets";
import { formatNumInThousands } from "@/Utils/helpers";
import { Link } from "react-router-dom";

const ProductCard = ({
  className,
  productData,
}: {
  className?: string;
  productData: Product;
  relatedUrl?: string;
}) => {
  return (
    <>
      <article
        className={`${className} card group relative flex h-[250px] min-h-[300px] flex-col justify-between overflow-hidden pb-4 hover:!border-secColor`}
      >
        {" "}
        {(productData?.quantity as number) <= 0 && (
          <div className="absolute left-1 top-[3%] z-50">
            <p className="outstock-btn">Out of Stock</p>
          </div>
        )}
        <Link to={`/product-deets$/${productData?.id}`}>
          <figure className="zoomImg relative h-20 overflow-hidden rounded-lg lg:h-40">
            <img
              src={
                productData?.images
                  ? (productData?.images[0]?.image_url as string)
                  : ""
              }
              alt="TBT product image"
              className="!h-full object-contain"
            />
          </figure>
          <div className="p-2">
            <hgroup className="flex flex-col justify-between">
              <h4 className="text-xs font-extrabold text-pryColor lg:text-sm">
                {productData?.name} {productData?.weight}{" "}
              </h4>
              <h4 className="mt-2 text-base font-bold">
                ₦{formatNumInThousands(productData?.tbt_price as number)}{" "}
              </h4>
            </hgroup>
          </div>
        </Link>
        {/* <button
          className="sec-btn mb-1 hidden justify-center !rounded-none !px-3 !py-2 !text-sm group-hover:flex"
          onClick={() => {
            setProductId(`${productData?.id}`);
            handleShow(`${productData?.id}`);
          }}
        >
          Quick View
        </button> */}
      </article>
    </>
  );
};

export default ProductCard;
