import React from "react";
import FilterSection from "../../src/routes/pages/components/filter/FilterSection";
import FilterContext from "../../src/routes/pages/dashboard/context/FilterContext";
import { render, screen } from "@testing-library/react";

const dropOptions = [
  {
    id: "id1",
    name: "All",
  },
  {
    id: "id2",
    name: "Work",
  },
  {
    id: "id3",
    name: "University",
  },
  {
    id: "id4",
    name: "None",
  },
  {
    id: "id5",
    name: "Gym",
  },
  {
    id: "id6",
    name: "Job",
  },
  {
    id: "id7",
    name: "asd",
  },
  {
    id: "id8",
    name: "Group",
  },
];

describe("Filter section", () => {
  it("Should render without errors ", () => {
    render(
      <FilterContext>
        <FilterSection data={dropOptions} />
      </FilterContext>
    );
    const buttons = screen.queryAllByRole("button");
    expect(buttons.length).toBe(dropOptions.length);
  });
});
