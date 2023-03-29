import { atom, createStore } from "jotai";
import { Note, Project } from "../../types/state";
import IDB from "../store/idb";

export const appStore = createStore();

export const defaultProjectAtom = atom<Project>({
  id: "default",
  name: "All",
  notes: await IDB.getNotes()
});

export const allNotesAtom = atom<Note[]>([]);
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


export const readWriteAllNotesAtom = atom((get) => get(allNotesAtom), (get, set, note: Note) => {
  set(allNotesAtom, [...get(allNotesAtom), note]);
  set(defaultProjectAtom, {
    ...get(defaultProjectAtom),
    notes: [...get(defaultProjectAtom).notes, note]
  });
});

export const currentProjectId = atom<string>("default");
export const currentNotesAtom = atom<Note[]>([]);

export const fetchCurrentNotesAtom = atom(null, async (get, set) => {
  const projectId = get(currentProjectId);
  if (projectId === "default") return set(currentNotesAtom, get(defaultProjectAtom).notes);
  const notes = await IDB.getProjectNotes(projectId);
  set(currentNotesAtom, notes);
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