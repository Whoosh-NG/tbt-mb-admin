import GoBackBtn from "@/components/ui/GoBackBtn";
import { IServerError } from "@/types/GlobalInterfaces";
import FormInput from "@/components/FormInput";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useGetAllAgentsQuery, useCreateMarketsMutation } from "@/api/apiSlice";
import toast from "react-hot-toast";
import Button from "@/components/ui/Button";
import Skeleton from "react-loading-skeleton";
import { useState } from "react";
import useGoogleMapsLoader from "@/Hooks/useGoogleMapsLoader";
import { apiKey } from "@/Utils/helpers";
import MapAutoComplete from "@/components/Maps/MapAutoComplete";
import { AddNewMarketData } from "@/types/Markets";

const initialValues = {
  name: "",
  banner: "",
  address: "",
  agent_id: "",
  description: "",
};
const AddNewMarkets = () => {
  const { mapLoaded } = useGoogleMapsLoader(apiKey as string);

  const { data: agent, isLoading: categoring } = useGetAllAgentsQuery({});

  const [getData, setGetData] = useState<{
    [key: string]: { [key: string]: string };
  }>({});

  const [coordinates, setCoordinates] = useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  });

  const [newMarket, { isLoading }] = useCreateMarketsMutation();

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

    // Append address and coordinates
    if (getData && coordinates) {
      payload.append("address", getData?.useraddress?.formatted_address);
      payload.append("latitude", coordinates?.lat.toString());
      payload.append("longitude", coordinates?.lng.toString());
    }

    try {
      const rsp = await newMarket(payload);
      if (rsp?.error) {
        toast.error(
          (rsp?.error as IServerError).data.message ||
            "Unable to create product",
        );
      } else {
        toast.success(rsp?.data?.message);
        resetForm();
        setGetImages({ images: null, banner: null });
        setGetData({});
        setCoordinates({
          lat: 0,
          lng: 0,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const shippingSchema = Yup.object().shape({
    name: Yup.string().required("Please enter name"),
  });

  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
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

  return (
    <main className="container my-10">
      <header className="flex items-center gap-2">
        <GoBackBtn className="outline-btn" />
        <h3>Add New Market</h3>
      </header>

      <section className="space-y-4 py-6">
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
              Add Market
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default AddNewMarkets;
