import Button from "@/components/ui/Button";
import { useGlobalHooks } from "@/Hooks/globalHooks";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import AddNewBanner from "./AddNewBanner";
import { selectGlobal } from "@/Redux/Features/globalSlice";
import { useAppSelector } from "@/Redux/reduxHooks";
import { useDeleteBannerMutation, useGetAllBannersQuery } from "@/api/apiSlice";
import Skeleton from "react-loading-skeleton";
import toast from "react-hot-toast";
import { IServerError } from "@/types/GlobalInterfaces";
import ActionModal from "@/components/ActionModal/ActionModal";
import { Fragment } from "react/jsx-runtime";

const Banners = () => {
  const { handleShow } = useGlobalHooks();
  const toggle = useAppSelector(selectGlobal);

  const { data, isLoading } = useGetAllBannersQuery({});
  const [deleteBanner, { isLoading: deleting }] = useDeleteBannerMutation({});

  console.log(data);

  const handleDeleteBanner = async (id: number) => {
    try {
      const rsp = await deleteBanner(id);
      if (rsp?.error) {
        toast.error(
          (rsp?.error as IServerError).data.message ||
            "Unable to delete banner",
        );
      } else {
        toast.success(rsp?.data?.message);
        handleShow(`del-${id}`);
      }
    } catch (error) {
      console.log(error);
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
        <h4>Banners</h4>
        <Button
          onClick={() => handleShow("new-banners")}
          className="main-btn flex items-center gap-3"
        >
          {" "}
          <FaPlus /> Add New Banners
        </Button>
      </header>

      <section className="grid grid-cols-3 gap-4">
        {data?.data?.map(
          ({
            id,
            name,
            image,
          }: {
            id: number;
            name: string;
            image: string;
          }) => (
            <Fragment key={id}>
              <figure>
                <img src={image} alt={name} />
                <div className="mt-4 flex flex-wrap justify-between gap-3">
                  <Button
                    onClick={() => handleShow(`edit-${id}`)}
                    className="w-full md:w-5/12"
                  >
                    <FaEdit /> Edit
                  </Button>
                  <Button
                    type="button"
                    className="w-full !bg-negative md:w-5/12"
                    onClick={() => handleShow(`del-${id}`)}
                  >
                    <FaTrash /> Delete
                  </Button>
                </div>
              </figure>

              {toggle[`del-${id}`] && (
                <ActionModal
                  id={`del-${id}`}
                  close={() => handleShow(`del-${id}`)}
                  title="Delete this Banner?"
                  subTitle=" Are you sure? This cannot be reversed."
                  actionTitle="Yes, Delete"
                  btnMainClass="main-btn !bg-negative"
                  btnSecClass="sec-btn"
                  loading={deleting}
                  action={() => handleDeleteBanner(id)}
                />
              )}

              {toggle[`edit-${id}`] && (
                <AddNewBanner
                  id={`edit-${id}`}
                  close={() => handleShow(`edit-${id}`)}
                  bannerId={id}
                />
              )}
            </Fragment>
          ),
        )}
      </section>

      {toggle["new-banners"] && (
        <AddNewBanner
          id="new-banners"
          close={() => handleShow("new-banners")}
        />
      )}
    </main>
  );
};

export default Banners;
