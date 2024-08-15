import './Sidebar.scss';
import { SidebarData } from './SidebarData';
import { NavLink } from 'react-router-dom';

import BrandLogo from '../BrandLogo';
// import userIcon from '@/assets/userIcon.png';

const Sidebar = () => {
  return (
    <main className=' sidebarContainer px-1 px-md-2 px-xl-4 '>
      <div className='brandL w-5/12 md:w-10/12 flex items-center'>
        <BrandLogo />
      </div>
      <article className='sideC w-full mx-auto flex flex-col'>
        <h3>SUPER ADMIN</h3>
        <ul>
          {SidebarData.map((tab) => (
            <li key={tab.id} className='my-9'>
              {' '}
              <NavLink
                to={tab.url}
                className={({ isActive }) =>
                  isActive ? 'sidebarActive  ' : 'sidebarNotActive  '
                }
              >
                <hgroup className=' flex gap-2 items-center '>
                  <h4>{tab.icon} </h4>
                  <h4>{tab.title}</h4>
                </hgroup>
              </NavLink>{' '}
            </li>
          ))}
        </ul>
        {/* <li className='sideInfo'>
          <div>
            <img src={userIcon} alt='' />
          </div>
          <div>
            <h5>Wisdom Williams</h5>
            <h6>wisdomwills@rocketmail.com</h6>
          </div>
        </li> */}

        {/* <li className="sidebarNotActive " onClick={() => handleShow("logout")}>
          <hgroup className="flex gap-2 items-center ">
            <h4 className="me-2">
              {" "}
              <LogoutIcon />
            </h4>
            <h4 className=""> Logout </h4>
          </hgroup>
        </li> */}
      </article>

      {/* {toggle["logout"] && (
        <Logout id="logout" close={() => handleShow("logout")} />
      )} */}
    </main>
  );
};

export default Sidebar;
