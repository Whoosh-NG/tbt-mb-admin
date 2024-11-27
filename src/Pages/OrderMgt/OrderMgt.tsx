import { useGetAllOrdersQuery } from "@/api/apiSlice";
import ServerPaginate from "@/components/ServerPaginate";
import { useGlobalHooks } from "@/Hooks/globalHooks";
import useUpdatePageName from "@/Hooks/useUpdatePageName";
import { orderColData } from "@/Utils/constants";
import { reftechData } from "@/Utils/helpers";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Skeleton from "react-loading-skeleton";

const OrderMgt = () => {
  useUpdatePageName("Orders Management");

  const { handleSearch, setLoading, loading } = useGlobalHooks();
  const [filteredData, setFilteredData] = useState<any[]>([]);

  const [queryData, setQueryData] = useState<{
    [key: string]: string | number;
  }>({
    page: 1,
  });

  const { data, isLoading, refetch } = useGetAllOrdersQuery(queryData);

  const tableCustomStyles = {
    headCells: {
      style: {
        color: "var(--pryColor)",
        fontWeight: 600,
        backgroundColor: "#F6F6F7",
      },
    },
  };

  useEffect(() => {
    reftechData(refetch, "active", setLoading);
  }, [queryData]);

  if (isLoading) {
    return (
      <article className="space-y-3">
        <Skeleton height={50} count={8} />
      </article>
    );
  }

  return (
    <main className="container py-10">
      <section className="relative">
        {loading["active"] ? (
          <ul className="space-y-4">
            <Skeleton containerClassName="" height={50} count={8} />
          </ul>
        ) : (
          <DataTable
            columns={orderColData()}
            data={filteredData}
            customStyles={tableCustomStyles}
            className="cursor-pointer"
          />
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

export default OrderMgt;
