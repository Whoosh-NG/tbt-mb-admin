import Button from "@/components/ui/Button";
import { useGlobalHooks } from "@/Hooks/globalHooks";
import { FaPlus } from "react-icons/fa";
import { selectGlobal } from "@/Redux/Features/globalSlice";
import { useAppSelector } from "@/Redux/reduxHooks";
import { useGetServiceChargeQuery } from "@/api/apiSlice";
import Skeleton from "react-loading-skeleton";

import ManageServiceCharge from "./ManageServiceCharge";
import { serviceColData, tableCustomStyles } from "@/Utils/constants";
import DataTable from "react-data-table-component";

const ServiceCharge = () => {
  const { handleShow } = useGlobalHooks();
  const toggle = useAppSelector(selectGlobal);

  const { data, isLoading } = useGetServiceChargeQuery({});

  console.log(data);

  if (isLoading) {
    return (
      <main className="container py-10">
        <ul className="grid w-full grid-cols-4 justify-between gap-4 py-10">
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
      <header className="mb-10 flex flex-wrap justify-between gap-3">
        <h4>Service Charge</h4>
        <Button
          onClick={() => handleShow("new-service")}
          className="main-btn flex items-center gap-3"
        >
          {" "}
          <FaPlus />
          Create Service Charge
        </Button>
      </header>

      <section className=" ">
        <DataTable
          columns={serviceColData()}
          data={data?.data}
          customStyles={tableCustomStyles}
          className="cursor-pointer pb-20"
        />
      </section>

      {toggle["new-service"] && (
        <ManageServiceCharge
          id="new-service"
          close={() => handleShow("new-service")}
        />
      )}
    </main>
  );
};

export default ServiceCharge;
