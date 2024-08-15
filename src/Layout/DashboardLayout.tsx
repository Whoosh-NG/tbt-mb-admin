import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import NavBar from '@/components/Header/NavBar';
import Sidebar from '@/components/Sidebar/Sidebar';
import { selectUserData } from '@/Redux/Features/userAuthSlice';
import { useAppSelector } from '@/Redux/reduxHooks';

interface Layout {
  children: ReactNode;
}
const DashboardLayout: React.FC<Layout> = ({ children }) => {
  const { isLoggedIn } = useAppSelector(selectUserData);

  if (!isLoggedIn) {
    return <Navigate to='/signin' replace />;
  }

  return (
    <main className='flex justify-between'>
      <aside className='w-3/12'>
        <Sidebar />
      </aside>
      <article className='w-9/12'>
        <NavBar />
        {children}
      </article>
    </main>
  );
};

export default DashboardLayout;
