import React from "react";
import HeadSection from "../../../components/HeadSection";
import ProjectsContainer from "./components/ProjectsContainer";

export function Projects() {
  return (
    <>
      <HeadSection
        title="Your projects"
        newItem={() => console.log("Fran haceme el back la concha tuya")}
      />
      <ProjectsContainer />
    </>
  );
}
