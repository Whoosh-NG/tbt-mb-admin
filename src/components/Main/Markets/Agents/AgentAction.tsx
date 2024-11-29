import Button from "@/components/ui/Button";
import { useGlobalHooks } from "@/Hooks/globalHooks";
import { useAppSelector } from "@/Redux/reduxHooks";
import { selectGlobal } from "@/Redux/Features/globalSlice";
import {
  useAddAgentToMarketMutation,
  useGetAllMarketsQuery,
} from "@/api/apiSlice";
import { IServerError } from "@/types/GlobalInterfaces";
import toast from "react-hot-toast";
import { BsXLg } from "react-icons/bs";
import { FormEvent, useState } from "react";
import Skeleton from "react-loading-skeleton";
import PopUp from "@/components/popUps/PopUp";

const AgentAction = ({ market, id }: { market?: boolean; id: number }) => {
  const toggle = useAppSelector(selectGlobal);
  const { handleShow } = useGlobalHooks();
  const [getId, setGetId] = useState("");

  const [addAgent, { isLoading }] = useAddAgentToMarketMutation();
  const { data, isLoading: marketing } = useGetAllMarketsQuery({});

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const rsp = await addAgent({ agent_id: id, market_id: getId });

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
        disabled={market}
      >
        Add To Market
      </Button>

      {toggle[`new-brand-${id}`] && (
        <PopUp id={`new-brand-${id}`}>
          <section className="animate__animated animate__bounceIn mx-auto flex w-11/12 flex-col gap-3 overflow-y-auto rounded-3xl bg-white py-5 md:w-7/12 lg:w-6/12">
            <header className="container flex justify-between">
              <h4>Add Agent To Market</h4>
              <button
                onClick={() => handleShow(`new-brand-${id}`)}
                type="button"
              >
                <BsXLg />
              </button>
            </header>
            <hr />

            <form
              onSubmit={handleSubmit}
              className="container flex flex-wrap gap-4 py-6"
            >
              <label htmlFor="market">Select market</label>
              {marketing ? (
                <Skeleton />
              ) : (
                <select
                  id="market_id"
                  name="market_id"
                  value={getId}
                  onChange={(e) => setGetId(e.target.value)}
                  className="form-control"
                >
                  <option value="">Select Market</option>
                  {data?.data.map(({ id, name }) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
                </select>
              )}

              <div className="mt-6 flex w-full items-center justify-end gap-3">
                <button className="outline-btn" type="button">
                  {" "}
                  Cancel
                </button>
                <Button type="submit" loading={isLoading}>
                  {" "}
                  Add Agent
                </Button>
              </div>
            </form>
          </section>
        </PopUp>
      )}
    </>
  );
};

export default AgentAction;
