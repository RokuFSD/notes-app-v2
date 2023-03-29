import React from "react";
import FilterSection from "../../src/routes/pages/dashboard/components/filter/FilterSection";
import { fireEvent, render, screen } from "@testing-library/react";
import { dropOptions } from "../../src/mocks/api";

describe("Filter section", () => {
  it("Should render without errors ", () => {
    render(
      <FilterSection data={dropOptions} />
    );
    const buttons = screen.queryAllByRole("button");
    expect(buttons.length).toBe(dropOptions.length);
  });

  it("Should change the value of the context", () => {
    render(
      <FilterSection data={dropOptions} />
    );

    const buttons = screen.queryAllByRole("button");
    fireEvent.click(buttons[1]);
    const select: HTMLSelectElement = screen.getByTitle("tag");
    expect(select.value).toBe(dropOptions[1].id);
  });
});
