import { useGetAllCategoriesQuery } from "@/api/apiSlice";
import { FaPlus } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";

const Categories = () => {
  const { data, isLoading } = useGetAllCategoriesQuery({});

  console.log(data);
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
        <h4>All Categories</h4>
        <button className="main-btn flex items-center gap-3">
          {" "}
          <FaPlus /> Add New Category
        </button>
      </header>
      <section>
        <ul className="grid grid-cols-5 gap-2">
          {data?.data?.map(
            ({ id, name, icon, description, products_count }) => (
              <li key={id} className="card flex flex-col p-2">
                <figure className="relative h-32 overflow-hidden rounded-lg">
                  <img
                    src={icon}
                    alt="TBT Marketbazzar markets categories images"
                    className="zoomImg !h-full object-cover"
                  />
                </figure>
                <div className="">
                  <h4 className="mt-2 text-base font-bold">{name} </h4>
                  <p className="text-sm">{description}</p>
                  <p>Total Product: {products_count}</p>
                </div>
              </li>
            ),
          )}
        </ul>
      </section>
    </main>
  );
};

export default Categories;
