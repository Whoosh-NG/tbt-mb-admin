import { useGetAllMarketsQuery } from "@/api/apiSlice";
import Button from "@/components/ui/Button";
import { FaPlus } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";

const Markets = () => {
  const { data, isLoading } = useGetAllMarketsQuery({});

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
        <h4>All Available Products</h4>
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
          {data?.data?.map(({ id, name, banner }) => (
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

              <div className="container flex flex-wrap justify-between gap-3">
                <Button
                  link
                  href={`/edit-market/${id}`}
                  className="w-full md:w-5/12"
                >
                  Edit
                </Button>
                <Button
                  type="button"
                  className="w-full !bg-negative md:w-5/12"
                  loading={isLoading}
                >
                  Delete
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
