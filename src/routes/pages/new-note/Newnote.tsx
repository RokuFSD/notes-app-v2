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
import { allProjectsAtom, readWriteAllNotesAtom } from "../../../jotai";
import { generateRandomColor } from "../../../utils/randomColor";

const initialValues = {
  title: "",
  content: "",
  name: "default" // Default all projects
};


export const action: ActionFunction = async ({ request }) => {
  const data = await request.formData();
  data.set("id", Date.now().toString());
  data.set("color", generateRandomColor());
  const note = Object.fromEntries(data.entries());
  await IDB.addNote(note as Note);

  // Update notes atom
  const store = getDefaultStore();
  store.set(readWriteAllNotesAtom, note as Note);

  return redirect("/");
};

export const loader: LoaderFunction = async () => {
  return getDefaultStore().get(allProjectsAtom);
};

export function Newnote() {
  const navigate = useNavigate();

  // Project from location
  const { state } = useLocation();

  const options = useLoaderData() as Project[];

  const content = !state?.id ? (
    options.map((option) => (
      <Form.FormOption key={option.id} name={option.name} id={option.id} />
    ))
  ) : (
    <Form.FormOption name={state.name} id={state.id} />
  );

  function goBack() {
    navigate(-1);
  }

  return (
    <section className="h-5/6 relative">
      <Form.Form
        initialValues={initialValues}
        method="post"
        className="w-full h-full grid grid-cols-1 grid-rows-6 border border-slate-700 rounded-2xl overflow-hidden"
      >
        <Form.FormInput
          name="title"
          type="text"
          placeholder="Title..."
          required
          className="row-start-1 font-fm text-2xl p-2 bg-transparent font-semibold"
        />
        <Form.FormArea
          name="content"
          placeholder="Content..."
          className="row-start-2 row-span-4 text-md p-2 w-full bg-transparent font-fm"
          required
        />
        <div className="flex justify-around items-center absolute top-full w-full mt-2 h-14">
          <button
            className="w-1/2 h-full title text-xl"
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
          className="row-start-6 row-span-1 col-start-1 z-40 justify-self-center pointer-events-none font-fm"
        >
          Save in project
        </label>
        <Form.FormSelect
          id="project"
          name="project"
          className="row-start-6 row-span-1 col-span-full col-start-1 z-10 bg-transparent font-fm p-2 font-semibold"
          disabled={false}
        >
          {content}
        </Form.FormSelect>
      </Form.Form>
    </section>
  );
}
