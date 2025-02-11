import {
  useCreateServiceChargeMutation,
  useGetBannerByIdQuery,
  useUpdateServiceChargeMutation,
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

interface IBannerData {
  option: string;
  description: string;
  value: string;
  label: string;
  app_type: string;
}

const ManageServiceCharge: FC<IModal & { serviceId?: number }> = ({
  id,
  close,
  serviceId,
}) => {
  const [newCharge, { isLoading }] = useCreateServiceChargeMutation();
  const [updateCharge, { isLoading: updating }] =
    useUpdateServiceChargeMutation();

  const { data, isLoading: getting } = useGetBannerByIdQuery(serviceId);

  const initialValues = {
    option: (data?.data?.option as string) ?? "",
    label: (data?.data?.label as string) ?? "",
    value: (data?.data?.value as string) ?? "",
    description: (data?.data?.description as string) ?? "",
    app_type: "mb",
  };

  const onSubmit = async (formData: IBannerData) => {
    const payload = new FormData();

    Object.keys(formData).forEach((key) => {
      const value = formData[key as keyof IBannerData];

      if (value !== null && value !== undefined) {
        payload.append(key, value as string);
      }
    });

    if (serviceId) {
      payload.append("coupon_code_id", serviceId.toString());
      payload.append("status", data?.data?.status);
    }

    try {
      const rsp = serviceId
        ? await updateCharge(payload)
        : await newCharge(payload);

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
    option: Yup.string().required("Please select settings type"),
    value: Yup.string().required("value is required"),
    label: Yup.string().required("label is required"),
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
      setFieldValue("label", data?.data?.label);
      setFieldValue("value", data?.data?.value);
      setFieldValue("option", data?.data?.option);
      setFieldValue("description", data?.data?.description);
    }
  }, [data?.data]);

  return (
    <PopUp id={id}>
      <section className="animate__animated animate__bounceIn mx-auto flex w-11/12 flex-col gap-3 overflow-y-auto rounded-3xl bg-white py-5 md:w-7/12 lg:w-6/12">
        <header className="container flex justify-between">
          <h4>
            {serviceId ? "Update Service Charge" : "Add New Service Charge"}
          </h4>
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
              id="option"
              name="option"
              type="select"
              label="Select options"
              selectOptions={["service_charge", "referrer_bonus"]}
              placeholder="Select"
              defaultValue={values.option}
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.option && errors.option}
            />

            <FormInput
              id="value"
              name="value"
              type="number"
              label="Value"
              placeholder="Enter value"
              defaultValue={values.value}
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.value && errors.value}
            />
            <FormInput
              id="label"
              name="label"
              type="text"
              label="Label"
              placeholder="Enter label"
              defaultValue={values.label}
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.label && errors.label}
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
                {serviceId ? "Save Changes" : "Submit"}
              </Button>
            </div>
          </form>
        )}
      </section>
    </PopUp>
  );
};

export default ManageServiceCharge;
