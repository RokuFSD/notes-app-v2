/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { onlineAtom, userAtom } from "../jotai/user";
import { allProjectsAtom } from "../jotai/projects";
import { allNotesAtom } from "../jotai/notes";
import { loadingAtom, loadingOnlineQuery } from "../jotai";
import IDB from "../store/idb";
import { NoteEntity, useGetNotesLazyQuery, useGetProjectsLazyQuery } from "../generated/generated.graphql";
import { mergeNotes, mergeProjects } from "../lib/utils/localData";
import { Project } from "../../types/state";

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
   * Fetch projects from the database or indexedDB based on the online status
   * @returns {Promise<void>}
   */
  async function fetchProjects() {
    if (online && isLogged) {
      try {
        const { data } = await getProjects();
        // Query success, merge the data with the local data
        setProjects(await mergeProjects(data?.projects as Project[], IDB));
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
      try {
        const { data } = await getNotes();
        setNotes(await mergeNotes(data?.notes as NoteEntity[], IDB));
      } catch (err) {
        const notes = await IDB.getNotes();
        setNotes(notes);
      }
    } else {
      const notes = await IDB.getNotes();
      setNotes(notes);
    }
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
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
        setApolloLoading(false);
      }
    }

    void fetchAll();
  }, [online, isLogged]);

};