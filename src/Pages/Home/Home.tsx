import { useGetAllAdminQuery } from '@/api/apiSlice';

const Home = () => {
  const { data } = useGetAllAdminQuery({});

  console.log(data);
  return (
    <main>
      <h2>Welcome Admin</h2>
    </main>
  );
};

export default Home;
