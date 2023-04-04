import React from "react";
import * as Form from "../../../components/Form";
import {
  ActionFunction, LoaderFunction,
  redirect, useLoaderData,
  useLocation,
  useNavigate
} from "react-router-dom";
import IDB from "../../../store/idb";
import { Note, Project } from "../../../../types/state";
import { getDefaultStore } from "jotai";
import { allProjectsAtom } from "../../../jotai/projects";
import { addNoteAtom } from "../../../jotai/notes";
import { generateRandomColor } from "../../../lib/utils/randomColor";

const initialValues = {
  title: "",
  content: "",
  name: "default" // Default all projects
};


export const action: ActionFunction = async ({ request }) => {
  const data = await request.formData();
  data.set("id", Date.now().toString());
  data.set("color", generateRandomColor());
  data.set("createdDate", new Date().toString());
  data.set("updatedDate", new Date().toString());
  const note = Object.fromEntries(data.entries());
  await IDB.addNote(note as Note);

  // Update notes atom
  const store = getDefaultStore();
  store.set(addNoteAtom, note as Note);

  return redirect("/");
};

export const loader: LoaderFunction = async () => {
  return Array.from(getDefaultStore().get(allProjectsAtom).values());
};

export function Newnote() {
  const navigate = useNavigate();

  // Project from location
  const { state } = useLocation();

  const options = useLoaderData() as Project[];

  const content = !state?.id ? (
    options.map((option) => (
      <Form.FormOption key={option.id} name={option.title} id={option.id} />
    ))
  ) : (
    <Form.FormOption name={state.title} id={state.id} />
  );

  function goBack() {
    navigate(-1);
  }

  return (
    <section className="h-5/6 relative">
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
          className="row-start-2 row-span-4 text-md p-2 w-full bg-transparent font-fm dark:text-zinc-100"
          required
        />
        <div className="flex justify-around items-center absolute top-full w-full mt-2 h-14 gap-2">
          <button
            className="w-1/2 h-full title text-xl dark:bg-zinc-100 rounded-2xl"
            onClick={() => goBack()}
          >
            Cancel
          </button>
          <Form.FormSubmit className="text-xl bg-lime-300 w-full h-full rounded-2xl border border-slate-700 title">
            Create
          </Form.FormSubmit>
        </div>
        <label
          htmlFor="project"
          aria-labelledby="project"
          className="row-start-6 row-span-1 col-start-1 z-40 justify-self-center pointer-events-none font-fm dark:text-zinc-100"
        >
          Save in project
        </label>
        <Form.FormSelect
          id="project"
          name="project"
          className="row-start-6 row-span-1 col-span-full col-start-1 z-10 bg-transparent font-fm p-2 font-semibold dark:text-zinc-100"
          disabled={false}
        >
          {content}
        </Form.FormSelect>
      </Form.Form>
    </section>
  );
}
