import React, { ReactNode, useRef } from "react";

type FormSelectProps<T> = {
  children: ReactNode;

  valueselector?: <SelectorOutput>(
    selector: (state: any) => SelectorOutput
  ) => (((value: Partial<T>) => void) | SelectorOutput)[];
  name: string;

  className?: string;
};

function FormSelect<T>({
  children,
  valueselector,
  name,
  className,
}: FormSelectProps<T>) {
  if (!valueselector) {
    throw new Error("FormInput must be used inside a Form component");
  }

  const selectRef = useRef<HTMLSelectElement | null>(null);
  const [value, setValue] = valueselector((state: any) => state[name]);
  return (
    <select
      name={name}
      ref={selectRef}
      onChange={(evt) => setValue({ [name]: evt.currentTarget.value })}
      value={value}
      className={className}
      title="tag"
    >
      {children}
    </select>
  );
}

export default FormSelect;
