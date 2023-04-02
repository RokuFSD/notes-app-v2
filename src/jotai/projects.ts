import { atom } from "jotai";
import { Project } from "../../types/state";
import { appStore } from "./index";
import IDB from "../store/idb";

export const defaultProjectAtom = atom<Project>({
  id: "default",
  name: "All",
  notes: await IDB.getNotes()
});

const projectMap = new Map<string, Project>();

projectMap.set("default", appStore.get(defaultProjectAtom));

export const currentProjectId = atom<string>("default");

export const allProjectsAtom = atom<typeof projectMap>(projectMap);

export const setProjectsAtom = atom(null, (get, set, projects: Project[]) => {
  projects.forEach(project => {
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

