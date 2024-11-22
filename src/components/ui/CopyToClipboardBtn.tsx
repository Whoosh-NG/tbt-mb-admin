import { handleCopyToClipboard } from "@/Utils/helpers";
import { useState } from "react";
import { FaCircleCheck, FaRegCopy } from "react-icons/fa6";

const CopyToClipboardBtn = ({
  id,
  valuToCopy,
  message,
}: {
  id: string | number;
  valuToCopy: string;
  message: string;
}) => {
  const [clicked, setClicked] = useState<boolean>(false);

  const handleCopy = () => {
    setClicked(!clicked);
    handleCopyToClipboard(id, valuToCopy, message);
    setTimeout(() => {
      setClicked(false);
    }, 2000);
  };

  return (
    <button onClick={handleCopy}>
      {clicked ? (
        <span className="animate__animated animate__bounceIn text-positive">
          <FaCircleCheck />
        </span>
      ) : (
        <FaRegCopy className="animate__animated animate__bounceIn text-Grey6" />
      )}
    </button>
  );
};

export default CopyToClipboardBtn;
