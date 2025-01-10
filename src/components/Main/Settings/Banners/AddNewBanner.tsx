import {
  useCreateNewBannersMutation,
  useGetBannerByIdQuery,
  useUpdateBannersMutation,
} from "@/api/apiSlice";
import PopUp from "@/components/popUps/PopUp";
import { IModal, IServerError } from "@/types/GlobalInterfaces";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsXLg } from "react-icons/bs";
import FormInput from "@/components/FormInput";
import * as Yup from "yup";
import { useFormik } from "formik";
import Button from "@/components/ui/Button";
import Skeleton from "react-loading-skeleton";

interface IBannerData {
  name: string;
  description: string;
  app_type: string;
  image: File | null;
}

const AddNewBanner: FC<IModal & { bannerId?: number }> = ({
  id,
  close,
  bannerId,
}) => {
  const [newBanner, { isLoading }] = useCreateNewBannersMutation();
  const [updateBanner, { isLoading: updating }] = useUpdateBannersMutation();

  const { data, isLoading: getting } = useGetBannerByIdQuery(bannerId);

  const [getImages, setGetImages] = useState<{
    image: File | null;
  }>({ image: null });

  const initialValues = {
    name: (data?.data?.name as string) ?? "",
    description: (data?.data?.description as string) ?? "",
    app_type: "mb",
    image: null,
  };

  const onSubmit = async (formData: IBannerData) => {
    const payload = new FormData();

    Object.keys(formData).forEach((key) => {
      const value = formData[key as keyof IBannerData];

      if (value !== null && value !== undefined) {
        payload.append(key, value as string);
      }
    });

    if (getImages?.image) {
      payload.append("image", getImages?.image);
    }

    if (bannerId) {
      payload.append("slider_image_id", bannerId.toString());
    }

    try {
      const rsp = bannerId
        ? await updateBanner(payload)
        : await newBanner(payload);

      if (rsp?.error) {
        toast.error(
          (rsp?.error as IServerError).data.message || "Unable to create agent",
        );
      } else {
        toast.success(rsp?.data?.message);
        close();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const shippingSchema = Yup.object().shape({
    name: Yup.string().required("Please enter banner name"),
    description: Yup.string().required("Description is required"),
  });

  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: shippingSchema,
    onSubmit,
  });

  useEffect(() => {
    if (data?.data) {
      setFieldValue("name", data?.data?.name);
      setFieldValue("description", data?.data?.description);
    }
  }, [data?.data]);

  return (
    <PopUp id={id}>
      <section className="animate__animated animate__bounceIn mx-auto flex w-11/12 flex-col gap-3 overflow-y-auto rounded-3xl bg-white py-5 md:w-7/12 lg:w-6/12">
        <header className="container flex justify-between">
          <h4>{bannerId ? "Update Banner" : "Add New Banner"}</h4>
          <button onClick={close} type="button">
            <BsXLg />
          </button>
        </header>
        <hr />

        {getting ? (
          <ul className="grid w-full grid-cols-1 justify-between gap-4">
            {Array.from({ length: 5 }).map((_, idx) => (
              <li key={idx} className="">
                <Skeleton containerClassName="" height={30} />
              </li>
            ))}
          </ul>
        ) : (
          <form onSubmit={handleSubmit} className="container space-y-4 py-6">
            <FormInput
              id="name"
              name="name"
              type="text"
              label="Banner Name"
              placeholder="Enter banner name"
              defaultValue={values.name}
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.name && errors.name}
            />

            <FormInput
              id="description"
              name="description"
              type="textarea"
              label="Description"
              placeholder="Enter Description"
              defaultValue={values.description}
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.description && errors.description}
            />

            <FormInput
              id="image"
              name="image"
              type="file"
              label="Upload Banner"
              onBlur={handleBlur}
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  const file = e.target.files[0];
                  setGetImages((prev) => ({
                    ...prev,
                    ["image"]: file,
                  }));
                }
              }}
              className="w-full"
              accept="image/*"
            />

            <div className="mt-6 flex items-center gap-3">
              <Button
                onClick={close}
                className="outline-btn !bg-transparent"
                type="button"
              >
                {" "}
                Cancel
              </Button>
              <Button type="submit" loading={isLoading || updating}>
                {" "}
                {bannerId ? "Save Changes" : "Add Brand"}
              </Button>
            </div>
          </form>
        )}
      </section>
    </PopUp>
  );
};

export default AddNewBanner;
