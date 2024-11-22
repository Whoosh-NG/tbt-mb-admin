import { useAppDispatch, useAppSelector } from "@/Redux/reduxHooks";
import "./Admin.scss";

import { IAdminData } from "@/types/Admin";
import { selectGlobal, selectSearch } from "@/Redux/Features/globalSlice";
import { useEffect, useState } from "react";
import { useGlobalHooks } from "@/Hooks/globalHooks";
import Search from "@/components/ui/Search";
import { AiFillPlusCircle } from "react-icons/ai";
import AddAdmin from "@/components/Main/AdministratorsComps/AddAdmin";
import { AdministratorCard } from "@/components/Main/AdministratorsComps/AdministratorCard";
import { getAllAdmin } from "@/Redux/Features/userDatasSlice";
import { useGetAllAdminQuery } from "@/api/apiSlice";

import Paginate from "@/components/Paginate";
import useUpdatePageName from "@/Hooks/useUpdatePageName";
import Skeleton from "react-loading-skeleton";

const Administrators = () => {
  useUpdatePageName("Administrators");
  const { handleShow, handleSearch } = useGlobalHooks();
  const toggle = useAppSelector(selectGlobal);
  const searchQuery = useAppSelector(selectSearch);
  const [filteredData, setFilteredData] = useState<any[]>([]);

  const dispatch = useAppDispatch();

  const { data, isLoading } = useGetAllAdminQuery({});

  useEffect(() => {
    dispatch(getAllAdmin(data?.data));
  }, [dispatch, data]);

  if (isLoading) {
    return (
      <ul className="card mx-auto mt-5 w-11/12 py-3">
        {" "}
        <Skeleton count={8} />
      </ul>
    );
  }

  console.log(data);

  return (
    <main className="admin">
      <section className="container mx-auto mt-5 flex w-11/12 flex-col py-3">
        <ul className="mb-5 flex items-center justify-between">
          <li className="w-full md:w-6/12">
            <Search placeholder="Search" />
          </li>
          <li>
            <button
              onClick={() => handleShow("addAdmin")}
              className="main-btn flex items-center gap-2"
            >
              <AiFillPlusCircle /> <span>Add Administrator</span>
            </button>
          </li>
        </ul>

        <header className="bg-white p-3">
          <ul className="flex flex-wrap justify-between text-Grey2">
            <li className="w-full md:w-4/12">Full name</li>
            <li className="w-full md:w-3/12">Email</li>

            <li className="w-full md:w-2/12">Phone</li>
            <li className="w-full md:w-3/12">Action</li>
          </ul>
        </header>

        {filteredData.length === 0 && searchQuery !== "" ? (
          <div>
            {" "}
            <p> There&apos;s no match to your search</p>{" "}
          </div>
        ) : (
          <ul>
            {filteredData?.map(
              ({ id, full_name, email, phone_number }: IAdminData) => (
                <li key={id} className="my-2 bg-white p-3">
                  <AdministratorCard
                    id={id}
                    fullName={full_name}
                    email={email}
                    role={phone_number}
                  />
                </li>
              ),
            )}
          </ul>
        )}

        <div className="">
          <Paginate
            // isLoading={isLoading}
            data={data?.data}
            handleSearch={handleSearch}
            currentPage={filteredData}
            setCurrentPage={setFilteredData}
            searchParams="full_name"
          />
        </div>
      </section>
      {toggle && (
        <AddAdmin id="addAdmin" close={() => handleShow("addAdmin")} />
      )}
    </main>
  );
};

export default Administrators;
