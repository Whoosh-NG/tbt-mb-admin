import {
  useCreateBrandsMutation,
  useGetBrandByIdQuery,
  useUpdateBrandsMutation,
} from "@/api/apiSlice";
import PopUp from "@/components/popUps/PopUp";
import { IModal, IServerError } from "@/types/GlobalInterfaces";
import { FC, useEffect } from "react";
import toast from "react-hot-toast";
import { BsXLg } from "react-icons/bs";
import FormInput from "@/components/FormInput";
import * as Yup from "yup";
import { useFormik } from "formik";
import Button from "@/components/ui/Button";
import Skeleton from "react-loading-skeleton";

const AddNewBrand: FC<IModal & { brandId?: number }> = ({
  id,
  close,
  brandId,
}) => {
  const [newBrand, { isLoading }] = useCreateBrandsMutation();
  const [updateBrand, { isLoading: updating }] = useUpdateBrandsMutation();
  const { data, isLoading: getting } = useGetBrandByIdQuery(brandId);

  const initialValues = {
    name: (data?.data?.name as string) ?? "",
    description: (data?.data?.description as string) ?? "",
    app_type: (data?.data?.app_type as string) ?? "",
  };

  const onSubmit = async (formData: any) => {
    try {
      const rsp = brandId
        ? await updateBrand({ brand_id: brandId, ...formData })
        : await newBrand(formData);

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
    app_type: Yup.string().required("Please select app type"),
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
          <h4>{brandId ? "Update Brand" : "Add New Brand"}</h4>
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
              label="Brand Name"
              placeholder="Enter brand name"
              defaultValue={values.name}
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.name && errors.name}
            />
            <FormInput
              id="app_type"
              name="app_type"
              type="select"
              label="Select app type"
              placeholder="Select app type"
              selectOptions={["tbt", "b2b"]}
              defaultValue={values.app_type}
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.app_type && errors.app_type}
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
                Add Brand
              </Button>
            </div>
          </form>
        )}
      </section>
    </PopUp>
  );
};

export default AddNewBrand;
