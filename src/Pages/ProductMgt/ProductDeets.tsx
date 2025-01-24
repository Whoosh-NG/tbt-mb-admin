import { useGetProductByIdQuery } from "@/api/apiSlice";
import ProductGallery from "@/components/Main/Products/ProductDeets/ProductGallery";
import ProductInfoTabs from "@/components/Main/Products/ProductDeets/ProductInfoTabs";
import FiveStarRatings from "@/components/ui/FiveStarRatings";
import GoBackBtn from "@/components/ui/GoBackBtn";
import ProductSkeleton from "@/components/ui/ProductSkeleton";
import { ProductIamges } from "@/types/Products";
import { formatNumInThousands } from "@/Utils/helpers";
import { BsFacebook, BsTwitterX } from "react-icons/bs";
import { useParams } from "react-router-dom";

const ProductDeets = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetProductByIdQuery(id as string);

  if (isLoading) {
    return <ProductSkeleton />;
  }

  return (
    <main className="py-10">
      <div className="container mb-7">
        <GoBackBtn className="outline-btn" />
      </div>

      <section className="container flex flex-wrap-reverse justify-between gap-8">
        <div className="w-full lg:w-4/12">
          <ProductGallery imageList={data?.data?.images as ProductIamges[]} />
        </div>

        <aside className="w-full divide-y lg:w-6/12">
          <article className="space-y-8 py-5">
            <div className="flex flex-col-reverse items-start justify-between gap-y-4 md:flex-row lg:items-center">
              <h3 className="font-bold">{data?.data?.name}</h3>

              <p
                className={
                  (data?.data?.quantity as number) > 0
                    ? "positive-btn"
                    : "outstock-btn"
                }
              >
                {(data?.data?.quantity as number) > 0
                  ? "In Stock"
                  : "Out of Stock"}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <FiveStarRatings
                ratings={data?.data?.ratings_count as number}
                size={20}
              />
            </div>

            <div className="flex flex-col justify-between gap-y-4 lg:flex-row">
              <h4 className="font-bold">
                {" "}
                ₦{formatNumInThousands(data?.data?.tbt_price)}{" "}
              </h4>
              <div>
                <p className="flex items-center gap-3">
                  Share Product:
                  <span className="flex gap-3">
                    <BsFacebook className="text-pryColor" />{" "}
                    <BsTwitterX className="text-pryColor" />{" "}
                  </span>
                </p>
              </div>
            </div>
          </article>

          <article className="py-5">
            <p>{data?.data?.description}</p>
          </article>

          <article className="py-5">
            <p>
              <b> Category:</b> {data?.data?.category?.name}
            </p>
            <p>
              <b> Tags:</b> Rich in essential B-Vitamins, Iron, Dietary Fibers
              and Proteins.
            </p>
          </article>
        </aside>
      </section>

      <section className="py-10">
        <ProductInfoTabs
          desc={data?.data?.description as string}
          addtionalInfo={data?.data?.other_info as string}
        />
      </section>
    </main>
  );
};

export default ProductDeets;
