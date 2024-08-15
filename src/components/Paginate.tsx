import { selectSearch } from '@/Redux/Features/globalSlice';
import { useAppSelector } from '@/Redux/reduxHooks';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

interface IPaginate {
  isLoading?: boolean;
  data: any[];
  currentPage: any;
  setCurrentPage: Dispatch<SetStateAction<any[]>>;
  searchParams: string;
  handleSearch: (
    data: any[],
    searchQuery: string,
    updateCurrentPage: (newData: any) => void,
    searchParams: string,
  ) => void;
}

const Paginate: React.FC<IPaginate> = ({
  isLoading,
  data,
  currentPage,
  setCurrentPage,
  searchParams,
  handleSearch,
}) => {
  const searchQuery = useAppSelector(selectSearch);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 7;

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;

    setItemOffset(newOffset);
  };

  useEffect(() => {
    const updateCurrentPage = (newData: any) => {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentPage(newData.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(newData.length / itemsPerPage));
    };

    handleSearch(data, searchQuery, updateCurrentPage, searchParams);
  }, [searchQuery, data, itemOffset, itemsPerPage, setCurrentPage]);

  return (
    <section className='mt-3 flex  w-full'>
      {!isLoading && data && (
        <ReactPaginate
          breakLabel='...'
          nextLabel={
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
            >
              <path
                d='M7.84375 7.41L12.4237 12L7.84375 16.59L9.25375 18L15.2537 12L9.25375 6L7.84375 7.41Z'
                fill='#C4CDD5'
              />
            </svg>
          }
          previousLabel={
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
            >
              <path
                d='M16.1562 7.41L11.5763 12L16.1562 16.59L14.7463 18L8.74625 12L14.7463 6L16.1562 7.41Z'
                fill='#C4CDD5'
              />
            </svg>
          }
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName='paginContainer'
          activeClassName='activePage'
          previousClassName={currentPage === 0 ? 'disabled' : ''}
          nextClassName={currentPage === pageCount - 1 ? 'disabled' : ''}
          renderOnZeroPageCount={null}
        />
      )}
    </section>
  );
};

export default Paginate;
