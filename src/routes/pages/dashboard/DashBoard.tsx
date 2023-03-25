import React from "react";
import HeadSection from "../../../components/HeadSection";
import ViewContext from "../../../context/ViewContext";
import FilterSection from "./components/filter/FilterSection";
import NotesContainer from "../../../components/NotesContainer";
import { useFilterContext } from "./context/FilterContext";
import { useLoaderData } from "react-router-dom";
import { dropOptions } from "../../../mocks/api";
import { PUBLIC_ROUTES } from "../../../../types/routes";

// React router loader
export async function loader() {
  const projects: Promise<typeof dropOptions> = new Promise((resolve) =>
    resolve(dropOptions)
  );
  return await projects;
}

function DashBoard() {
  const projects = useLoaderData() as typeof dropOptions;
  const {
    selectedProject: { id },
  } = useFilterContext();
  return (
    <>
      {/* Header with title and add button */}
      <HeadSection title="Your notes" whereTo={PUBLIC_ROUTES.NEW_NOTE} />

      {/* Filter section */}
      {/* TODO: The selector of the view here*/}
      <FilterSection data={projects} />
      {/* Notes */}
      <ViewContext>
        <NotesContainer projectId={id} />
      </ViewContext>
    </>
  );
}

export default DashBoard;
