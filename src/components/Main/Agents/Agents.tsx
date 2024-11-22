import { useGetAllAgentsQuery } from "@/api/apiSlice";
import { useGlobalHooks } from "@/Hooks/globalHooks";
import { selectGlobal } from "@/Redux/Features/globalSlice";
import { useAppSelector } from "@/Redux/reduxHooks";
import React from "react";
import { FaPlus } from "react-icons/fa";
import AddNewAgent from "./AddNewAgent";
import Button from "@/components/ui/Button";

const Agents = () => {
  const { handleShow } = useGlobalHooks();
  const toggle = useAppSelector(selectGlobal);
  const { data, isLoading } = useGetAllAgentsQuery({});
  console.log(data);
  return (
    <>
      <section className="mt-10">
        <div className="flex justify-end">
          <Button type="button" onClick={() => handleShow("add-agent")}>
            <FaPlus /> Add New Agent
          </Button>
        </div>
      </section>

      {toggle["add-agent"] && (
        <AddNewAgent id="add-agent" close={() => handleShow("add-agent")} />
      )}
    </>
  );
};

export default Agents;
