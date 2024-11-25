import Button from "@/components/ui/Button";
import { useGlobalHooks } from "@/Hooks/globalHooks";
import { useAppSelector } from "@/Redux/reduxHooks";
import AddNewBrand from "./AddNewBrand";
import { selectGlobal } from "@/Redux/Features/globalSlice";

const BrandAction = ({ id }: { id: number }) => {
  const toggle = useAppSelector(selectGlobal);
  const { handleShow } = useGlobalHooks();
  return (
    <>
      <Button
        onClick={() => handleShow(`new-brand-${id}`)}
        type="button"
        className="!py-1"
      >
        Edit
      </Button>

      {toggle[`new-brand-${id}`] && (
        <AddNewBrand
          id={`new-brand-${id}`}
          close={() => handleShow(`new-brand-${id}`)}
          brandId={id}
        />
      )}
    </>
  );
};

export default BrandAction;
