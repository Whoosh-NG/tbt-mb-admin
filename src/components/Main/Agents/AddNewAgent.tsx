import PopUp from "@/components/popUps/PopUp";
import { IModal, IServerError } from "@/types/GlobalInterfaces";
import { FC } from "react";
import { BsXLg } from "react-icons/bs";
import FormInput from "@/components/FormInput";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useCreateAgentsMutation } from "@/api/apiSlice";
import toast from "react-hot-toast";
import Button from "@/components/ui/Button";

const AddNewAgent: FC<IModal> = ({ id, close }) => {
  const initialValues = {
    name: "",
    phone_number: "",
    email: "",
  };

  const [newAgent, { isLoading }] = useCreateAgentsMutation();

  const onSubmit = async (formData: any) => {
    try {
      const rsp = await newAgent(formData);

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
    phone_number: Yup.string().required("Phone number is required"),
    email: Yup.string().required("email is required"),
  });

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: shippingSchema,
      onSubmit,
    });

  return (
    <PopUp id={id}>
      <section className="animate__animated animate__bounceIn mx-auto flex w-11/12 flex-col gap-3 overflow-y-auto rounded-3xl bg-white py-5 md:w-7/12 lg:w-6/12">
        <header className="container flex justify-between">
          <h4>Add New Agent</h4>
          <button onClick={close} type="button">
            <BsXLg />
          </button>
        </header>
        <hr />

        <form onSubmit={handleSubmit} className="container space-y-4 py-6">
          <FormInput
            id="name"
            name="name"
            type="text"
            label="First Name"
            placeholder="Enter first name"
            defaultValue={values.name}
            onBlur={handleBlur}
            onChange={handleChange}
            error={touched.name && errors.name}
          />
          <FormInput
            id="email"
            name="email"
            type="email"
            label="Email"
            placeholder="Enter email"
            defaultValue={values.email}
            onBlur={handleBlur}
            onChange={handleChange}
            error={touched.email && errors.email}
          />
          <FormInput
            id="phone_number"
            name="phone_number"
            type="text"
            label="Phone number"
            placeholder="Enter phone number"
            defaultValue={values.phone_number}
            onBlur={handleBlur}
            onChange={handleChange}
            error={touched.phone_number && errors.phone_number}
          />

          <div className="mt-6 flex items-center gap-3">
            <button className="outline-btn" type="button">
              {" "}
              Cancel
            </button>
            <Button type="submit" loading={isLoading}>
              {" "}
              Add Agent
            </Button>
          </div>
        </form>
      </section>
    </PopUp>
  );
};

export default AddNewAgent;
