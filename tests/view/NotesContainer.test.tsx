import React from "react";
import { render, screen } from "@testing-library/react";
import NotesContainer from "../../src/components/NotesContainer";
import { dropOptions, notedata } from "../../src/mocks/api";

describe("Notes container", () => {
  it("Should render without error", () => {
    render(<NotesContainer projectId={dropOptions[0].id}/>);
    const cards = screen.queryAllByTestId("note-card");
    expect(cards.length).toBe(notedata.length);
  });
});
