import { useGetAllStatsQuery } from "@/api/apiSlice";
import Agents from "@/components/Main/Agents/Agents";
import useUpdatePageName from "@/Hooks/useUpdatePageName";

const Home = () => {
  const { data } = useGetAllStatsQuery({});
  useUpdatePageName("Home");

  const homeData = [
    {
      id: 1,
      title: data?.data?.orders_count,
      subTitle: "Total Orders",
    },
    {
      id: 2,
      title: data?.data?.customers_count,
      subTitle: "Total Customers",
    },
    {
      id: 3,
      title: data?.data?.market_count,
      subTitle: "Total Markets",
    },
    {
      id: 4,
      title: data?.data?.product_count,
      subTitle: "Total Products",
    },
  ];
  return (
    <main className="container py-10">
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {homeData.map(({ id, title, subTitle }) => (
          <li key={id} className="card flex items-center gap-2 p-4">
            <div className="animate__animated animate__tada my-2">
              <small className=""> {subTitle} </small>
              <h4 className="animate__animated animate__tada font-bold">
                {" "}
                {title}{" "}
              </h4>
            </div>
          </li>
        ))}
      </ul>

      <Agents />
    </main>
  );
};

export default Home;
