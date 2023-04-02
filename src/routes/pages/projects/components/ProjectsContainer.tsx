import React from "react";
import { Link } from "react-router-dom";
import { Project } from "../../../../../types/state";

type ProjectsContainerProps = {
  projects: Project[];
}

function ProjectsContainer({ projects }: ProjectsContainerProps) {

  const content = projects.map((project) => (
    <Link to={`/projects/${project.id}`} key={project.id}>
      <div
        className="
      shadow-md flex flex-col font-fm p-2
      bg-white
      rounded-2xl break-words h-20
      relative
      dark:bg-zinc-700
      dark:text-zinc-100
      "
      >
        {project.name}
        <div
          className="absolute bottom-3 right-4 font-fm bg-gradient-to-tl from-zinc-300 to-transparent w-8 rounded-full flex items-center justify-center shadow-lg
          dark:from-zinc-600 dark:to-zinc-700">
          {project.notes.length}
        </div>
      </div>
    </Link>
  ));

  return (
    <section className="grid grid-cols-1 w-full gap-2">{content}</section>
  );
}

export default ProjectsContainer;
