import Button from "@/components/ui/Button";
import { useGlobalHooks } from "@/Hooks/globalHooks";
import { useAppSelector } from "@/Redux/reduxHooks";
import { selectGlobal } from "@/Redux/Features/globalSlice";
import AddCharges from "./AddCharges";
import ActionModal from "@/components/ActionModal/ActionModal";
import { useDeletePickupChargeMutation } from "@/api/apiSlice";
import { IServerError } from "@/types/GlobalInterfaces";
import toast from "react-hot-toast";

const LogisticsAction = ({ id }: { id: number }) => {
  const toggle = useAppSelector(selectGlobal);
  const { handleShow } = useGlobalHooks();

  const [delCHarge, { isLoading }] = useDeletePickupChargeMutation();

  const handleDelete = async () => {
    try {
      const rsp = await delCHarge(id);

      if (rsp?.error) {
        toast.error(
          (rsp?.error as IServerError).data.message || "Unable to create agent",
        );
      } else {
        toast.success(rsp?.data?.message);
        close();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex items-center gap-3">
        <Button
          onClick={() => handleShow(`edit-charge-${id}`)}
          type="button"
          className="!py-1"
        >
          Edit
        </Button>
        <Button
          onClick={() => handleShow(`del-charge-${id}`)}
          type="button"
          className="!bg-negative !py-1"
        >
          Delete
        </Button>
      </div>

      {toggle[`del-charge-${id}`] && (
        <ActionModal
          id={`del-charge-${id}`}
          close={() => handleShow(`del-charge-${id}`)}
          title="Delete Charge"
          subTitle="Are you sure you want to delete this charge"
          btnSecClass="outline-btn "
          btnMainClass="main-btn !bg-negative"
          actionTitle="Yes, Delete"
          action={handleDelete}
          loading={isLoading}
        />
      )}

      {toggle[`edit-charge-${id}`] && (
        <AddCharges
          id={`edit-charge-${id}`}
          close={() => handleShow(`edit-charge-${id}`)}
          chargeId={id}
        />
      )}
    </>
  );
};

export default LogisticsAction;
