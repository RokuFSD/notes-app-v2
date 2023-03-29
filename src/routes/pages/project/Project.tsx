import React from "react";
import HeadSection from "../../../components/HeadSection";
import { LoaderFunction, useLoaderData } from "react-router-dom";
import { PUBLIC_ROUTES } from "../../../../types/routes";
import NotesContainer from "../../../components/NotesContainer";
import IDB from "../../../store/idb";
import { Project as ProjectType } from "../../../../types/state";
import { defaultProjectAtom, setCurrentProjectId } from "../../../jotai/projects";
import { getDefaultStore } from "jotai";

// React router loader
export const loader: LoaderFunction = async ({ params }) => {
  const { projectId } = params;
  if (!projectId) throw new Error("Project id is not defined");
  await getDefaultStore().set(setCurrentProjectId, projectId);
  if (projectId === "default") return getDefaultStore().get(defaultProjectAtom);
  return await IDB.getProject(projectId);
};

export function Project() {
  const project = useLoaderData() as ProjectType;
  return (
    <>
      <HeadSection
        title={project.name}
        whereTo={PUBLIC_ROUTES.NEW_NOTE}
        context={project}
      />
      <NotesContainer />
    </>
  );
}
