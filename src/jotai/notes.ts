import { atom } from "jotai";
import { Note } from "../../types/state";
import { allProjectsAtom } from "./projects";

export const allNotesAtom = atom<Note[]>([]);

export const addNoteAtom = atom((get) => get(allNotesAtom), (get, set, note: Note) => {
  const projectId = note.project;
  set(allNotesAtom, [...get(allNotesAtom), note]);
  const projects = get(allProjectsAtom);

  // We add the note to the "default" project who contains all notes
  if (projectId !== "default") {
    const defaultProject = projects.get("default");
    if (!defaultProject) return console.error("Default project not found?");
    defaultProject.notes.push(note);
    set(allProjectsAtom, projects.set("default", defaultProject));
  }

  // We add the note to the project it belongs to
  const project = projects.get(projectId);
  if (project) {
    project.notes.push(note);
    set(allProjectsAtom, projects.set(projectId, project));
  }

});

export const deleteNoteAtom = atom(null, (get, set, noteId: string) => {
  const notes = get(allNotesAtom);
  const note = notes.find((n) => n.id === noteId);
  const project = get(allProjectsAtom).get(note?.project as string);
  set(allNotesAtom, notes.filter((n) => n.id !== noteId));

  if (!project) throw new Error("Project not found");

  if (note?.project !== "default") {
    const defaultProject = get(allProjectsAtom).get("default")!;
    defaultProject.notes = defaultProject.notes.filter((n) => n.id !== noteId);
    set(allProjectsAtom, get(allProjectsAtom).set("default", defaultProject));
  }

  project.notes = project.notes.filter((n) => n.id !== noteId);
  set(allProjectsAtom, get(allProjectsAtom).set(project.id, project));
});


export const updateNoteAtom = atom(null, (get, set, note: Note) => {
  const notes = get(allNotesAtom);
  const index = notes.findIndex((n) => n.id === note.id);
  notes[index] = note;
  set(allNotesAtom, notes);

  const project = get(allProjectsAtom).get(note.project);

  if (!project) {
    throw new Error("Project not found");
  }

  const projectNoteIndex = project.notes.findIndex((n) => n.id === note.id);
  project.notes[projectNoteIndex] = note;
  set(allProjectsAtom, get(allProjectsAtom).set(project.id, project));
});

