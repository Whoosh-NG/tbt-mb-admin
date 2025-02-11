import {
  useCreateCouponMutation,
  useGetCouponByIdQuery,
  useUpdateCouponMutation,
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
  name: string;
  value: string;
  app_type: string;
}

const ManageCoupons: FC<IModal & { couponId?: number }> = ({
  id,
  close,
  couponId,
}) => {
  const [newCoupon, { isLoading }] = useCreateCouponMutation();
  const [updateCoupon, { isLoading: updating }] = useUpdateCouponMutation();

  const { data, isLoading: getting } = useGetCouponByIdQuery(couponId);

  const initialValues = {
    name: (data?.data?.name as string) ?? "",
    value: (data?.data?.value as string) ?? "",
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

    if (couponId) {
      payload.append("coupon_code_id", couponId.toString());
      payload.append("status", data?.data?.status);
    }

    try {
      const rsp = couponId
        ? await updateCoupon(payload)
        : await newCoupon(payload);

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
    value: Yup.string().required("Coupon value is required"),
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
      setFieldValue("value", data?.data?.value);
    }
  }, [data?.data]);

  return (
    <PopUp id={id}>
      <section className="animate__animated animate__bounceIn mx-auto flex w-11/12 flex-col gap-3 overflow-y-auto rounded-3xl bg-white py-5 md:w-7/12 lg:w-6/12">
        <header className="container flex justify-between">
          <h4>{couponId ? "Update Coupon" : "Add New Coupon"}</h4>
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
              label="Coupon Title"
              placeholder="Enter coupon title"
              defaultValue={values.name}
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.name && errors.name}
            />

            <FormInput
              id="value"
              name="value"
              type="number"
              label="value"
              placeholder="Enter value"
              defaultValue={values.value}
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.value && errors.value}
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
                {couponId ? "Save Changes" : "Add Coupon"}
              </Button>
            </div>
          </form>
        )}
      </section>
    </PopUp>
  );
};

export default ManageCoupons;
