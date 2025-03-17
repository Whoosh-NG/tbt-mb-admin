import {
  useGetAllMarketsQuery,
  useToggleMarketStatusMutation,
} from "@/api/apiSlice";
import Button from "@/components/ui/Button";
import { useGlobalHooks } from "@/Hooks/globalHooks";
import { IServerError } from "@/types/GlobalInterfaces";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";

const Markets = () => {
  const { data, isLoading } = useGetAllMarketsQuery({});
  const { loading, setLoading } = useGlobalHooks();

  const [toggleStatus] = useToggleMarketStatusMutation();

  const handleToggle = async (id: number) => {
    setLoading({ [id]: true });
    try {
      const rsp = await toggleStatus({ market_id: id });

      if (rsp?.error) {
        toast.error((rsp?.error as IServerError)?.data?.message);
      } else {
        toast.success(rsp?.data?.message);
      }
    } catch (error) {
      console.log(error);
      setLoading({ [id]: false });
    } finally {
      setLoading({ [id]: false });
    }
  };

  if (isLoading) {
    return (
      <main className="container py-10">
        <ul className="grid w-full grid-cols-4 justify-between gap-4 py-10">
          {Array.from({ length: 12 }).map((_, idx) => (
            <li key={idx} className="">
              <Skeleton containerClassName="" height={150} />
            </li>
          ))}
        </ul>
      </main>
    );
  }
  return (
    <main className="container py-10">
      <header className="mb-10 flex flex-wrap justify-between gap-3">
        <h4>All Available Markets</h4>
        <Button
          link
          href="/add-new-market"
          className="main-btn flex items-center gap-3"
        >
          {" "}
          <FaPlus /> Add New Markets
        </Button>
      </header>
      <section>
        <ul className="grid grid-cols-4 gap-2">
          {data?.data?.map(({ id, name, banner, status }) => (
            <li key={id} className="card flex flex-col justify-between p-2">
              <figure className="relative h-40 overflow-hidden rounded-lg">
                <img
                  src={banner}
                  alt="TBT Marketbazzar markets banners"
                  className="zoomImg !h-full object-cover"
                />
              </figure>
              <div className="my-3">
                <h4>{name} </h4>
              </div>

              <div className="grid grid-cols-3 justify-between gap-1">
                <Button
                  link
                  href={`/markets-management/edit/${id}`}
                  className="!px-1"
                >
                  Edit
                </Button>
                <Button
                  type="button"
                  className={
                    status === "active" ? "!bg-negative !px-1" : "!px-1"
                  }
                  loading={loading[id]}
                  onClick={() => handleToggle(id)}
                >
                  {status === "active" ? "Deactivate" : "Activate"}
                </Button>

                <Button
                  link
                  href={`/markets-management/view/${id}`}
                  className="outline-btn !bg-transparent !px-1"
                >
                  View
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Markets;
