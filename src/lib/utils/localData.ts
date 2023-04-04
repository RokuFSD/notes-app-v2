import { Project } from "../../../types/state";
import { IdbInstance } from "../../store/idb";

/**
 * Merge the projects from the local data with the projects from the server
 * @param {Project[]} projects - Projects to merge
 * @param {IdbInstance} localDB - IndexedDB static class
 * @returns {Promise<Project[]>}
 */

export async function mergeProjects(projects: Project[], localDB: IdbInstance) {
  const localProjects = await localDB.getProjects();
  const mergedProjects = projects.map((project) => {
    const localProject = localProjects.find((p) => p.id === project.id);
    if (localProject) {
      return {
        ...project,
        notes: localProject.notes
      };
    }
    return project;
  });
}