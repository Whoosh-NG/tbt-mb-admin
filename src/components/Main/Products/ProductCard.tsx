import { useDeleteProductsMutation } from "@/api/apiSlice";
import Button from "@/components/ui/Button";
import { IServerError } from "@/types/GlobalInterfaces";
import { Product } from "@/types/Products";
import { formatNumInThousands } from "@/Utils/helpers";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const ProductCard = ({
  className,
  productData,
}: {
  className?: string;
  productData: Product;
  relatedUrl?: string;
}) => {
  const [editProduct, { isLoading }] = useDeleteProductsMutation();

  const handleDeletePorduct = async () => {
    try {
      const rsp = await editProduct(productData?.id);
      if (rsp?.error) {
        toast.error(
          (rsp?.error as IServerError).data.message ||
            "Unable to create product",
        );
      } else {
        toast.success(rsp?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
      <div className="container flex flex-wrap justify-between gap-3">
        <Button
          link
          href={`/edit-product/${productData?.id}`}
          className="w-full md:w-5/12"
        >
          Edit
        </Button>
        <Button
          onClick={handleDeletePorduct}
          type="button"
          className="w-full !bg-negative md:w-5/12"
          loading={isLoading}
        >
          Delete
        </Button>
      </div>
    </article>
  );
};

export default ProductCard;
