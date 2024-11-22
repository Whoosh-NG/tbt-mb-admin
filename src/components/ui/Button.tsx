import Spinner from "@/spinner/Spinner";
import React from "react";
import { Link } from "react-router-dom";

type ButtonProps = {
  link?: boolean;
  type?: "button" | "submit" | "reset" | "link";
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

const Button: React.FC<ButtonProps> = ({
  type = "button",
  href,
  onClick,
  children,
  className,
  link,
  loading,
  // ...rest
}) => {
  if (link) {
    return (
      <Link
        to={href as string}
        className={` ${className} main-btn flex place-items-center gap-2`}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={` ${className} main-btn flex place-items-center gap-2`}
      disabled={loading}
    >
      {loading && <Spinner />}
      {children}
    </button>
  );
};

export default Button;
