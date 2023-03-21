import React from "react";
import HeadSection from "../../../components/HeadSection";
import ViewContext from "./context/ViewContext";
import FilterSection from "../components/filter/FilterSection";
import NotesContainer from "../components/view/NotesContainer";
import FilterContext from "./context/FilterContext";
import { useLoaderData } from "react-router-dom";
import { dropOptions } from "../../../mocks/api";

// React router loader
export async function loader() {
  const projects: Promise<typeof dropOptions> = new Promise((resolve) =>
    resolve(dropOptions)
  );
  return await projects;
}

function DashBoard() {
  const projects = useLoaderData() as typeof dropOptions;
  return (
    <>
      {/* Header with title and add button */}
      <HeadSection title="Your notes" newItem={() => console.log("test")} />

      {/* Filter section */}
      {/* TODO: The selector of the view here*/}
      <FilterContext>
        <FilterSection data={projects} />
        {/* Notes */}
        <ViewContext>
          <NotesContainer />
        </ViewContext>
      </FilterContext>
    </>
  );
}

export default DashBoard;
