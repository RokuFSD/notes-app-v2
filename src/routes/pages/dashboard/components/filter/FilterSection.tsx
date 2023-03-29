import React from "react";
import * as Filter from "./index";
import { useAtomValue } from "jotai";
import { currentProjectId } from "../../../../../jotai/projects";

type FilterSectionProps = {
  data: {
    id: string;
    name: string;
  }[];
};

function FilterSection({ data }: FilterSectionProps) {
  const projectId = useAtomValue(currentProjectId);

  const Buttons = data.map((option) => (
    <Filter.Btn
      text={`#${option.name}`}
      key={option.id}
      value={option.id}
      isCurrent={projectId === option.id}
    />
  ));

  const Options = data.map((option) => (
    <Filter.Option key={option.id} name={option.name} id={option.id} />
  ));

  return (
    <div className="flex flex-col gap-5">
      {/*  Filter dropdown */}
      <Filter.Drop defaultValue={projectId}>{Options}</Filter.Drop>
      {/*  Filter tabs */}
      <Filter.Scroll>{Buttons}</Filter.Scroll>
    </div>
  );
}

export default FilterSection;
