import React from "react";
import HeadSection from "../../../components/HeadSection";
import { LoaderFunction, useLoaderData } from "react-router-dom";
import { PUBLIC_ROUTES } from "../../../../types/routes";
import NotesContainer from "../../../components/NotesContainer";
import IDB from "../../../store/idb";
import { Project as ProjectType } from "../../../../types/state";

// React router loader
export const loader: LoaderFunction = async ({ params }) => {
  const { projectId } = params;
  return await IDB.getProject(projectId!);
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
      <NotesContainer projectId={project.id} />
    </>
  );
}
