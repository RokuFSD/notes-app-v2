import React from "react";
import HeadSection from "../../../components/HeadSection";
import { LoaderFunction, useLoaderData } from "react-router-dom";
import { dropOptions } from "../../../mocks/api";
import { PUBLIC_ROUTES } from "../../../../types/routes";
import NotesContainer from "../../../components/NotesContainer";

// React router loader
export const loader: LoaderFunction = async ({ params }) => {
  const { projectId } = params;
  return dropOptions.find((project) => project.id === projectId);
};

export function Project() {
  const project = useLoaderData() as (typeof dropOptions)[0];
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
