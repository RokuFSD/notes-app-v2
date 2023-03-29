import { atom } from "jotai";
import { Project } from "../../types/state";
import IDB from "../store/idb";
import { appStore } from "./index";
import { currentNotesAtom } from "./notes";

export const defaultProjectAtom = atom<Project>({
  id: "default",
  name: "All",
  notes: await IDB.getNotes()
});


export const currentProjectId = atom<string>("default");

export const allProjectsAtom = atom<Project[]>([appStore.get(defaultProjectAtom)]);

export const fetchProjectsAtom = atom(null, async (get, set) => {
    const dbProjects = await IDB.getProjects();
    set(allProjectsAtom, () => [get(defaultProjectAtom), ...dbProjects]);
  }
);


export const addProjectAtom = atom(null, (get, set, project: Project) => {
  const projects = get(allProjectsAtom);
  set(allProjectsAtom, [...projects, project]);
});


export const setCurrentProjectId = atom(null, async (get, set, projectId: string) => {
  if (projectId === "default") {
    set(currentProjectId, projectId);
    return set(currentNotesAtom, get(defaultProjectAtom).notes);
  }
  if (projectId === get(currentProjectId)) return;
  set(currentProjectId, projectId);
  const notes = await IDB.getProjectNotes(projectId);
  set(currentNotesAtom, notes);
});