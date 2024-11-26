import { useGetAllOrdersQuery } from "@/api/apiSlice";

const OrderMgt = () => {
  const { data } = useGetAllOrdersQuery({});

  console.log(data);
  return <div>OrderMgt</div>;
};

export default OrderMgt;
