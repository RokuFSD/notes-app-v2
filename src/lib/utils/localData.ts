import { Project, NoteResponse } from "../../../types/state";
import { IdbInstance } from "../../store/idb";

/**
 * Merge the projects from the local data with the projects from the server
 * @param {Project[]} projects - Projects to merge
 * @param {IdbInstance} localDB - IndexedDB static class
 * @returns {Promise<Project[]>}
 */

export async function mergeProjects(projects: Project[], localDB: IdbInstance) {
  const localProjects = await localDB.getProjects();
  const updatedLocalProjects = localProjects?.map((project) => {
    const projectOnServer = projects?.find((p) => p.id === project.id);
    if (projectOnServer) {
      if (projectOnServer.updatedDate > project.updatedDate) {
        return projectOnServer;
      } else {
        return project;
      }
    }
    return project;
  });
  return [...updatedLocalProjects, ...projects];
}

/**
 * Merge the notes from the local data with the notes from the server
 * @param {Note[]} notes - Notes to merge
 * @param {IdbInstance} localDB - IndexedDB static class
 * @returns {Promise<Note[]>}
 */

export async function mergeNotes(notes: NoteResponse[], localDB: IdbInstance) {
  const localNotes = await localDB.getNotes();

  const updatedLocalNotes = localNotes?.map((note) => {
    const noteOnServer = notes?.find((n) => n.id === note.id);
    if (noteOnServer) {
      if (noteOnServer.updatedDate > note.updatedDate) {
        return {
          ...noteOnServer,
          project: noteOnServer.project.id
        };
      } else {
        return note;
      }
    } else {
      return note;
    }
  });

  return [...updatedLocalNotes, ...notes.map((note) => ({ ...note, project: note.project.id }))];
}