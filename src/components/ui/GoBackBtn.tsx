import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const GoBackBtn = ({ className }: { className?: string }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className={`${className} flex items-center gap-1`}
    >
      <FaChevronLeft /> Go Back{" "}
    </button>
  );
};

export default GoBackBtn;
