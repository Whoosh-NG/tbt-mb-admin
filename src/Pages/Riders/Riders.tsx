import { useGetAllRidersQuery } from '@/api/apiSlice';

const Riders = () => {
  const { data } = useGetAllRidersQuery({});

  console.log(data);
  return (
    <main>
      <h3>Riders</h3>
    </main>
  );
};

export default Riders;
