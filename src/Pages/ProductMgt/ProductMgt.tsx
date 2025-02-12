import { useGetAllProductsQuery } from "@/api/apiSlice";
import MakeTodaysDeal from "@/components/Main/Products/MakeTodaysDeal";
import ProductCard from "@/components/Main/Products/ProductCard";
import ServerPaginate from "@/components/ServerPaginate";
import { useGlobalHooks } from "@/Hooks/globalHooks";
import useUpdatePageName from "@/Hooks/useUpdatePageName";
import { selectGlobal } from "@/Redux/Features/globalSlice";
import { useAppSelector } from "@/Redux/reduxHooks";
import { reftechData } from "@/Utils/helpers";
import { Fragment, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

const ProductMgt = () => {
  useUpdatePageName("Product Managements");

  const toggle = useAppSelector(selectGlobal);
  const { handleSearch, setLoading, handleShow, loading } = useGlobalHooks();
  const [filteredData, setFilteredData] = useState<any[]>([]);

  const [queryData, setQueryData] = useState<{
    [key: string]: string | number;
  }>({
    page: 1,
  });
  const { data, isLoading, refetch } = useGetAllProductsQuery(queryData);

  useEffect(() => {
    reftechData(refetch, "active", setLoading);
  }, [queryData]);

  if (isLoading) {
    return (
      <main className="container py-10">
        <ul className="grid w-full grid-cols-4 justify-between gap-4 py-10">
          {Array.from({ length: 12 }).map((_, idx) => (
            <li key={idx} className="">
              <Skeleton containerClassName="" height={150} />
            </li>
          ))}
        </ul>
      </main>
    );
  }
  return (
    <main className="container py-10">
      <header className="mb-10 flex flex-wrap justify-between gap-3">
        <h4>All Available Products</h4>
        <Link
          to="/add-new-product"
          className="main-btn flex items-center gap-3"
        >
          {" "}
          <FaPlus /> Add New Product
        </Link>
      </header>
      <section>
        {loading["active"] ? (
          <ul className="grid grid-cols-4 justify-between gap-4">
            {Array.from({ length: 12 }).map((_, idx) => (
              <li key={idx} className="">
                <Skeleton containerClassName="" height={150} />
              </li>
            ))}
          </ul>
        ) : (
          <ul className="grid grid-cols-3 gap-2 md:grid-cols-4 lg:gap-3">
            {filteredData?.map((item) => (
              <Fragment key={item?.id}>
                <li data-aos="fade-in">
                  <ProductCard productData={item} />
                </li>

                {toggle[`todays-deal-${item?.id}`] && (
                  <MakeTodaysDeal
                    id={`todays-deal-${item?.id}`}
                    close={() => handleShow(`todays-deal-${item?.id}`)}
                    productId={Number(item?.id)}
                  />
                )}
              </Fragment>
            ))}
          </ul>
        )}
      </section>

      <div className="">
        <ServerPaginate
          data={data?.data?.data}
          handleSearch={handleSearch}
          currentPage={filteredData}
          setCurrentPage={setFilteredData}
          searchParams="firstName"
          itemsPerPage={queryData?.page as number}
          totalItemsCount={data?.data?.last_page}
          setQueryData={setQueryData}
          keyIndex="page"
        />
      </div>
    </main>
  );
};

export default ProductMgt;
