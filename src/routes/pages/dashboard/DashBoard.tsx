import React from "react";
import HeadSection from "../../../components/HeadSection";
import ViewContext from "../../../context/ViewContext";
import FilterSection from "./components/filter/FilterSection";
import NotesContainer from "../../../components/NotesContainer";
import { PUBLIC_ROUTES } from "../../../../types/routes";
import { useAtomValue } from "jotai";
import {allProjectsAtom} from "../../../jotai/projects";

function DashBoard() {
  const projects = useAtomValue(allProjectsAtom);
  return (
    <>
      {/* Header with title and add button */}
      <HeadSection title="Your notes" whereTo={PUBLIC_ROUTES.NEW_NOTE} />

      {/* Filter section */}
      {/* TODO: The selector of the view here*/}
      <FilterSection data={projects} />
      {/* Notes */}
      <ViewContext>
        <NotesContainer />
      </ViewContext>
    </>
  );
}

export default DashBoard;
