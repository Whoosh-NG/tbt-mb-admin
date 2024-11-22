import { useGlobalHooks } from "@/Hooks/globalHooks";
import { AddNewAdminError, AdminProps } from "@/types/Admin";
import { useAddNewAdminMutation } from "@/api/apiSlice";
import React, { useState } from "react";

import { BsFillEyeFill, BsFillEyeSlashFill, BsX } from "react-icons/bs";
import { toast } from "react-hot-toast";
import PopUp from "@/components/popUps/PopUp";
import Spinner from "@/spinner/Spinner";
import ErrorMessage from "@/components/ui/ErrorMessage";

const initialState = {
  full_name: "",
  email: "",
  password: "",
  adminRole: "",
};

type PasswordTypeState = {
  [id: string]: boolean;
};

const AddAdmin: React.FC<AdminProps> = ({ id, close }) => {
  const [formData, setFormData] = useState(initialState);
  const [addAdmin, { isLoading }] = useAddNewAdminMutation();
  const { errors, setErrors, handleShow } = useGlobalHooks();
  const [passwordType, setPasswordType] = useState<PasswordTypeState>({});

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const showPassword = (id: string) => {
    setPasswordType((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const rsp = await addAdmin(formData);
      console.log(rsp);
      if ("data" in rsp) {
        toast.success(rsp.data.message);
        handleShow(id);
        setFormData(initialState);
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
          <h4 className="font-bold">Add Administrator</h4>
          <div>
            <button onClick={close} className="close">
              <BsX size={20} />
            </button>
          </div>
        </article>
        <ul className="mx-auto my-3 flex w-10/12 flex-wrap gap-2">
          <li className="inputWrapper mb-3">
            <label htmlFor="full_name">Full Name</label>
            <input
              type="text"
              placeholder="Enter full name"
              className="form-control"
              name="firstName"
              onChange={handleChange}
              required
            />
          </li>

          <li className="inputWrapper mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              className="form-control"
              name="email"
              onChange={handleChange}
              required
            />
          </li>

          <li className="inputWrapper mb-3">
            <label htmlFor="password">Password</label>
            <div className="inputContainer">
              <input
                id="password"
                type={!passwordType["password"] ? "password" : "text"}
                name="password"
                placeholder="Enter password"
                className="form-control"
                defaultValue={formData.password}
                onChange={handleChange}
                required
              />

              <div onClick={() => showPassword("password")} className="icon">
                {!passwordType["password"] ? (
                  <BsFillEyeSlashFill className="text-Grey3" />
                ) : (
                  <BsFillEyeFill className="text-Grey3" />
                )}
              </div>
            </div>
          </li>

          <li className="inputWrapper">
            <label htmlFor="role">Role</label>

            <select
              id="adminRole"
              name="adminRole"
              className="form-control !w-full"
              onChange={handleChange}
              required
            >
              <option value="">Select admin role</option>
              <option value="super">Super Admin</option>
              <option value="sub">Administrator</option>
            </select>
          </li>
        </ul>

        <article className="mx-auto flex w-10/12 items-center gap-3">
          <button className="outline-btn" type="button" onClick={close}>
            Cancel
          </button>
          <button className="main-btn" type="submit">
            {isLoading ? <Spinner /> : "Save"}
          </button>
        </article>

        <div className="my-2 flex justify-center">
          {errors.error && <ErrorMessage message={errors.errMessage} />}
        </div>
      </form>
    </PopUp>
  );
};

export default AddAdmin;
