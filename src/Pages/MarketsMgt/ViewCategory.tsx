import {
  useGetCategoryByIdQuery,
  useGetProductByCategoryIdQuery,
} from "@/api/apiSlice";
import ProductCard from "@/components/Main/Products/ProductCard";
import ServerPaginate from "@/components/ServerPaginate";
import GoBackBtn from "@/components/ui/GoBackBtn";
import { useGlobalHooks } from "@/Hooks/globalHooks";
import useUpdatePageName from "@/Hooks/useUpdatePageName";
import { Product } from "@/types/Products";
import { reftechData } from "@/Utils/helpers";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useParams } from "react-router-dom";

const ViewCategory = () => {
  useUpdatePageName("View Categories");
  const { id } = useParams();

  const { data: category, isLoading } = useGetCategoryByIdQuery(id);

  const { handleSearch, setLoading, loading } = useGlobalHooks();
  const [filteredData, setFilteredData] = useState<any[]>([]);

  const [queryData, setQueryData] = useState<{
    [key: string]: string | number;
  }>({
    page: "1",
  });

  const {
    data,
    isLoading: producting,
    refetch,
  } = useGetProductByCategoryIdQuery({
    categId: id as string,
    params: queryData as {
      [key: string]: string;
    },
  });

  useEffect(() => {
    reftechData(refetch, "active", setLoading);
  }, [queryData]);

  if (isLoading || producting) {
    return (
      <section className="container h-[50vh]">
        <Skeleton count={6} containerClassName="!h-full" height={30} />
      </section>
    );
  }

  return (
    <main className="container divide-y py-10">
      <header className="flex items-center gap-2">
        <GoBackBtn className="outline-btn" />
        <h3>View Category</h3>
      </header>
      <section className="my-6 flex w-full flex-wrap items-center justify-between gap-6 rounded-lg bg-pryColor py-5">
        <hgroup className="w-5/12">
          <h3 className="text-center text-white">{category?.data?.name}</h3>
          <h5 className="text-center text-white">
            {category?.data?.description}
          </h5>
        </hgroup>

        <figure className="flex-1 overflow-hidden rounded-xl">
          <img
            src={category?.data?.icon}
            alt=""
            className="!h-full object-cover"
          />
        </figure>
      </section>

      <section className="py-10">
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
            <ul className="grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-5 lg:gap-3">
              {filteredData?.map((item) => (
                <li key={item?.id} data-aos="fade-in">
                  <ProductCard productData={item} />
                </li>
              ))}
            </ul>
          )}
        </section>

        <div className="">
          <ServerPaginate
            data={data?.data?.data as Product[]}
            handleSearch={handleSearch}
            currentPage={filteredData}
            setCurrentPage={setFilteredData}
            searchParams="firstName"
            itemsPerPage={parseInt(queryData?.page as string)}
            totalItemsCount={data?.data?.last_page as number}
            setQueryData={setQueryData}
            keyIndex="page"
          />
        </div>
      </section>
    </main>
  );
};

export default ViewCategory;
