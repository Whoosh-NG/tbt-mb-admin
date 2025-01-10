import {
  useGetAllAgentsbyMarketIdQuery,
  useGetCategoriesByMarketIdQuery,
  useGetMarketByIdQuery,
} from "@/api/apiSlice";
import AddNewCategory from "@/components/Main/Markets/AddNewCategory";
import ProductGallery from "@/components/Main/Products/ProductGallery";
import Button from "@/components/ui/Button";
import GoBackBtn from "@/components/ui/GoBackBtn";
import { useGlobalHooks } from "@/Hooks/globalHooks";
import useUpdatePageName from "@/Hooks/useUpdatePageName";
import { selectGlobal } from "@/Redux/Features/globalSlice";
import { useAppSelector } from "@/Redux/reduxHooks";
import { CategoryRsp } from "@/types/Markets";
import { ProductIamges } from "@/types/Products";
import { agentColData } from "@/Utils/constants";
import DataTable from "react-data-table-component";
import Skeleton from "react-loading-skeleton";
import { useParams } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

const ViewMarket = () => {
  useUpdatePageName("View Markets");
  const { id } = useParams();
  const toggle = useAppSelector(selectGlobal);
  const { handleShow } = useGlobalHooks();

  const { data } = useGetCategoriesByMarketIdQuery(id);
  const { data: agents, isLoading: agenting } =
    useGetAllAgentsbyMarketIdQuery(id);

  const { data: market, isLoading } = useGetMarketByIdQuery(id as string, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const tableCustomStyles = {
    headCells: {
      style: {
        color: "var(--pryColor)",
        fontWeight: 600,
        backgroundColor: "#F6F6F7",
      },
    },
  };

  if (isLoading) {
    return (
      <section className="container h-[50vh]">
        <Skeleton count={6} containerClassName="!h-full" height={30} />
      </section>
    );
  }

  return (
    <main className="container divide-y py-10">
      <header className="flex items-center gap-2">
        <GoBackBtn className="outline-btn" />
        <h3>View Market</h3>
      </header>
      <section className="mt-8">
        <div className="my-6 flex w-full flex-wrap gap-6">
          <div className="w-full lg:w-5/12">
            <div>
              <h4>{market?.data?.name}</h4>
              <p>Description: {market?.data?.description}</p>
              <p>Address: {market?.data?.address}</p>
            </div>
            {market?.data?.banner && (
              <div className="mt-5">
                <small>Featured Images</small>
                <figure className="overflow-hidden rounded-xl">
                  <img
                    src={market?.data?.banner}
                    alt=""
                    className="!h-full object-cover"
                  />
                </figure>
              </div>
            )}
          </div>

          {(market?.data?.images as ProductIamges[])?.length > 0 && (
            <div className="w-full lg:w-6/12">
              <small>Other Images</small>
              <ProductGallery
                imageList={market?.data?.images as ProductIamges[]}
                className="!flex-row-reverse"
                noDelete
              />
            </div>
          )}
        </div>
      </section>
      <section className="mt-9">
        <h4>Categories</h4>

        {data?.data?.length === 0 ? (
          <div className="grid h-52 place-items-center">
            <p>No Categories found</p>
          </div>
        ) : (
          <ul className="mt-4 grid grid-cols-5 gap-2">
            {data?.data?.map(
              ({
                id,
                name,
                icon,
                description,
                products_count,
              }: CategoryRsp) => (
                <Fragment key={id}>
                  <li className="card flex flex-col p-1">
                    <figure className="relative h-20 overflow-hidden rounded-lg">
                      <img
                        src={icon}
                        alt="TBT Marketbazzar markets categories images"
                        className="zoomImg !h-full object-cover"
                      />
                    </figure>
                    <div className="space-y-2">
                      <h4 className="mt-2 text-xs font-bold">{name} </h4>
                      <p className="text-xs">{description}</p>
                      <p className="text-xs">
                        Total Products: <b>{products_count}</b>
                      </p>
                    </div>

                    <div className="container mt-5 flex flex-wrap justify-between gap-3">
                      <Button
                        link
                        href={`/markets-management/category/view/${id}`}
                        className="w-full !py-1"
                      >
                        View
                      </Button>
                      {/* <Button
                      onClick={() => handleShow(`new-catge-${id}`)}
                      className="w-full !py-1 md:w-5/12"
                    >
                      Edit
                    </Button> */}
                      {/* <Button
                      onClick={() => handleDeletePorduct(id)}
                      type="button"
                      className="w-full !bg-negative !py-1 md:w-5/12"
                      loading={loading[id]}
                    >
                      Delete
                    </Button> */}
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
        )}
      </section>

      <section className="mt-9 space-y-4">
        <h4>Agents</h4>

        {agenting ? (
          <Skeleton containerClassName="" height={50} count={6} />
        ) : (
          <DataTable
            columns={agentColData(true)}
            data={agents}
            customStyles={tableCustomStyles}
            className="cursor-pointer pb-20"
          />
        )}
      </section>
    </main>
  );
};

export default ViewMarket;
