import React from "react";
import { dropOptions } from "../../../../mocks/api";
import { Link } from "react-router-dom";

function ProjectsContainer() {
  const projects = dropOptions.map((project) => (
    <Link to={`/projects/${project.id}`} key={project.id}>
      <div
        className="
      shadow-md flex flex-col font-fm p-2
      bg-white
      rounded-2xl break-words h-20
      relative
      "
      >
        {project.name}
        <div className="absolute bottom-3 right-4 font-fm bg-gradient-to-tl from-zinc-300 to-transparent w-8 rounded-full flex items-center justify-center shadow-lg">
          {project.notes.length}
        </div>
      </div>
    </Link>
  ));

  return (
    <section className="grid grid-cols-1 w-full gap-2">{projects}</section>
  );
}

export default ProjectsContainer;
