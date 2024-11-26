import React, { InputHTMLAttributes, useState } from "react";
import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";

import ErrorMessage from "../ui/ErrorMessage";

export interface IFormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  id: string;
  name?: string;
  error?: string | boolean | Date | undefined;
  defaultValue?: string | number;
  DateTimeValue?: Date | string;
  defaultCheck?: boolean;
  value?: string | number;
  type?: React.HTMLInputTypeAttribute | "textarea" | "select";
  inputClassName?: string;
  labelClassName?: string;
  className?: string;
  onChange?: (e: any) => void;
  onBlur?: (e: any) => void;
  icon?: JSX.Element | string;
  required?: boolean;
  disabled?: boolean;
  startDate?: string | Date;
  selectOptions?: any[];
  valuePropertyName?: string;
  keyPropertyName?: string;
  itemPropertyName?: string;
}

const FormInput = ({
  className,
  labelClassName,
  label,
  type,
  id,
  name,
  onChange,
  onBlur,
  icon,
  placeholder,
  required,
  disabled,
  defaultValue,
  error,
  selectOptions,
  keyPropertyName,
  itemPropertyName,
  valuePropertyName,
  defaultCheck,
  ...rest
}: IFormInputProps) => {
  const [showPassword, setShowPassword] = useState<{ [key: string]: boolean }>(
    {},
  );

  const handleShowPassword = (id: string) => {
    setShowPassword((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className={`${error ? "" : ""} ${className}`}>
      {type !== "checkbox" && label && (
        <label
          htmlFor={id}
          className={`${labelClassName} mb-3 flex items-center gap-2`}
        >
          {required ? <em className="!m-0 !p-0"> * </em> : ""}{" "}
          <span>{label}</span>
        </label>
      )}

      {icon && <span>{icon}</span>}
      {type === "textarea" ? (
        <textarea
          id={id}
          name={name}
          rows={6}
          onChange={onChange}
          onBlur={onBlur}
          className={error ? "errors form-control" : "form-control"}
          placeholder={placeholder}
          disabled={disabled}
          value={defaultValue}
        ></textarea>
      ) : type === "select" ? (
        <select
          id={id}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          className={error ? "errors form-control" : "form-control"}
          disabled={disabled}
          value={defaultValue}
        >
          <option> {placeholder} </option>
          {selectOptions?.map((item) => (
            <option
              key={item[item && keyPropertyName] || item}
              value={item[item && valuePropertyName] || item}
            >
              {" "}
              {item[item && itemPropertyName] || item}{" "}
            </option>
          ))}
        </select>
      ) : type === "checkbox" ? (
        <div className="flex w-full items-center gap-2">
          <input
            id={id}
            name={name}
            type={type}
            onChange={onChange}
            onBlur={onBlur}
            className={error ? "errors !m-0" : "!m-0"}
            placeholder={placeholder}
            disabled={disabled}
            checked={defaultCheck}
          />
          <small className="text-[var(--secColor)]">{label} </small>
        </div>
      ) : type === "password" ? (
        <div className="relative">
          <input
            id={id}
            name={name}
            type={showPassword[id] ? "text" : "password"}
            onChange={onChange}
            onBlur={onBlur}
            className={error ? "errors form-control" : "form-control"}
            placeholder={placeholder}
            disabled={disabled}
            value={defaultValue}
          />{" "}
          <span
            className="absolute right-6 top-[35%] cursor-pointer"
            onClick={() => handleShowPassword(id)}
          >
            {showPassword[id] ? (
              <BsFillEyeSlashFill color="var(--Grey6)" />
            ) : (
              <BsFillEyeFill color="var(--Grey6)" />
            )}
          </span>
        </div>
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          onChange={onChange}
          onBlur={onBlur}
          className={error ? "errors form-control" : "form-control"}
          placeholder={placeholder}
          disabled={disabled}
          value={defaultValue}
          {...rest}
        />
      )}

      {error && <ErrorMessage message={error} />}
    </div>
  );
};

export default FormInput;
