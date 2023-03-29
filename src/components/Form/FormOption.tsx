import React from "react";

type FormOptionProps = {
  name: string;
  id: string;
};

function FormOption({ name, id }: FormOptionProps) {
  return (
    <option value={id} id={id} className="dark:bg-zinc-900">
      {name}
    </option>
  );
}

export default FormOption;
