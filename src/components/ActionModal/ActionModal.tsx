import React, { Dispatch, FormEvent, ReactNode, SetStateAction } from "react";
import PopUp from "../popUps/PopUp";
import { MdOutlineCancel } from "react-icons/md";
import Spinner from "@/spinner/Spinner";

interface IRejecrOrder {
  id: string;
  close: () => void;
  action?: () => void;
  submitForm?: (e: FormEvent<HTMLFormElement>) => void;
  btnMainClass: string;
  btnSecClass?: string;
  title: string | ReactNode;
  subTitle: string | ReactNode;
  actionTitle: string | ReactNode;
  icon?: ReactNode;
  className?: string;
  loading?: boolean;
  form?: boolean;
  setFile?: Dispatch<SetStateAction<FormData | null>>;
  error?: boolean;
}

const ActionModal: React.FC<IRejecrOrder> = ({
  id,
  close,
  action,
  submitForm,
  btnMainClass,
  btnSecClass,
  title,
  subTitle,
  actionTitle,
  icon,
  className,
  loading,
  form,
  error,
  setFile,
}) => {
  const handleChange = (file: File) => {
    const formdata = new FormData();
    formdata.append("file", file);
    if (setFile) {
      setFile(formdata);
    }
  };

  return (
    <PopUp id={id}>
      <section
        className={`${className} animate__animated animate__bounceIn container flex w-11/12 flex-col rounded-lg bg-white p-4 md:w-5/12`}
      >
        <header className="flex w-full justify-end">
          {" "}
          <button onClick={close}>
            <MdOutlineCancel
              className="rounded-full text-Grey6 hover:bg-Grey6 hover:text-white"
              size={20}
            />
          </button>
        </header>
        <article className="flex flex-col justify-center text-center">
          <div className="mx-auto">{icon}</div>
          <h3 className="my-3">{title}</h3>
          <p className="text-Grey6">{subTitle}</p>
        </article>

        {form ? (
          <form onSubmit={submitForm}>
            <input
              name="file"
              type="file"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  handleChange(e?.target?.files[0]);
                }
              }}
              className={`${error ? "errors" : ""} form-controls mt-4`}
              accept=".png, .jpg, .jpeg, .pdf"
              required
            />
            <article className="mt-5 flex justify-center gap-3">
              {btnSecClass && (
                <button type="button" onClick={close} className={btnSecClass}>
                  Cancel
                </button>
              )}
              <button className={btnMainClass} type="submit" disabled={loading}>
                {loading ? <Spinner /> : actionTitle}
              </button>
            </article>
          </form>
        ) : (
          <article className="mt-5 flex justify-center gap-3">
            {btnSecClass && (
              <button onClick={close} className={btnSecClass}>
                Cancel
              </button>
            )}
            <button
              className={btnMainClass}
              type="button"
              onClick={action}
              disabled={loading}
            >
              {loading ? <Spinner /> : actionTitle}
            </button>
          </article>
        )}
      </section>
    </PopUp>
  );
};

export default ActionModal;
