import React from "react";
import * as Form from "../../../components/Form";
import { ActionFunction, redirect, useNavigate } from "react-router-dom";
import { Project } from "../../../../types/state";
import IDB from "../../../store/idb";
import { getDefaultStore } from "jotai";
import { addProjectAtom } from "../../../jotai";

const initialValues = {
  name: ""
};

export const action: ActionFunction = async ({ request }) => {
  const data = await request.formData();
  data.set("id", Date.now().toString());
  const project = Object.fromEntries(data.entries()) as unknown;

  await getDefaultStore().set(addProjectAtom, project as Project);

  await IDB.addProject(project as Project);

  return redirect("/projects");
};

export function Newproject() {
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  return (
    <section className="h-5/6 relative flex items-center justify-center">
      <Form.Form
        initialValues={initialValues}
        method="post"
        className="w-full h-min-content grid grid-cols-1 grid-rows-6 border border-slate-700 rounded-2xl overflow-hidden
        dark:bg-zinc-900 dark:border-zinc-400
        "
      >
        <Form.FormInput
          name="name"
          type="text"
          placeholder="Title..."
          required
          className="row-start-1 row-span-full font-fm text-2xl p-2 bg-transparent font-semibold dark:text-zinc-100"
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
      </Form.Form>
    </section>
  );
}
