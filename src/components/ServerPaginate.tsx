import { selectSearch } from "@/Redux/Features/globalSlice";
import { useAppSelector } from "@/Redux/reduxHooks";
import { Dispatch, SetStateAction, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ReactPaginate from "react-paginate";

interface IPaginate {
  isLoading?: boolean;
  data: any[];
  currentPage: any;
  setCurrentPage: Dispatch<SetStateAction<any[]>>;
  setQueryData: Dispatch<SetStateAction<{ [key: string]: string | number }>>;
  searchParams: string;
  itemsPerPage: number;
  totalItemsCount: number;
  keyIndex?: string;
  handleSearch: (
    data: any[],
    searchQuery: string,
    updateCurrentPage: (newData: any) => void,
    searchParams: string,
  ) => void;
}

const ServerPaginate: React.FC<IPaginate> = ({
  isLoading,
  data,
  currentPage,
  setCurrentPage,
  searchParams,
  handleSearch,
  itemsPerPage,
  totalItemsCount,
  setQueryData,
  keyIndex,
}) => {
  const searchQuery = useAppSelector(selectSearch);

  const pageCount = totalItemsCount;
  // const pageCount = totalItemsCount / itemsPerPage;

  const handlePageClick = (e: any) => {
    setQueryData((prev) => ({
      ...prev,
      [keyIndex ?? "pageNumber"]: e?.selected + 1,
    }));
  };

  useEffect(() => {
    handleSearch(data, searchQuery, setCurrentPage, searchParams);
  }, [searchQuery, data, itemsPerPage, setCurrentPage]);

  return (
    <section className="mt-3 flex w-full flex-wrap justify-between gap-4">
      <div className="flex items-center gap-3">
        <p className="text-grey-300 text-xs font-medium">
          {" "}
          Showing Page: <span className="text-pryColor">
            {itemsPerPage}
          </span> of {totalItemsCount}{" "}
        </p>
      </div>
      <div className="flex items-center gap-3">
        {!isLoading && data && (
          <ReactPaginate
            breakLabel="..."
            nextLabel={<FaChevronRight />}
            previousLabel={<FaChevronLeft />}
            pageCount={pageCount}
            pageRangeDisplayed={1}
            marginPagesDisplayed={1}
            onPageChange={handlePageClick}
            containerClassName="paginContainer"
            activeClassName="activePage"
            pageClassName="pageClass"
            previousClassName={currentPage === 0 ? "disabled" : "prev"}
            nextClassName={currentPage === pageCount - 1 ? "disabled" : "next"}
            renderOnZeroPageCount={null}
          />
        )}
      </div>
    </section>
  );
};

export default ServerPaginate;
