import React from "react";
import HeadSection from "../../../components/HeadSection";
import ProjectsContainer from "./components/ProjectsContainer";
import { PUBLIC_ROUTES } from "../../../../types/routes";
import { useAtomValue } from "jotai";
import { loadingOnlineQuery } from "../../../jotai";


export function Projects() {
  const loadingFromApollo = useAtomValue(loadingOnlineQuery);
  return (
    <>
      <HeadSection title="Your projects" whereTo={PUBLIC_ROUTES.NEW_PROJECT} />
      <ProjectsContainer/>
      {loadingFromApollo && <h1 className="text-7xl text-red-400">Loading from apollo</h1>}
    </>
  );
}
