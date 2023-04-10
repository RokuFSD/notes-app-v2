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

export async function mergeData(data: any[], getLocalFn: () => Promise<any[]>, mapCb?: (data: any) => any) {
  const localData = await getLocalFn();
  const updatedLocalData = localData.map((item) => {
    const itemOnServer = data.find((n: any) => n.id === item.id);
    if (!itemOnServer) return item;

    const index = data.indexOf(itemOnServer);
    data = data.filter((_, i) => i !== index);

    if (itemOnServer.updatedDate > item.updatedDate) {
      return mapCb ? mapCb(itemOnServer) : itemOnServer;
    } else {
      return item;
    }
  });

  const mappedNetworkData = mapCb ? data.map(mapCb) : data;
  return [...updatedLocalData, ...mappedNetworkData];
}

export async function mergeProjects(projects: { projects: Project[] }, localDB: IdbInstance) {
  try {
    return await mergeData(projects.projects, localDB.getProjects.bind(localDB));
  } catch (e) {
    console.error(e);
  }
}

export async function mergeNotes(notes: { notes: NoteResponse[] }, localDB: IdbInstance) {
  try {
    return await mergeData(notes.notes, localDB.getNotes.bind(localDB), mapProjectId);
  } catch (e) {
    console.error(e);
  }
}

function mapProjectId(note: NoteResponse) {
  return {
    ...note,
    project: note.project.id
  };
}