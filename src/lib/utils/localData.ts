/* eslint-disable @typescript-eslint/no-explicit-any */
import { Project, NoteResponse } from "../../../types/state";
import { IdbInstance } from "../../store/idb";


/**
 * The mergeData function takes in a data array from the network,
 * and a function that returns an array of local data. It then merges
 * the two arrays together by comparing their updatedDate properties.
 * If there is no updatedDate property on either item, it will default to using id instead.

 *
 * @param data: any Pass in the data from the network request
 * @param getLocalFn: () Retrieve the local data from the database
 * @param mapCb?: (data: any) Map the data before it is returned
 *
 * @return An array of objects
 *
 */

export async function mergeData(data: any, getLocalFn: () => Promise<any>, mapCb?: (data: any) => any) {
  const networkData = data;
  const localData = await getLocalFn() as any[];

  const updatedLocalData = localData?.map((item) => {
    const itemOnServer = networkData?.find((n: any) => n.id === item.id);
    if (itemOnServer && itemOnServer.updatedDate > item.updatedDate) {
      networkData.splice(networkData.indexOf(itemOnServer), 1);
      return mapCb ? mapCb(itemOnServer) : itemOnServer;
    }
    return item;
  });

  return [...updatedLocalData, ...networkData];
}

export async function mergeProjects(projects: { projects: Project[] }, localDB: IdbInstance) {
  return await mergeData(projects.projects, localDB.getProjects.bind(localDB));
}

export async function mergeNotes(notes: { notes: NoteResponse[] }, localDB: IdbInstance) {
  return await mergeData(notes.notes, localDB.getNotes.bind(localDB), (note: NoteResponse) => ({
    ...note,
    project: note.project.id
  }));
}