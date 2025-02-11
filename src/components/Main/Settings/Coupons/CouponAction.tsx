import Button from "@/components/ui/Button";
import { useGlobalHooks } from "@/Hooks/globalHooks";
import { useAppSelector } from "@/Redux/reduxHooks";
import { selectGlobal } from "@/Redux/Features/globalSlice";
import ManageCoupons from "./ManageCoupons";

const CouponAction = ({ data }: { data: { id: number; status: string } }) => {
  const toggle = useAppSelector(selectGlobal);
  const { handleShow } = useGlobalHooks();

  // const handleConfirmPayment = async () => {
  //   try {
  //     const rsp = await confirmPay({ order_id: id });

  //     if (rsp?.error) {
  //       toast.error(
  //         (rsp?.error as IServerError).data.message ||
  //           "Unable to confirm payment",
  //       );
  //     } else {
  //       toast.success(rsp?.data?.message);
  //       refetch();
  //       handleShow("confirm-pay");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <Button
          onClick={() => handleShow(`update-coupon-${data?.id}`)}
          type="button"
          className="!py-1"
        >
          Edit
        </Button>
        <Button
          onClick={() => handleShow(`update-coupon-${data?.id}`)}
          type="button"
          className={`${data?.status === "active" ? "negative-btn !bg-transparent" : ""} !py-1`}
        >
          {data?.status === "active" ? "Disable" : "Enable"}
        </Button>
      </div>

      {toggle[`update-coupon-${data?.id}`] && (
        <ManageCoupons
          id={`update-coupon-${data?.id}`}
          close={() => handleShow(`update-coupon-${data?.id}`)}
          couponId={data?.id}
        />
      )}

      {/* {toggle["confirm-pay"] && (
        <ActionModal
          id={"confirm-pay"}
          close={() => handleShow("confirm-pay")}
          title="Confirm Payment?"
          subTitle=" Are you sure? This cannot be reversed."
          actionTitle="Yes, Confirm"
          btnMainClass="main-btn "
          btnSecClass="outline-btn"
          loading={confirming}
          action={handleConfirmPayment}
        />
      )} */}
    </>
  );
};

export default CouponAction;
