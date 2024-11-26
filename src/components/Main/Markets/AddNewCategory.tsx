import {
  useCreateCategoriesMutation,
  useGetAllMarketsQuery,
  useGetCategoryByIdQuery,
  useUpdateCategoriesMutation,
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

const AddNewCategory: FC<IModal & { categId?: number }> = ({
  id,
  close,
  categId,
}) => {
  const [newCateg, { isLoading }] = useCreateCategoriesMutation();
  const [updateCateg, { isLoading: updating }] = useUpdateCategoriesMutation();
  const { data, isLoading: getting } = useGetCategoryByIdQuery(categId);
  const { data: markets, isLoading: marketing } = useGetAllMarketsQuery({});
  const [getImages, setGetImages] = useState<File | null>(null);

  console.log(data);

  const initialValues = {
    name: (data?.data?.name as string) ?? "",
    description: (data?.data?.description as string) ?? "",
    market_id: (data?.data?.app_type as string) ?? "",
  };

  const onSubmit = async (formData: any) => {
    const payload = new FormData();

    Object.keys(formData).forEach((key) => {
      const value = formData[key];
      if (value !== undefined && value !== null) {
        payload.append(key, value);
      }
    });

    if (getImages) {
      payload.append("icon", getImages);
    }
    if (categId) {
      payload.append("category_id", categId.toString());
    }

    try {
      const rsp = categId
        ? await updateCateg(payload)
        : await newCateg(payload);

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
    name: Yup.string().required("Please enter name"),
    description: Yup.string().required("Description is required"),
    market_id: Yup.string().required("Please select app type"),
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
      setFieldValue("app_type", data?.data?.app_type);
    }
  }, [data?.data]);

  return (
    <PopUp id={id}>
      <section className="animate__animated animate__bounceIn mx-auto flex w-11/12 flex-col gap-3 overflow-y-auto rounded-3xl bg-white py-5 md:w-7/12 lg:w-6/12">
        <header className="container flex justify-between">
          <h4>{categId ? "Update Category" : "Add New Category"}</h4>
          <button onClick={close} type="button">
            <BsXLg />
          </button>
        </header>
        <hr />

        {getting || marketing ? (
          <ul className="grid w-full grid-cols-1 justify-between gap-4">
            {Array.from({ length: 5 }).map((_, idx) => (
              <li key={idx} className="">
                <Skeleton containerClassName="" height={30} />
              </li>
            ))}
          </ul>
        ) : (
          <form onSubmit={handleSubmit} className="container space-y-2 py-3">
            <FormInput
              id="name"
              name="name"
              type="text"
              label="Category Name"
              placeholder="Enter category name"
              defaultValue={values.name}
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.name && errors.name}
            />
            <FormInput
              id="market_id"
              name="market_id"
              type="select"
              label="Select market"
              placeholder="Select market"
              selectOptions={markets?.data}
              valuePropertyName="id"
              keyPropertyName="id"
              itemPropertyName="name"
              defaultValue={values.market_id}
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.market_id && errors.market_id}
            />
            <FormInput
              id="icon"
              name="icon"
              type="file"
              label="Select image"
              onBlur={handleBlur}
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  const files = e.target.files[0];

                  setGetImages(files);
                }
              }}
              accept="image/*"
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
                {categId ? "Save Changes" : "Add Category"}
              </Button>
            </div>
          </form>
        )}
      </section>
    </PopUp>
  );
};

export default AddNewCategory;
