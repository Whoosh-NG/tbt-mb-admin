import { Dispatch, SetStateAction } from 'react';
import BrandLogo from '../BrandLogo';
import './Sidebar.scss';
import { SidebarData } from './SidebarData';
import { NavLink } from 'react-router-dom';
import { GrUnorderedList } from 'react-icons/gr';

const Sidebar = ({
  toggleSideBar,
  setToggleSideBar,
}: {
  toggleSideBar: boolean;
  setToggleSideBar: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <main className=' sidebarContainer'>
      <div className='mb-5 mt-3 flex flex-col gap-3 w-10 h-10 hover:bg-gray-300 p-2 rounded-full items-start '>
        <button onClick={() => setToggleSideBar(!toggleSideBar)} className=''>
          <GrUnorderedList className='text-grey-300' size={25} />
        </button>
      </div>
      <div className=' w-10 h-10 flex items-center'>
        <BrandLogo />
      </div>
      <article className=' w-full mx-auto flex flex-col'>
        <ul className='flex flex-col gap-2'>
          {SidebarData.map(({ id, url, title, icon }) => (
            <NavLink
              key={id}
              to={url}
              className={({ isActive }) =>
                isActive && toggleSideBar
                  ? 'sidebarActive !w-full'
                  : !isActive && toggleSideBar
                  ? 'sidebarNotActive !w-full'
                  : isActive
                  ? 'sidebarActive'
                  : 'sidebarNotActive '
              }
            >
              <hgroup className=' flex gap-2 items-center '>
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
