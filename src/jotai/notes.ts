import { atom } from "jotai";
import { Note } from "../../types/state";
import IDB from "../store/idb";
import { allProjectsAtom, currentProjectId, defaultProjectAtom } from "./projects";

export const allNotesAtom = atom<Note[]>([]);
export const currentNotesAtom = atom<Note[]>([]);


export const fetchCurrentNotesAtom = atom(null, async (get, set) => {
  const projectId = get(currentProjectId);
  if (projectId === "default") return set(currentNotesAtom, get(defaultProjectAtom).notes);
  const notes = await IDB.getProjectNotes(projectId);
  set(currentNotesAtom, notes);
});

export const addNoteAtom = atom((get) => get(allNotesAtom), (get, set, note: Note) => {
  set(allNotesAtom, [...get(allNotesAtom), note]);
  set(defaultProjectAtom, {
    ...get(defaultProjectAtom),
    notes: [...get(defaultProjectAtom).notes, note]
  });
});

export const deleteNoteAtom = atom(null, (get, set, noteId: string) => {
  const notes = get(defaultProjectAtom).notes;
  const index = notes.findIndex((n) => n.id === noteId);
  notes.splice(index, 1);
  set(allNotesAtom, notes);
  set(defaultProjectAtom, {
    ...get(defaultProjectAtom),
    notes: get(defaultProjectAtom).notes.filter((n) => n.id !== noteId)
  });
});


export const updateNoteAtom = atom(null, (get, set, note: Note) => {
  const notes = get(defaultProjectAtom).notes;
  const index = notes.findIndex((n) => n.id === note.id);
  notes[index] = note;
  set(defaultProjectAtom, {
    ...get(defaultProjectAtom),
    notes: notes
  });

  const project = get(allProjectsAtom).find((p) => p.id === note.project);
  if (project) {
    const index = project.notes.findIndex((n) => n.id === note.id);
    project.notes[index] = note;
    set(allProjectsAtom, get(allProjectsAtom).map((p) => p.id === note.project ? project : p));
  }
});