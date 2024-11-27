import GoBackBtn from "@/components/ui/GoBackBtn";
import { IServerError } from "@/types/GlobalInterfaces";

import {
  useGetOrderbyIdQuery,
  useUpdateOrderStatusMutation,
} from "@/api/apiSlice";
import toast from "react-hot-toast";

import { useParams } from "react-router-dom";

import { useGlobalHooks } from "@/Hooks/globalHooks";
import Field from "@/components/ui/Field";
import { formatNumInThousands, readableDateTime } from "@/Utils/helpers";
import Skeleton from "react-loading-skeleton";
import Button from "@/components/ui/Button";
import { BsXLg } from "react-icons/bs";
import PopUp from "@/components/popUps/PopUp";
import { selectGlobal } from "@/Redux/Features/globalSlice";
import { useAppSelector } from "@/Redux/reduxHooks";
import { FormEvent, useState } from "react";

const ViewOrder = () => {
  const { handleShow } = useGlobalHooks();
  const toggle = useAppSelector(selectGlobal);
  const { id } = useParams();

  const { data, isLoading, refetch } = useGetOrderbyIdQuery(id as string, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  const [status, setStatus] = useState<string>(data?.data?.status);

  const [updateStatus, { isLoading: updating }] =
    useUpdateOrderStatusMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const rsp = await updateStatus({ order_id: id, status: status });

      if (rsp?.error) {
        toast.error(
          (rsp?.error as IServerError).data.message ||
            "Unable to change order status",
        );
      } else {
        toast.success(rsp?.data?.message);
        refetch();
        handleShow("change-status");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return (
      <article className="container space-y-3 py-10">
        <Skeleton height={150} count={3} />
      </article>
    );
  }

  return (
    <main className="container my-10">
      <header className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <GoBackBtn className="outline-btn" />
          <h3>View Order</h3>
        </div>

        <div className="flex items-center gap-3">
          <p>
            Tracking Status: <b>{data?.data?.status}</b>{" "}
          </p>{" "}
          <Button
            type="button"
            onClick={() => handleShow("change-status")}
            className="main-btn"
          >
            Change Status
          </Button>
        </div>
      </header>

      <section className="space-y-4 py-6">
        <article className="card space-y-4 divide-y px-3 py-2">
          <div className="flex items-center justify-between">
            <h4>Ordered Information</h4>

            <div>
              <button className="main-btn">Confirm Payment</button>
            </div>
          </div>

          <div className="flex justify-between gap-4 divide-x pt-5">
            <Field className="pl-5" title="Order Id" value={data?.data?.id} />
            <Field
              className="pl-5"
              title="Order Ref."
              value={data?.data?.order_reference}
            />
            <Field
              className="pl-5"
              title="Total Weights"
              value={data?.data?.total_weight}
            />
            <Field
              className="pl-5"
              title="Payment Method"
              value={data?.data?.payment_method}
            />
            <Field
              className="pl-5"
              title="Payment Status"
              value={data?.data?.payment_status}
            />
            <Field
              className="pl-5"
              title="Delivery Fee"
              value={`₦${formatNumInThousands(data?.data?.delivery_fee)}`}
            />
            <Field
              className="pl-5"
              title="Total"
              value={`₦${formatNumInThousands(data?.data?.total)}`}
            />
          </div>

          <div className="pt-4">
            <h5>Ordered Products</h5>
            <ul className="space-y-3 divide-y">
              {data?.data?.items.map(
                ({
                  id,
                  product,
                  amount,
                  quantity,
                }: {
                  id: string;
                  product: { name: string };
                  amount: number;
                  quantity: number;
                }) => (
                  <li
                    key={id}
                    className="flex justify-between gap-4 divide-x py-3"
                  >
                    <Field
                      className="pl-5"
                      title="Product Name"
                      value={product?.name}
                    />
                    <Field
                      className="pl-5"
                      title="Product Amount"
                      value={`₦${formatNumInThousands(amount)}`}
                    />
                    <Field className="pl-5" title="Quantity" value={quantity} />
                    <Field
                      className="pl-5"
                      title="Sub total"
                      value={`₦${formatNumInThousands(amount * quantity)}`}
                    />
                  </li>
                ),
              )}
            </ul>
          </div>
        </article>
        <article className="card space-y-2 px-3 py-2">
          <h4>User Information</h4>
          <hr />
          <div className="flex justify-between gap-4 divide-x pt-5">
            <Field
              className="pl-5"
              title="User Name"
              value={`${data?.data?.user?.first_name} ${data?.data?.user?.last_name} `}
            />
            <Field
              className="pl-5"
              title="User Email"
              value={data?.data?.user?.email}
            />
            <Field
              className="pl-5"
              title="Phone Number"
              value={data?.data?.user?.phone_number}
            />
          </div>
        </article>
        <article className="card space-y-2 px-3 py-2">
          <div className="flex items-center justify-between">
            <h4>Shipping Information</h4>
            <div className="flex items-center gap-3">
              <p>
                Tracking Status: <b>{data?.data?.status}</b>{" "}
              </p>{" "}
              <Button
                type="button"
                onClick={() => handleShow("change-status")}
                className="main-btn"
              >
                Change Status
              </Button>
            </div>
          </div>
          <hr />
          <div className="flex justify-between gap-4 divide-x pt-5">
            <Field
              className="pl-5"
              title="User Name"
              value={`${data?.data?.shipment?.first_name} ${data?.data?.shipment?.last_name} `}
            />
            <Field
              className="pl-5"
              title="User Email"
              value={data?.data?.shipment?.email}
            />
            <Field
              className="pl-5"
              title="Phone Number"
              value={data?.data?.shipment?.phone_number}
            />
            <Field
              className="pl-5"
              title="Address"
              value={data?.data?.shipment?.delivery_address}
            />
            <Field
              className="pl-5"
              title="Date"
              value={readableDateTime(data?.data?.shipment?.delivery_date)}
            />
          </div>
        </article>
      </section>

      {toggle["change-status"] && (
        <PopUp id="change-status">
          <section className="animate__animated animate__bounceIn mx-auto flex w-11/12 flex-col gap-3 overflow-y-auto rounded-3xl bg-white py-5 md:w-7/12 lg:w-6/12">
            <header className="container flex justify-between">
              <h4>Change Status</h4>
              <button onClick={() => handleShow("change-status")} type="button">
                <BsXLg />
              </button>
            </header>
            <hr />

            <form onSubmit={handleSubmit} className="container space-y-4 py-6">
              <select
                name="status"
                id="status"
                onChange={(e) => setStatus(e.target.value)}
                value={status}
                className="form-control"
              >
                {[
                  "Pending",
                  "Accepted",
                  "Ready",
                  "In-Transit",
                  "On-Hold",
                  "Cancelled",
                  "Delivered",
                ].map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <div className="mt-6 flex items-center gap-3">
                <Button
                  onClick={() => handleShow("change-status")}
                  className="outline-btn"
                  type="button"
                >
                  {" "}
                  Cancel
                </Button>
                <Button type="submit" loading={updating}>
                  {" "}
                  Change Status
                </Button>
              </div>
            </form>
          </section>
        </PopUp>
      )}
    </main>
  );
};

export default ViewOrder;
