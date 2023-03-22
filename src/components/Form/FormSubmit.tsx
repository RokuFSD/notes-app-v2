/* eslint-disable react/require-default-props */
import React, { ReactNode } from "react";

type SubmitProps = {
  children: ReactNode;
  disabled?: boolean;
  className?: string;
};

function FormSubmit({ disabled, className, children }: SubmitProps) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`${className} ${
        disabled &&
        "opacity-50 cursor-not-allowed hover:bg-transparent hover:text-gray-100"
      }`}
    >
      {children}
    </button>
  );
}

export default FormSubmit;
