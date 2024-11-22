import { useGetAllUsersQuery } from "@/api/apiSlice";
import ServerPaginate from "@/components/ServerPaginate";
import { useGlobalHooks } from "@/Hooks/globalHooks";
import { userColData } from "@/Utils/constants";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";

const AllCustomers = () => {
  const { handleSearch } = useGlobalHooks();
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const naviagte = useNavigate();

  const [queryData, setQueryData] = useState<{
    [key: string]: string | number;
  }>({
    page: 2,
  });

  const { data, isLoading, refetch } = useGetAllUsersQuery(queryData);

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
    refetch();
  }, [queryData]);

  return (
    <main>
      {isLoading ? (
        <article className="space-y-3">
          <Skeleton height={100} />
        </article>
      ) : (
        <section className="relative">
          <DataTable
            columns={userColData}
            data={filteredData}
            customStyles={tableCustomStyles}
            onRowClicked={handleRowClicked}
            className="cursor-pointer pb-20"
          />

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
        </section>
      )}
    </main>
  );
};

export default AllCustomers;
