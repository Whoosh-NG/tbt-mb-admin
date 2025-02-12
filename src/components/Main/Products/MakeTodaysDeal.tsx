import { useTodaysDealMutation } from "@/api/apiSlice";
import PopUp from "@/components/popUps/PopUp";
import { IModal, IServerError } from "@/types/GlobalInterfaces";
import { FC } from "react";
import toast from "react-hot-toast";
import { BsXLg } from "react-icons/bs";
import FormInput from "@/components/FormInput";
import * as Yup from "yup";
import { useFormik } from "formik";
import Button from "@/components/ui/Button";

interface IBannerData {
  deal_price: string;
  deal_end_date: string;
}

const MakeTodaysDeal: FC<IModal & { productId: number }> = ({
  id,
  close,
  productId,
}) => {
  const [todaysDeal, { isLoading }] = useTodaysDealMutation();

  const initialValues = {
    deal_price: "",
    deal_end_date: "",
  };

  const onSubmit = async (formData: IBannerData) => {
    const payload = new FormData();

    Object.keys(formData).forEach((key) => {
      let value = formData[key as keyof IBannerData];

      if (key === "deal_end_date" && value) {
        const date = new Date(value);
        value = `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`;
      }

      if (value !== null && value !== undefined) {
        payload.append(key, value as string);
      }
    });

    if (productId) {
      payload.append("product_id", productId.toString());
    }

    try {
      const rsp = await todaysDeal(payload);

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
    deal_end_date: Yup.string().required("Please select deals date"),
    deal_price: Yup.string().required("Please enter deals price"),
  });

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: shippingSchema,
      onSubmit,
    });

  return (
    <PopUp id={id}>
      <section className="animate__animated animate__bounceIn mx-auto flex w-11/12 max-w-md flex-col gap-3 overflow-y-auto rounded-3xl bg-white py-5">
        <header className="container flex justify-between">
          <h4> Mark Product as Today&apos;s Deal</h4>
          <button onClick={close} type="button">
            <BsXLg />
          </button>
        </header>
        <hr />

        <form onSubmit={handleSubmit} className="container space-y-4 py-6">
          <FormInput
            id="deal_end_date"
            name="deal_end_date"
            type="date"
            label="Deals End Date"
            onBlur={handleBlur}
            onChange={handleChange}
            error={touched.deal_end_date && errors.deal_end_date}
          />

          <FormInput
            id="deal_price"
            name="deal_price"
            type="number"
            label="Deal Price"
            placeholder="Enter deal_price"
            defaultValue={values.deal_price}
            onBlur={handleBlur}
            onChange={handleChange}
            error={touched.deal_price && errors.deal_price}
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
            <Button type="submit" loading={isLoading}>
              Submit
            </Button>
          </div>
        </form>
      </section>
    </PopUp>
  );
};

export default MakeTodaysDeal;
