import Button from "@/components/ui/Button";
import { useGlobalHooks } from "@/Hooks/globalHooks";
import { useAppSelector } from "@/Redux/reduxHooks";
import { selectGlobal } from "@/Redux/Features/globalSlice";
import ActionModal from "@/components/ActionModal/ActionModal";
import { useMarkUserAsAgentsMutation } from "@/api/apiSlice";
import { IServerError } from "@/types/GlobalInterfaces";
import toast from "react-hot-toast";

const AgentAction = ({ id }: { id: number }) => {
  const toggle = useAppSelector(selectGlobal);
  const { handleShow } = useGlobalHooks();

  const [newAgent, { isLoading }] = useMarkUserAsAgentsMutation();

  const handleCreateAgent = async () => {
    try {
      const rsp = await newAgent({ user_id: id });

      if (rsp?.error) {
        toast.error(
          (rsp?.error as IServerError).data.message || "Unable to create agent",
        );
      } else {
        toast.success(rsp?.data?.message);
        handleShow(`new-brand-${id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button
        onClick={() => handleShow(`new-brand-${id}`)}
        type="button"
        className="!py-1 !text-xs"
      >
        Set as Agent
      </Button>

      {toggle[`new-brand-${id}`] && (
        <ActionModal
          id={`new-brand-${id}`}
          close={() => handleShow(`new-brand-${id}`)}
          title="Mark user as agent"
          subTitle="Are you sure you want to mark this user as agent"
          btnSecClass="outline-btn flex-1"
          btnMainClass="main-btn flex-1"
          actionTitle="Yes, Mark as Agent"
          action={handleCreateAgent}
          loading={isLoading}
        />
      )}
    </>
  );
};

export default AgentAction;
