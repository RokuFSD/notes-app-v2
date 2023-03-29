import { useState, useEffect } from "react";
import { useSetAtom } from "jotai";
import { fetchProjectsAtom, fetchCurrentNotesAtom } from "../jotai";

export default function useData() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const fetchProjects = useSetAtom(fetchProjectsAtom);
  const fetchCurrentNotes = useSetAtom(fetchCurrentNotesAtom);

  useEffect(() => {
    async function fetchAll() {
      await Promise.all(
        [
          fetchProjects(),
          fetchCurrentNotes()
        ]
      );
    }

    setLoading(true);
    try {
      void fetchAll();
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error };
};