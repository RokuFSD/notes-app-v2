import { Project, NoteResponse } from "../../../types/state";
import { IdbInstance } from "../../store/idb";

/**
 * Merge the projects from the local data with the projects from the server
 * @param {Project[]} projects - Projects to merge
 * @param {IdbInstance} localDB - IndexedDB static class
 * @returns {Promise<Project[]>}
 */

export async function mergeProjects(projects: Project[], localDB: IdbInstance) {
  const networkProjects = projects;
  const localProjects = await localDB.getProjects();
  const updatedLocalProjects = localProjects?.map((project) => {
    const projectOnServer = networkProjects?.find((p) => p.id === project.id);
    if (projectOnServer && projectOnServer.updatedDate > project.updatedDate) {
      networkProjects.splice(networkProjects.indexOf(projectOnServer), 1);
      return projectOnServer;
    }
    return project;
  });
  return [...updatedLocalProjects, ...networkProjects];
}

/**
 * Merge the notes from the local data with the notes from the server
 * @param {Note[]} notes - Notes to merge
 * @param {IdbInstance} localDB - IndexedDB static class
 * @returns {Promise<Note[]>}
 */

export async function mergeNotes(notes: NoteResponse[], localDB: IdbInstance) {
  const networkNotes = notes;
  const localNotes = await localDB.getNotes();

  const updatedLocalNotes = localNotes?.map((note) => {
    const noteOnServer = networkNotes?.find((n) => n.id === note.id);
    if (noteOnServer && noteOnServer.updatedDate > note.updatedDate) {
      networkNotes.splice(networkNotes.indexOf(noteOnServer), 1);
      return {
        ...noteOnServer,
        project: noteOnServer.project.id
      };
    }
    return note;
  });

  return [...updatedLocalNotes, ...networkNotes.map((note) => ({ ...note, project: note.project.id }))];
}