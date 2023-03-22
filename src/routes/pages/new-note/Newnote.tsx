import React from "react";
import * as Form from "../../../components/Form";
import { ActionFunction, redirect, useNavigate } from "react-router-dom";
import { dropOptions } from "../../../mocks/api";

const initialValues = {
  title: "",
  description: "",
  name: "id1", // Default all projects
};

export const action: ActionFunction = async ({ request }) => {
  const data = await request.formData();
  console.log(Object.fromEntries(data.entries()));
  return redirect("/");
};

export function Newnote() {
  const navigate = useNavigate();
  const options = dropOptions.map((option) => (
    <Form.FormOption key={option.id} name={option.name} id={option.id} />
  ));

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
          name="description"
          placeholder="Description..."
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
        >
          {options}
        </Form.FormSelect>
      </Form.Form>
    </section>
  );
}
