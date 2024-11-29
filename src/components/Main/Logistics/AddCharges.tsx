import {
  useCreatePickupChargeMutation,
  useGetPickupChargeByIdQuery,
  useUpdatePickupChargeMutation,
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

const AddCharges: FC<IModal & { chargeId?: number }> = ({
  id,
  close,
  chargeId,
}) => {
  const [newBrand, { isLoading }] = useCreatePickupChargeMutation();
  const [updateBrand, { isLoading: updating }] =
    useUpdatePickupChargeMutation();
  const { data, isLoading: getting } = useGetPickupChargeByIdQuery(chargeId);
  console.log(data);

  const initialValues = {
    from: (data?.data?.from as string) ?? "",
    to: (data?.data?.to as string) ?? "",
    minimum_fare: (data?.data?.minimum_fare as string) ?? "",
    per_km: (data?.data?.per_km as string) ?? "",
    base_fare: (data?.data?.base_fare as string) ?? "",
  };

  const onSubmit = async (formData: any) => {
    try {
      const rsp = chargeId
        ? await updateBrand({ pickup_charge_id: chargeId, ...formData })
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
    from: Yup.string().required("Please enter from"),
    to: Yup.string().required("Please enter to"),
    base_fare: Yup.string().required("Please enter base_fare"),
    minimum_fare: Yup.string().required("Please enter minimum_fare"),
    per_km: Yup.string().required("Please enter per_km"),
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
      setFieldValue("from", data?.data?.from);
      setFieldValue("to", data?.data?.to);
      setFieldValue("minimum_fare", data?.data?.minimum_fare);
      setFieldValue("base_fare", data?.data?.base_fare);
      setFieldValue("per_km", data?.data?.per_km);
    }
  }, [data?.data]);

  return (
    <PopUp id={id}>
      <section className="animate__animated animate__bounceIn mx-auto flex w-11/12 flex-col gap-3 overflow-y-auto rounded-3xl bg-white py-5 md:w-7/12 lg:w-6/12">
        <header className="container flex justify-between">
          <h4>{chargeId ? "Update Charge" : "Add New Charge"}</h4>
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
          <form
            onSubmit={handleSubmit}
            className="container flex flex-wrap gap-4 py-6"
          >
            <FormInput
              id="from"
              name="from"
              type="text"
              label="Enter from"
              placeholder="Enter from"
              defaultValue={values.from}
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.from && errors.from}
              className="inputWrapper"
            />

            <FormInput
              id="to"
              name="to"
              type="text"
              label="Enter to"
              placeholder="Enter to"
              defaultValue={values.to}
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.to && errors.to}
              className="inputWrapper"
            />
            <FormInput
              id="per_km"
              name="per_km"
              type="text"
              label="Enter per km"
              placeholder="Enter per km"
              defaultValue={values.per_km}
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.per_km && errors.per_km}
              className="inputWrapper"
            />

            <FormInput
              id="minimum_fare"
              name="minimum_fare"
              type="text"
              label="Enter minimum fare"
              placeholder="Enter minimum fare"
              defaultValue={values.minimum_fare}
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.minimum_fare && errors.minimum_fare}
              className="inputWrapper"
            />

            <FormInput
              id="base_fare"
              name="base_fare"
              type="text"
              label="Enter base fare"
              placeholder="Enter base fare"
              defaultValue={values.base_fare}
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.base_fare && errors.base_fare}
              className="inputWrapper"
            />

            <div className="mt-6 flex w-full items-center justify-end gap-3">
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
                {chargeId ? "Update Charge" : "Add New Charge"}
              </Button>
            </div>
          </form>
        )}
      </section>
    </PopUp>
  );
};

export default AddCharges;
