import React from "react";
import HeadSection from "../../../components/HeadSection";
import ProjectsContainer from "./components/ProjectsContainer";
import { PUBLIC_ROUTES } from "../../../../types/routes";



export function Projects() {
  return (
    <>
      <HeadSection title="Your projects" whereTo={PUBLIC_ROUTES.NEW_PROJECT} />
      <ProjectsContainer />
    </>
  );
}
