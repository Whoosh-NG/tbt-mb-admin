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
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    password: "",
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
    first_name: Yup.string().required("Please enter first name"),
    last_name: Yup.string().required("Please enter last name"),
    phone_number: Yup.string().required("Phone number is required"),
    email: Yup.string().required("email is required"),
    password: Yup.string().required("Password is required"),
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

        <form
          onSubmit={handleSubmit}
          className="container flex flex-wrap gap-4 py-6"
        >
          <FormInput
            id="first_name"
            name="first_name"
            type="text"
            label="First Name"
            placeholder="Enter first name"
            defaultValue={values.first_name}
            onBlur={handleBlur}
            onChange={handleChange}
            error={touched.first_name && errors.first_name}
            className="inputWrapper"
          />
          <FormInput
            id="last_name"
            name="last_name"
            type="text"
            label="First Name"
            placeholder="Enter first name"
            defaultValue={values.last_name}
            onBlur={handleBlur}
            onChange={handleChange}
            error={touched.last_name && errors.last_name}
            className="inputWrapper"
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
            className="inputWrapper"
          />
          <FormInput
            id="phone_number"
            name="phone_number"
            type="tel"
            label="Phone number"
            placeholder="Enter phone number"
            defaultValue={values.phone_number}
            onBlur={handleBlur}
            onChange={handleChange}
            error={touched.phone_number && errors.phone_number}
            className="inputWrapper"
          />
          <FormInput
            id="password"
            name="password"
            type="password"
            label="Enter password"
            placeholder="Enter password"
            defaultValue={values.password}
            onBlur={handleBlur}
            onChange={handleChange}
            error={touched.password && errors.password}
            className="inputWrapper"
          />

          <div className="mt-6 flex w-full items-center justify-end gap-3">
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
