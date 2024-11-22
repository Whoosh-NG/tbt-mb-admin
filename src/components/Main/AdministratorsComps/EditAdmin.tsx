import { useGlobalHooks } from "@/Hooks/globalHooks";
import { AddNewAdminError, AdminProps, IAdminData } from "@/types/Admin";
import { selectAllAdmin } from "@/Redux/Features/userDatasSlice";
import { useAppSelector } from "@/Redux/reduxHooks";
import { useEditAdminMutation } from "@/api/apiSlice";
import ErrorMessage from "@/components/ui/ErrorMessage";
import PopUp from "@/components/popUps/PopUp";
import Spinner from "@/spinner/Spinner";
import React, { useState } from "react";
import toast from "react-hot-toast";

import { BsX } from "react-icons/bs";

const EditAdmin: React.FC<AdminProps & { adminId: string | number }> = ({
  id,
  close,
  adminId,
}) => {
  const admin = useAppSelector(selectAllAdmin);

  const adminToEdit = (admin as any)?.find(
    (item: IAdminData) => item.id === adminId,
  );

  const [formData, setFormData] = useState({
    firstName: adminToEdit?.user?.firstName,
    lastName: adminToEdit?.user?.lastName,
    email: adminToEdit?.user?.email,
    adminRole: adminToEdit?.user?.adminRole,
  });

  const [updateAdmin, { isLoading }] = useEditAdminMutation();
  const { errors, setErrors, handleShow } = useGlobalHooks();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const rsp = await updateAdmin({ formData: formData, id: adminId });
      if ("data" in rsp) {
        toast.success(rsp.data.message);
        handleShow(id);
      } else if ("error" in rsp && "data" in rsp.error) {
        const er = (rsp?.error as AddNewAdminError)?.data?.message;
        setErrors({
          error: true,
          errMessage: er,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PopUp id={id}>
      <form
        className="newPop animate__animated animate__bounceIn mx-auto w-11/12 py-5 md:w-5/12"
        onSubmit={handleSubmit}
      >
        <article className="mx-auto flex w-10/12 items-center justify-between">
          <h4 className="font-bold">Edit Administrator</h4>
          <div>
            <button onClick={close} className="close">
              <BsX size={20} />
            </button>
          </div>
        </article>
        <section className="mx-auto my-3 flex w-10/12 flex-wrap gap-2">
          <article className="inputWrapper mb-3">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              placeholder="Enter full name"
              className="form-control"
              name="firstName"
              defaultValue={formData.firstName}
              onChange={handleChange}
              required
            />
          </article>
          <article className="inputWrapper mb-3">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              placeholder="Enter full name"
              className="form-control"
              name="lastName"
              defaultValue={formData.lastName}
              onChange={handleChange}
              required
            />
          </article>
          <article className="inputWrapper mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              className="form-control"
              name="email"
              defaultValue={formData.email}
              onChange={handleChange}
              required
            />
          </article>
        </section>

        <article className="mx-auto flex w-10/12 flex-wrap items-center gap-3">
          <button className="outline-btn !flex-1" type="button" onClick={close}>
            Cancel
          </button>
          <button className="main-btn !flex-1" type="submit">
            {isLoading ? <Spinner /> : "Save Changes"}
          </button>
        </article>

        <div className="my-2 flex justify-center">
          {errors.error && <ErrorMessage message={errors.errMessage} />}
        </div>
      </form>
    </PopUp>
  );
};

export default EditAdmin;
