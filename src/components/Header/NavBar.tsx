import "./Navbar.scss";
import { useGlobalHooks } from "../../Hooks/globalHooks";
import userIcon from "@/assets/noAvatar.png";
import Modal from "../popUps/Modal";
import { useAppSelector } from "@/Redux/reduxHooks";
import { selectGlobal, selectPageName } from "@/Redux/Features/globalSlice";
import { FaChevronDown } from "react-icons/fa";
import UserCard from "./UserCard";

const NavBar = () => {
  const { handleShow } = useGlobalHooks();
  const toggle = useAppSelector(selectGlobal);
  const name = useAppSelector(selectPageName);

  return (
    <main className="navbar flex items-center border-b border-Grey5">
      <header className="container flex w-full items-center justify-between">
        <h2>{name}</h2>
        <button
          onClick={() => handleShow("user")}
          className="flex cursor-pointer items-center gap-2"
        >
          {/* <button
            type='button'
            onClick={() => handleShow('notif')}
            id='notif'
            className='notifs'
          >
            <NotifIcon />
            <small> </small>
          </button> */}
          <figure className="h-[40px] w-[40px]">
            <img src={userIcon} alt="" />
          </figure>
          <FaChevronDown />
        </button>
      </header>

      {toggle["user"] && (
        <Modal id="user" className="userPopUp m-3 w-full md:w-6/12 lg:w-4/12">
          <UserCard />
        </Modal>
      )}
    </main>
  );
};

export default NavBar;
