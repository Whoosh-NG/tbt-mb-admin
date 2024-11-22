import React from "react";
import "./logout.css";
import PopUp from "@/components/popUps/PopUp";
import { IModal } from "@/types/GlobalInterfaces";
import { useAuthHook } from "@/Hooks/authHook";

const Logout: React.FC<IModal> = ({ id, close }) => {
  const { logoutUser } = useAuthHook();

  return (
    <div className="container-logout">
      <PopUp id={id}>
        <div className="logout">
          <h1>Log Out?</h1>
          <p>Are you sure you want to Log out of your account?</p>
          <div className="buttons">
            <button type="button" className="outline-dark" onClick={close}>
              Cancel
            </button>
            <button className="main-btn log" type="button" onClick={logoutUser}>
              Logout
            </button>
          </div>
        </div>
      </PopUp>
    </div>
  );
};

export default Logout;
