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
  const setApolloLoading = useSetAtom(loadingOnlineQuery);
  const setProjects = useSetAtom(allProjectsAtom);
  const [getNotes] = useGetNotesLazyQuery();
  const [getProjects] = useGetProjectsLazyQuery();


  /**
   * Fetch data from the server or indexedDB based on the online status and set the data on the atoms
   * @param getFn
   * @param setFn
   * @param getLocalFn
   * @param mergeFn
   */

  async function fetchAndSetState(
    getFn: () => Promise<any>,
    setFn: (data: any) => void,
    getLocalFn: () => Promise<any>,
    mergeFn: (data: any, localDB: IdbInstance) => Promise<any>
  ) {
    let finalData = [];
    if (online && isLogged) {
      try {
        const { data } = await getFn();
        finalData = await mergeFn(data, IDB);
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
      mergeNotes
    );
  }

  async function fetchProjects() {
    await fetchAndSetState(
      getProjects,
      setProjects,
      IDB.getProjects.bind(IDB),
      mergeProjects
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