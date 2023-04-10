/* eslint-disable react/require-default-props */
import React, { ReactNode } from "react";
import FormInput, { IFormInput } from "./FormInput";
import FormArea from "./FormArea";
import FormSelect from "./FormSelect";
import FormSubmit from "./FormSubmit";
import { Form as FormRouter, FormProps } from "react-router-dom";
import { useForm } from "../../hooks";
import { ValidationArr } from "../../../types/form";

type IForm = {
  initialValues: {
    [key: string]: string;
  };
  children: ReactNode;
  className?: string;
  validations?: ValidationArr[];
  method: FormProps["method"];
};

function Form<T>({
                   initialValues,
                   validations,
                   children,
                   className,
                   method
                 }: IForm) {
  const { selectIsValid, useValue, selectError } = useForm<T>(
    initialValues as T,
    validations
  );
  const canSubmit = selectIsValid();
  // Not used in this case, we are handling errors with react router itself
  const formError = selectError("form");
  return (
    <FormRouter className={className} method={method}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === FormSubmit) {
            return React.cloneElement(child, {
              disabled: !canSubmit
            } as { disabled: boolean; loading: boolean });
          }
          if (
            child.type === FormInput ||
            child.type === FormArea ||
            child.type === FormSelect
          ) {
            return React.cloneElement(child, {
              valueselector: useValue,
              errorselector: selectError
            } as IFormInput<T>);
          }
        }
        return child;
      })}
      {formError && <span>{formError}</span>}
    </FormRouter>
  );
}

export default Form;
