import {
  useDeleteCategoryByIdMutation,
  useGetAllCategoriesQuery,
} from "@/api/apiSlice";
import { FaPlus } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import AddNewCategory from "./AddNewCategory";
import { useAppSelector } from "@/Redux/reduxHooks";
import { selectGlobal } from "@/Redux/Features/globalSlice";
import { useGlobalHooks } from "@/Hooks/globalHooks";
import Button from "@/components/ui/Button";
import { Fragment } from "react/jsx-runtime";
import { IServerError } from "@/types/GlobalInterfaces";
import toast from "react-hot-toast";

const Categories = () => {
  const { data, isLoading } = useGetAllCategoriesQuery({});
  const toggle = useAppSelector(selectGlobal);
  const { handleShow, loading, setLoading } = useGlobalHooks();

  const [delCateg] = useDeleteCategoryByIdMutation();

  const handleDeletePorduct = async (id: number) => {
    setLoading({ [id]: true });
    try {
      const rsp = await delCateg(id);
      if (rsp?.error) {
        toast.error(
          (rsp?.error as IServerError).data.message ||
            "Unable to delete category",
        );
        setLoading({ [id]: false });
      } else {
        toast.success(rsp?.data?.message);
        setLoading({ [id]: false });
      }
    } catch (error) {
      console.log(error);
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
        <h4>All Categories</h4>
        <button
          onClick={() => handleShow("new-catge")}
          className="main-btn flex items-center gap-3"
        >
          {" "}
          <FaPlus /> Add New Category
        </button>
      </header>
      <section>
        <ul className="grid grid-cols-5 gap-2">
          {data?.data?.map(
            ({ id, name, icon, description, products_count }) => (
              <Fragment key={id}>
                <li className="card flex flex-col p-2">
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

                  <div className="container mt-5 flex flex-wrap justify-between gap-3">
                    <Button
                      onClick={() => handleShow(`new-catge-${id}`)}
                      className="w-full !py-1 md:w-5/12"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDeletePorduct(id)}
                      type="button"
                      className="w-full !bg-negative !py-1 md:w-5/12"
                      loading={loading[id]}
                    >
                      Delete
                    </Button>
                  </div>
                </li>
                {toggle[`new-catge-${id}`] && (
                  <AddNewCategory
                    id={`new-catge-${id}`}
                    close={() => handleShow(`new-catge-${id}`)}
                    categId={id}
                  />
                )}
              </Fragment>
            ),
          )}
        </ul>
      </section>

      {toggle["new-catge"] && (
        <AddNewCategory id="new-catge" close={() => handleShow("new-catge")} />
      )}
    </main>
  );
};

export default Categories;
