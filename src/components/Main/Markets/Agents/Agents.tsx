import { useGetAllAgentsQuery } from "@/api/apiSlice";
import { useGlobalHooks } from "@/Hooks/globalHooks";
import { selectGlobal } from "@/Redux/Features/globalSlice";
import { useAppSelector } from "@/Redux/reduxHooks";
import { FaPlus } from "react-icons/fa";
import AddNewAgent from "./AddNewAgent";
import DataTable from "react-data-table-component";
import Skeleton from "react-loading-skeleton";
import { agentColData } from "@/Utils/constants";

const Agents = () => {
  const { handleShow } = useGlobalHooks();
  const toggle = useAppSelector(selectGlobal);
  const { data, isLoading } = useGetAllAgentsQuery({});
  console.log(data);

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
              <Skeleton containerClassName="" height={50} />
            </li>
          ))}
        </ul>
      </main>
    );
  }
  return (
    <>
      <main className="container py-10">
        <header className="mb-5 flex flex-wrap justify-between gap-3">
          <h4>All Brands</h4>
          <button
            onClick={() => handleShow("add-agent")}
            className="main-btn flex items-center gap-3"
          >
            {" "}
            <FaPlus /> Add New Agent
          </button>
        </header>

        <section className=" ">
          <DataTable
            columns={agentColData()}
            data={data?.data}
            customStyles={tableCustomStyles}
            className="cursor-pointer pb-20"
          />
        </section>

        {toggle["add-agent"] && (
          <AddNewAgent id="add-agent" close={() => handleShow("add-agent")} />
        )}
      </main>
    </>
  );
};

export default Agents;
