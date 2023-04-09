import React from "react";
import HeadSection from "../../../components/HeadSection";
import ViewContext from "../../../context/ViewContext";
import FilterSection from "./components/filter/FilterSection";
import NotesContainer from "../../../components/NotesContainer";
import { PUBLIC_ROUTES } from "../../../../types/routes";
import { useAtomValue } from "jotai";
import { allProjectsAtom, currentProjectId, loadingOnlineQuery } from "../../../jotai";

function Dashboard() {
  const projectId = useAtomValue(currentProjectId);
  const projects = useAtomValue(allProjectsAtom);
  const loadingFromApollo = useAtomValue(loadingOnlineQuery);
  return (
    <>
      {loadingFromApollo && <h1 className="text-7xl text-red-400">Loading from apollo</h1>}
      {/* Header with title and add button */}
      <HeadSection title="Your notes" whereTo={PUBLIC_ROUTES.NEW_NOTE} />

      {/* Filter section */}
      {/* TODO: The selector of the view here*/}
      <FilterSection data={Array.from(projects.values())} />
      {/* Notes */}
      <ViewContext>
        <NotesContainer projectId={projectId} />
      </ViewContext>
    </>
  );
}

export default Dashboard;