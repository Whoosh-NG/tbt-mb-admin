import { Dispatch, SetStateAction } from "react";
import BrandLogo from "../ui/BrandLogo";
import "./Sidebar.scss";
import { SidebarData } from "./SidebarData";
import { NavLink } from "react-router-dom";
import { GrUnorderedList } from "react-icons/gr";

const Sidebar = ({
  toggleSideBar,
  setToggleSideBar,
}: {
  toggleSideBar: boolean;
  setToggleSideBar: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <main className="sidebarContainer">
      <article>
        <div className="flex h-10 w-10 items-center">
          <BrandLogo />
        </div>
        <div className="mb-5 mt-3 flex h-10 w-10 flex-col items-start gap-3 rounded-full p-2 hover:bg-gray-300">
          <button onClick={() => setToggleSideBar(!toggleSideBar)} className="">
            <GrUnorderedList className="text-grey-300" size={25} />
          </button>
        </div>
      </article>
      <article className="mx-auto flex w-full flex-col">
        <ul className="flex flex-col gap-2">
          {SidebarData.map(({ id, url, title, icon }) => (
            <NavLink
              key={id}
              to={url}
              className={({ isActive }) =>
                isActive && toggleSideBar
                  ? "sidebarActive !w-full"
                  : !isActive && toggleSideBar
                    ? "sidebarNotActive !w-full"
                    : isActive
                      ? "sidebarActive"
                      : "sidebarNotActive"
              }
            >
              <hgroup className="flex items-center gap-2">
                <h4>{icon} </h4>
                {toggleSideBar && <h4>{title}</h4>}
              </hgroup>
            </NavLink>
          ))}
        </ul>
      </article>
    </main>
  );
};

export default Sidebar;
