import { ActionFunction, redirect } from "react-router-dom";
import IDB from "../../../../store/idb";
import { getDefaultStore } from "jotai";
import { deleteNoteAtom } from "../../../../jotai";

export const action: ActionFunction = async ({ params }) => {
  const { noteId } = params;

  if (!noteId) throw new Error("No note id");
  await IDB.deleteNote(noteId as string);
  getDefaultStore().set(deleteNoteAtom, noteId as string);
  return redirect("/");
};