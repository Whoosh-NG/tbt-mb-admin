import { useGetAllBrandsQuery } from "@/api/apiSlice";
import { useGlobalHooks } from "@/Hooks/globalHooks";
import { selectGlobal } from "@/Redux/Features/globalSlice";
import { useAppSelector } from "@/Redux/reduxHooks";
import { brandColData } from "@/Utils/constants";
import DataTable from "react-data-table-component";
import { FaPlus } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import AddNewBrand from "./AddNewBrand";

const Brands = () => {
  const { data, isLoading } = useGetAllBrandsQuery({});
  const toggle = useAppSelector(selectGlobal);
  const { handleShow } = useGlobalHooks();

  const tableCustomStyles = {
    headCells: {
      style: {
        color: "var(--pryColor)",
        fontWeight: 600,
        backgroundColor: "#F6F6F7",
      },
    },
  };

  if (isLoading) {
    return (
      <main className="container py-10">
        <ul className="space-y-4 py-10">
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
      <header className="mb-5 flex flex-wrap justify-between gap-3">
        <h4>All Brands</h4>
        <button
          onClick={() => handleShow("new-brand")}
          className="main-btn flex items-center gap-3"
        >
          {" "}
          <FaPlus /> Add New Brand
        </button>
      </header>

      <section className=" ">
        <DataTable
          columns={brandColData()}
          data={data?.data}
          customStyles={tableCustomStyles}
          className="cursor-pointer pb-20"
        />
      </section>

      {toggle["new-brand"] && (
        <AddNewBrand id="new-brand" close={() => handleShow("new-brand")} />
      )}
    </main>
  );
};

export default Brands;
