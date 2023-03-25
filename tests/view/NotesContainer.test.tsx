import React from "react";
import { render, screen } from "@testing-library/react";
import NotesContainer from "../../src/components/NotesContainer";
import { notedata } from "../../src/mocks/api";

describe("Notes container", () => {
  it("Should render without error", () => {
    render(<NotesContainer />);
    const cards = screen.queryAllByTestId("note-card");
    expect(cards.length).toBe(notedata.length);
  });
});
