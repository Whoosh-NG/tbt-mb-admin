import { useGetAllPickupChargeQuery } from "@/api/apiSlice";
import AddCharges from "@/components/Main/Logistics/AddCharges";
import { useGlobalHooks } from "@/Hooks/globalHooks";
import useUpdatePageName from "@/Hooks/useUpdatePageName";
import { selectGlobal } from "@/Redux/Features/globalSlice";
import { useAppSelector } from "@/Redux/reduxHooks";
import { logisticsColData } from "@/Utils/constants";
import DataTable from "react-data-table-component";
import { FaPlus } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";

const LogisticsMgt = () => {
  useUpdatePageName("Logistics Management");

  const { data, isLoading } = useGetAllPickupChargeQuery({});
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
        <Skeleton containerClassName="" height={50} count={12} />
      </main>
    );
  }

  return (
    <main className="container py-10">
      <header className="mb-5 flex flex-wrap justify-between gap-3">
        <h4>All Pickup Charges</h4>
        <button
          onClick={() => handleShow("new-brand")}
          className="main-btn flex items-center gap-3"
        >
          {" "}
          <FaPlus /> Add New Pickup Charge
        </button>
      </header>

      <section className=" ">
        <DataTable
          columns={logisticsColData()}
          data={data?.data}
          customStyles={tableCustomStyles}
          className="cursor-pointer pb-20"
        />
      </section>

      {toggle["new-brand"] && (
        <AddCharges id="new-brand" close={() => handleShow("new-brand")} />
      )}
    </main>
  );
};

export default LogisticsMgt;
