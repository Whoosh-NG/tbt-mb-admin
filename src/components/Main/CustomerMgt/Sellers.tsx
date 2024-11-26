import { useGetAllSellersQuery } from "@/api/apiSlice";
import ServerPaginate from "@/components/ServerPaginate";
import { useGlobalHooks } from "@/Hooks/globalHooks";
import { userColData } from "@/Utils/constants";
import { reftechData } from "@/Utils/helpers";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";

const Sellers = () => {
  const { handleSearch, setLoading, loading } = useGlobalHooks();
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const naviagte = useNavigate();

  const [queryData, setQueryData] = useState<{
    [key: string]: string | number;
  }>({
    page: 1,
  });

  const { data, isLoading, refetch } = useGetAllSellersQuery(queryData);

  const tableCustomStyles = {
    headCells: {
      style: {
        color: "var(--pryColor)",
        fontWeight: 600,
        backgroundColor: "#F6F6F7",
      },
    },
  };

  const handleRowClicked = (row: { [keys: string]: string | number }) => {
    naviagte(`/consignment/${row?.id}`);
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
    <main>
      <section className="relative">
        {loading["active"] ? (
          <ul className="space-y-4">
            {Array.from({ length: 6 }).map((_, idx) => (
              <li key={idx} className="">
                <Skeleton containerClassName="" height={50} />
              </li>
            ))}
          </ul>
        ) : (
          <DataTable
            columns={userColData}
            data={filteredData}
            customStyles={tableCustomStyles}
            onRowClicked={handleRowClicked}
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

export default Sellers;
