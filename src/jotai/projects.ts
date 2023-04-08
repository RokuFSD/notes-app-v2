import { atom } from "jotai";
import { Project } from "../../types/state";
import { allNotesAtom } from "./notes";


export const defaultProjectAtom = atom((get) => ({
  id: "default",
  title: "All",
  notes: get(allNotesAtom),
  updatedDate: new Date(),
  createdDate: new Date()
}));

const projectMap = new Map<string, Project>();

export const currentProjectId = atom<string>("default");

export const allProjectsAtom = atom(projectMap, (get, set, projects: any) => {
  if (!projectMap.has("default")) {
    projectMap.set("default", get(defaultProjectAtom));
  }
  projects.forEach((project: Project) => {
    projectMap.set(project.id, project);
  });
  set(allProjectsAtom, projectMap);
});


export const addProjectAtom = atom(null, (get, set, project: Project) => {
  const projects = get(allProjectsAtom);
  projects.set(project.id, project);
  set(allProjectsAtom, projects);
});


export const setCurrentProjectId = atom(null, async (get, set, projectId: string) => {
  if (projectId === "default") {
    set(currentProjectId, projectId);
  }
  if (projectId === get(currentProjectId)) return;
  set(currentProjectId, projectId);
});

