import React, { useRef, useState } from "react";

type IFormArea<T> = {
  name: string;
  placeholder: string;
  valueSelector?: <SelectorOutput>(
    selector: (state: any) => SelectorOutput
  ) => (((value: Partial<T>) => void) | SelectorOutput)[];
  errorSelector?: (key: string) => string;
  className?: string;
  required?: boolean;
};

function FormArea<T>({
  name,
  placeholder,
  valueSelector,
  errorSelector,
  className,
  required,
}: IFormArea<T>) {
  if (!valueSelector || !errorSelector) {
    throw new Error("FormInput must be used inside a Form component");
  }
  const areaRef = useRef<HTMLTextAreaElement | null>(null);
  const [value, setValue] = valueSelector((state: any) => state[name]);
  const [touch, setTouch] = useState(false);
  const error = errorSelector(name);

  return (
    <textarea
      ref={areaRef}
      name={name}
      value={value}
      onChange={(evt) => setValue({ [name]: evt.currentTarget.value })}
      data-state={error && touch ? "error" : "idle"}
      placeholder={placeholder}
      className={`${className} ${
        touch && error ? "!border-red-500 focus:!border-red-500" : ""
      }`}
      onBlur={() => setTouch(true)}
      required={required}
    />
  );
}

export default FormArea;
