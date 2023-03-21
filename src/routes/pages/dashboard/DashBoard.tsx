import React from "react";
import HeadSection from "../../../components/HeadSection";
import FilterContext from "./context/FilterContext";
import ViewContext from "./context/ViewContext";
import FilterSection from "../components/filter/FilterSection";
import NotesContainer from "../components/view/NotesContainer";
import { dropOptions, notedata } from "../../../mocks/api";

function DashBoard() {
  return (
    <>
      {/* Header with title and add button */}
      <HeadSection title="Your notes" newItem={() => console.log("test")} />

      {/* Filter section */}
      {/* TODO: The selector of the view here*/}
      <FilterContext>
        <FilterSection data={dropOptions} />
      </FilterContext>

      {/* Notes */}
      <ViewContext>
        <NotesContainer data={notedata} />
      </ViewContext>
    </>
  );
}

export default DashBoard;
