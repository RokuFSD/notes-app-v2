import React from "react";
import HeadSection from "../../../components/HeadSection";
import ProjectsContainer from "./components/ProjectsContainer";
import { PUBLIC_ROUTES } from "../../../../types/routes";
import { useAtomValue } from "jotai";
import { allProjectsAtom } from "../../../jotai/projects";


export function Projects() {
  const projects = useAtomValue(allProjectsAtom);
  return (
    <>
      <HeadSection title="Your projects" whereTo={PUBLIC_ROUTES.NEW_PROJECT} />
      <ProjectsContainer projects={Array.from(projects.values())} />
    </>
  );
}
