/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { onlineAtom, userAtom } from "../jotai/user";
import { setProjectsAtom } from "../jotai/projects";
import { allNotesAtom } from "../jotai/notes";
import { loadingAtom } from "../jotai";
import IDB from "../store/idb";
import { useGetNotesLazyQuery, useGetProjectsLazyQuery } from "../generated/generated.graphql";

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
  const setProjects = useSetAtom(setProjectsAtom);
  const [getNotes] = useGetNotesLazyQuery();
  const [getProjects] = useGetProjectsLazyQuery();

  /**
   * Fetch projects from the database or indexedDB based on the online status
   * @returns {Promise<void>}
   */
  async function fetchProjects() {
    if (online && isLogged) {
      try {
        const { data } = await getProjects();
        // Query success, merge the data with the local data
        // const mergedProjects = await IDB.mergeProjects(data?.projects);
        // setProjects(mergedProjects)
      } catch (err) {
        // Query failed, fetch the data from the local database
        const projects = await IDB.getProjects();
        setProjects(projects);
      }
    } else {
      const projects = await IDB.getProjects();
      setProjects(projects);
    }
  }

  /**
   * Fetch notes from the database or indexedDB based on the online status
   * @returns {Promise<void>}
   */
  async function fetchNotes() {
    if (online && isLogged) {
      // TODO: Apollo client query
      console.log("fetching notes from the database");
    } else {
      const notes = await IDB.getNotes();
      setNotes(notes);
    }
  }

  useEffect(() => {
    async function fetchAll() {
      await Promise.all(
        [
          fetchProjects(),
          fetchNotes()
        ]
      );
    }

    setLoading(true);
    try {
      void fetchAll();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

};