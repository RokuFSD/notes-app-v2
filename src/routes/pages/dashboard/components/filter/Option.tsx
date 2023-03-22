import React from "react";

type OptionsProps = {
  name: string;
  id: string;
};

function Option({ name, id }: OptionsProps) {
  return (
    <option value={id} id={id}>
      {name}
    </option>
  );
}

export default Option;
