import { ActionFunction, redirect, useLocation, useNavigate } from "react-router-dom";
import React, { useMemo } from "react";
import { Note as NoteType } from "../../../../types/state";

import * as Form from "../../../components/Form";
import IDB from "../../../store/idb";
import { getDefaultStore } from "jotai";
import { updateNoteAtom } from "../../../jotai/notes";
import DeleteButton from "./components/DeleteButton";

export const action: ActionFunction = async ({ request, params }) => {
  const { noteId } = params;
  const data = await request.formData();
  if (!noteId) throw new Error("No note id");
  const noteToEdit = await IDB.getNote(noteId as string);
  const note = Object.fromEntries(data.entries());

  const finalNote = {
    ...noteToEdit,
    ...note
  };

  getDefaultStore().set(updateNoteAtom, finalNote as NoteType);

  await IDB.updateNote(finalNote as NoteType);


  return redirect("/");
};


export function Note() {
  const navigate = useNavigate();

  // Note from location
  const { state } = useLocation();

  const initialValues = useMemo(() => ({
    title: state?.title || "",
    content: state?.content || "",
    project: state?.project || ""
  }), [state.title, state.content, state.project]);

  function goBack() {
    navigate(-1);
  }

  return (
    <section className="h-5/6 relative">
      <DeleteButton />
      <Form.Form
        initialValues={initialValues}
        method="post"
        className="w-full h-full grid grid-cols-1 grid-rows-6 border border-slate-700 rounded-2xl overflow-hidden bg-slate-100 dark:bg-zinc-900 dark:border-zinc-400"
      >
        <Form.FormInput
          name="title"
          type="text"
          placeholder="Title..."
          required
          className="row-start-1 font-fm text-2xl p-2 bg-transparent font-semibold dark:text-zinc-100"
        />
        <Form.FormArea
          name="content"
          placeholder="Content..."
          className="row-start-2 row-span-full text-md p-2 w-full bg-transparent font-fm dark:text-zinc-100"
          required
        />
        <Form.FormSelect
          id="project"
          name="project"
          className="hidden"
          disabled={false}
        >
          <option value={state.project}></option>
        </Form.FormSelect>
        <div className="flex justify-around items-center absolute top-full w-full mt-2 h-14 gap-2">
          <button
            className="w-1/2 h-full title text-xl dark:bg-zinc-100 rounded-2xl"
            onClick={() => goBack()}
          >
            Cancel
          </button>
          <Form.FormSubmit className="text-xl bg-lime-300 w-full h-full rounded-2xl border border-slate-700 title">
            Update
          </Form.FormSubmit>
        </div>
      </Form.Form>
    </section>
  );
}
