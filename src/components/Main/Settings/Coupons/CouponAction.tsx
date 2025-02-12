import Button from "@/components/ui/Button";
import { useGlobalHooks } from "@/Hooks/globalHooks";
import { useAppSelector } from "@/Redux/reduxHooks";
import { selectGlobal } from "@/Redux/Features/globalSlice";
import ManageCoupons from "./ManageCoupons";
import { useUpdateCouponStatusMutation } from "@/api/apiSlice";
import toast from "react-hot-toast";
import { IServerError } from "@/types/GlobalInterfaces";
import ActionModal from "@/components/ActionModal/ActionModal";

const CouponAction = ({ data }: { data: { id: number; status: string } }) => {
  const toggle = useAppSelector(selectGlobal);
  const { handleShow } = useGlobalHooks();

  const [changeStatus, { isLoading }] = useUpdateCouponStatusMutation();

  const handleChangeStatus = async () => {
    try {
      const rsp = await changeStatus(data?.id);

      if (rsp?.error) {
        toast.error(
          (rsp?.error as IServerError).data.message ||
            "Unable to update status",
        );
      } else {
        toast.success(rsp?.data?.message);
        handleShow(`change-status-${data?.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isActive = data?.status === "active";

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
          onClick={() => handleShow(`change-status-${data?.id}`)}
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

      {toggle[`change-status-${data?.id}`] && (
        <ActionModal
          id={`change-status-${data?.id}`}
          close={() => handleShow(`change-status-${data?.id}`)}
          title={isActive ? "Disable Coupon" : "Enable Coupon"}
          subTitle={
            isActive
              ? "Are you sure you want to disable coupon?"
              : "Are you sure you want to enable coupon?"
          }
          actionTitle={isActive ? "Yes, Disable" : "Yes Enable"}
          btnMainClass={isActive ? "negative-btn" : "main-btn"}
          btnSecClass="outline-btn"
          loading={isLoading}
          action={handleChangeStatus}
        />
      )}
    </>
  );
};

export default CouponAction;
