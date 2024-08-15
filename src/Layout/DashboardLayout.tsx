import { Navigate } from 'react-router-dom';
import { ReactNode, useState } from 'react';
import NavBar from '@/components/Header/NavBar';
import Sidebar from '@/components/Sidebar/Sidebar';
import { selectUserData } from '@/Redux/Features/userAuthSlice';
import { useAppSelector } from '@/Redux/reduxHooks';

interface Layout {
  children: ReactNode;
}
const DashboardLayout: React.FC<Layout> = ({ children }) => {
  const [toggleSideBar, setToggleSideBar] = useState(false);

  const { isLoggedIn } = useAppSelector(selectUserData);

  if (!isLoggedIn) {
    return <Navigate to='/signin' replace />;
  }

  return (
    <main className='flex justify-between'>
      <section
        className={` ${
          toggleSideBar ? ' w-56' : 'w-[20%] md:w-[10%] lg:w-[5%]'
        } min-h-screen border-r border-Grey5 bg-white p-1 transition-all duration-300 px-2 md:px-4`}
      >
        <Sidebar
          toggleSideBar={toggleSideBar}
          setToggleSideBar={setToggleSideBar}
        />
      </section>
      <aside className='flex-1 transition-all duration-300'>
        <NavBar />
        {children}
      </aside>
    </main>
  );
};

export default DashboardLayout;
