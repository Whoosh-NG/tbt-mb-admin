import GoBackBtn from "@/components/ui/GoBackBtn";
import { IServerError } from "@/types/GlobalInterfaces";
import FormInput from "@/components/FormInput";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  useDeleteProductsImgsMutation,
  useUpdateMarketsMutation,
  useGetMarketByIdQuery,
  useGetAllAgentsQuery,
} from "@/api/apiSlice";
import toast from "react-hot-toast";
import Button from "@/components/ui/Button";
import { ProductIamges } from "@/types/Products";
import Skeleton from "react-loading-skeleton";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductGallery from "@/components/Main/Products/ProductGallery";
import { useGlobalHooks } from "@/Hooks/globalHooks";
import MapAutoComplete from "@/components/Maps/MapAutoComplete";
import { AddNewMarketData } from "@/types/Markets";
import useGoogleMapsLoader from "@/Hooks/useGoogleMapsLoader";
import { apiKey } from "@/Utils/helpers";

const EditMarket = () => {
  const { id } = useParams();
  const [delImg] = useDeleteProductsImgsMutation();
  const { setLoading, loading } = useGlobalHooks();
  const navigate = useNavigate();
  const { mapLoaded } = useGoogleMapsLoader(apiKey as string);
  const { data: agent, isLoading: categoring } = useGetAllAgentsQuery({});

  const {
    data: market,
    // isLoading: producting,
    refetch,
  } = useGetMarketByIdQuery(id as string, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const initialValues = {
    market_id: id,
    name: (market?.data?.name as string) ?? "",
    banner: (market?.data?.banner as string) ?? "",
    address: (market?.data?.address as string) ?? "",
    agent_id: (market?.data?.agent_id as string) ?? "",
    description: (market?.data?.description as string) ?? "",
  };

  const [getData, setGetData] = useState<{
    [key: string]: { [key: string]: string };
  }>({});

  const [coordinates, setCoordinates] = useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  });

  const [newMarket, { isLoading }] = useUpdateMarketsMutation();

  const [getImages, setGetImages] = useState<{
    images: File[] | null;
    banner: File | null;
  }>({ images: null, banner: null });

  const onSubmit = async (formData: AddNewMarketData) => {
    const payload = new FormData();

    // Append text fields
    Object.keys(formData).forEach((key) => {
      const value = formData[key as keyof AddNewMarketData];
      if (value !== undefined && value !== null) {
        payload.append(key, value as string);
      }
    });

    // Append images (if any)
    if (getImages.images) {
      Array.from(getImages.images).forEach((image, index) => {
        payload.append(`images[${index}]`, image);
      });
    }

    // Append featured image
    if (getImages.banner) {
      payload.append("banner", getImages.banner);
    }

    // If user doesn't change the address, the current address and coordinates should be append
    if (Object.keys(getData).length === 0) {
      payload.append("address", values?.address as string);
      payload.append("latitude", market?.data?.latitude);
      payload.append("longitude", market?.data?.longitude);
    }

    // Append address and coordinates
    if (Object.keys(getData).length > 0 && coordinates) {
      payload.append("address", getData?.useraddress?.formatted_address);
      payload.append("latitude", coordinates?.lat.toString());
      payload.append("longitude", coordinates?.lng.toString());
    }

    try {
      const rsp = await newMarket(payload);
      if (rsp?.error) {
        toast.error(
          (rsp?.error as IServerError).data.message ||
            "Unable to update market",
        );
      } else {
        toast.success(rsp?.data?.message);
        navigate("/markets-management");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const shippingSchema = Yup.object().shape({
    name: Yup.string().required("Please enter name"),
  });

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: shippingSchema,
      onSubmit,
    });

  if (!mapLoaded) {
    return (
      <section className="container h-[50vh]">
        <Skeleton count={6} containerClassName="!h-full" height={30} />
      </section>
    );
  }

  const handleDeleteImg = async (imgId: string) => {
    setLoading({ [imgId]: true });
    try {
      const rsp = await delImg({ image_id: imgId, product_id: id });
      if (rsp?.error) {
        toast.error(
          (rsp?.error as IServerError).data.message ||
            "Unable to create product",
        );
        setLoading({ [imgId]: false });
      } else {
        toast.success(rsp?.data?.message);
        setLoading({ [imgId]: false });
        refetch();
      }
    } catch (error) {
      console.log(error);
      setLoading({ [imgId]: false });
    }
  };

  return (
    <main className="container my-10">
      <header className="flex items-center gap-2">
        <GoBackBtn className="outline-btn" />
        <h3>Edit Product</h3>
      </header>

      <section className="space-y-4 py-6">
        <div className="my-6 flex w-full flex-wrap gap-6">
          {market?.data?.banner && (
            <div className="w-full lg:w-2/12">
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

          {(market?.data?.images as ProductIamges[])?.length > 0 && (
            <div className="w-full lg:w-6/12">
              <small>Other Images</small>
              <ProductGallery
                imageList={market?.data?.images as ProductIamges[]}
                action={handleDeleteImg}
                loading={loading}
                className="!flex-row-reverse"
                noDelete
              />
            </div>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap justify-between gap-3"
        >
          <FormInput
            id="name"
            name="name"
            type="text"
            label="Enter market name"
            placeholder="Enter market name"
            defaultValue={values.name}
            onBlur={handleBlur}
            onChange={handleChange}
            error={touched.name && errors.name}
            className="inputWrapper"
          />

          <article className="inputWrapper flex w-full flex-col gap-3">
            <label htmlFor="useraddress"> Market Address</label>
            <MapAutoComplete
              id="useraddress"
              setState={setCoordinates}
              placeholder="Enter market address"
              className=""
              value={values?.address}
              setGetData={setGetData}
              required
            />
          </article>

          {categoring ? (
            <Skeleton height={50} containerClassName="flex-1" />
          ) : (
            <FormInput
              id="agent_id"
              name="agent_id"
              type="select"
              label="Select agent"
              placeholder="Select agent"
              selectOptions={agent?.data}
              valuePropertyName="id"
              keyPropertyName="id"
              itemPropertyName="first_name"
              defaultValue={values.agent_id}
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.agent_id && errors.agent_id}
              className="w-full md:w-[32%]"
            />
          )}

          <FormInput
            id="images"
            name="images"
            type="file"
            label="You can select multiple images"
            placeholder="Select brand"
            onBlur={handleBlur}
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                const files = e.target.files;
                // const formData = new FormData();

                // formData.append("images[]", files);
                setGetImages((prev) => ({
                  ...prev,
                  ["images"]: files,
                }));
              }
            }}
            className="w-full md:w-[32%]"
            multiple
            accept="image/*"
          />
          <FormInput
            id="banner"
            name="banner"
            type="file"
            label="Select product display image"
            onBlur={handleBlur}
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                const file = e.target.files[0];
                // const formData = new FormData();
                // formData.append("banner", files);

                setGetImages((prev) => ({
                  ...prev,
                  ["banner"]: file,
                }));
              }
            }}
            className="w-full md:w-[32%]"
            accept="image/*"
          />

          <FormInput
            id="description"
            name="description"
            type="textarea"
            placeholder="Enter description"
            defaultValue={values.description}
            onBlur={handleBlur}
            onChange={handleChange}
            error={touched.description && errors.description}
            className="inputWrapper"
          />
          <div className="mt-6 flex w-full items-center gap-3">
            <Button type="submit" loading={isLoading}>
              {" "}
              Update Market
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default EditMarket;
