import Button from "@/components/ui/Button";
import { useGlobalHooks } from "@/Hooks/globalHooks";
import { FaPlus } from "react-icons/fa";
import { selectGlobal } from "@/Redux/Features/globalSlice";
import { useAppSelector } from "@/Redux/reduxHooks";
import { useGetAllCouponsQuery } from "@/api/apiSlice";
import Skeleton from "react-loading-skeleton";
import ManageCoupons from "./ManageCoupons";
import { couponColData, tableCustomStyles } from "@/Utils/constants";
import DataTable from "react-data-table-component";

const Coupons = () => {
  const { handleShow } = useGlobalHooks();
  const toggle = useAppSelector(selectGlobal);
  const { data, isLoading } = useGetAllCouponsQuery({});

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
        <h4>Coupons Management</h4>
        <Button
          onClick={() => handleShow("new-coupon")}
          className="main-btn flex items-center gap-3"
        >
          {" "}
          <FaPlus /> Add New Coupon
        </Button>
      </header>

      <section className=" ">
        <DataTable
          columns={couponColData()}
          data={data?.data}
          customStyles={tableCustomStyles}
          className="cursor-pointer pb-20"
        />
      </section>

      {toggle["new-coupon"] && (
        <ManageCoupons id="new-coupon" close={() => handleShow("new-coupon")} />
      )}
    </main>
  );
};

export default Coupons;
