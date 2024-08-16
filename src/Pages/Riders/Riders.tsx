import { useGetAllRidersQuery } from '@/api/apiSlice';
import useUpdatePageName from '@/Hooks/useUpdatePageName';

const Riders = () => {
  useUpdatePageName('Riders');

  const { data } = useGetAllRidersQuery({});

  console.log(data);
  return (
    <main>
      <h3>Riders</h3>
    </main>
  );
};

export default Riders;
