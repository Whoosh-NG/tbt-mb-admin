import { useGetAllAdminQuery } from '@/api/apiSlice';
import useUpdatePageName from '@/Hooks/useUpdatePageName';

const Home = () => {
  const { data } = useGetAllAdminQuery({});
  useUpdatePageName('Home');

  console.log(data);
  return (
    <main>
      <h2>Welcome Admin</h2>
    </main>
  );
};

export default Home;
