/* eslint-disable react-hooks/exhaustive-deps,@typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { mergeNotes, mergeProjects } from "../lib/utils/localData";
import IDB, { IdbInstance } from "../store/idb";
import { useGetNotesLazyQuery, useGetProjectsLazyQuery } from "../generated/generated.graphql";
import { onlineAtom, userAtom, allProjectsAtom, allNotesAtom, loadingAtom, loadingOnlineQuery } from "../jotai";

/**
 * Custom hook to fetch data from the database or indexedDB based on the online status
 * It sets the data on the atoms [allNotesAtom, setProjectsAtom]
 * @returns void
 */
export default function useData() {
  const online = useAtomValue(onlineAtom);
  const isLogged = !!useAtomValue(userAtom);

  const setNotes = useSetAtom(allNotesAtom);
  const setLoading = useSetAtom(loadingAtom);
  const setProjects = useSetAtom(allProjectsAtom);
  const setApolloLoading = useSetAtom(loadingOnlineQuery);

  const [getNotes] = useGetNotesLazyQuery({
    fetchPolicy: "network-only"
  });
  const [getProjects] = useGetProjectsLazyQuery({
    fetchPolicy: "network-only"
  });

  /**
   * The fetchAndSetState function is a helper function that fetches data from the server and sets it to state.
   * It also saves the data in IndexedDB for offline use.
   *
   * @param getFn: () Get the data from the api
   * @param setFn: (data: any) Set the state of the component
   * @param getLocalFn: () Get the data from the local database
   * @param mergeFn: (data: any Merge the data from the server with the local database
   * @param saveFn: (data: any) Save the data to the local database
   *
   * @return A promise
   *
   */
  async function fetchAndSetState(
    getFn: () => Promise<any>,
    setFn: (data: any) => void,
    getLocalFn: () => Promise<any>,
    mergeFn: (data: any, localDB: IdbInstance) => Promise<any>,
    saveFn: (data: any) => Promise<any>
  ) {
    let finalData = [];
    if (online && isLogged) {
      try {
        const { data } = await getFn();
        finalData = await mergeFn(data, IDB);
        await saveFn(finalData);
      } catch (err) {
        finalData = await getLocalFn();
      }
    } else {
      finalData = await getLocalFn();
    }
    setFn(finalData);
  }

  async function fetchNotes() {
    await fetchAndSetState(
      getNotes,
      setNotes,
      IDB.getNotes.bind(IDB),
      mergeNotes,
      IDB.saveNotes.bind(IDB)
    );
  }

  async function fetchProjects() {
    await fetchAndSetState(
      getProjects,
      setProjects,
      IDB.getProjects.bind(IDB),
      mergeProjects,
      IDB.saveProjects.bind(IDB)
    );
  }

  useEffect(() => {
    async function fetchAll() {
      try {
        if (online && isLogged) {
          setApolloLoading(true);
        } else {
          setLoading(true);
        }
        await Promise.all(
          [
            fetchNotes(),
            fetchProjects()
          ]
        );
      } finally {
        setLoading(false);
        setApolloLoading(false);
      }
    }

    void fetchAll();
  }, [online, isLogged]);

};