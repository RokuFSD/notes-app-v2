import { useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { setProjectsAtom } from "../jotai/projects";
import { onlineAtom, userAtom } from "../jotai/user";
import IDB from "../store/idb";
import { allNotesAtom } from "../jotai/notes";
import { loadingAtom } from "../jotai";

/**
 * Custom hook to fetch data from the database or indexedDB based on the online status
 * It sets the data on the atoms [allNotesAtom, setProjectsAtom]
 * @returns void
 */
export default function useData() {
  const setNotes = useSetAtom(allNotesAtom);
  const setLoading = useSetAtom(loadingAtom);
  const setProjects = useSetAtom(setProjectsAtom);
  const online = useAtomValue(onlineAtom);
  const isLogged = !!useAtomValue(userAtom)

  /**
   * Fetch projects from the database or indexedDB based on the online status
   * @returns {Promise<void>}
   */
  async function fetchProjects() {
    if (online && isLogged) {
      //   TODO: Apollo client query

      console.log("fetching projects from the database");
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