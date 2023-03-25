import React from "react";
import * as Form from "../../../components/Form";
import { ActionFunction, redirect, useNavigate } from "react-router-dom";

const initialValues = {
  title: "",
};

export const action: ActionFunction = async ({ request }) => {
  const data = await request.formData();
  console.log(Object.fromEntries(data.entries()));
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
        className="w-full h-min-content grid grid-cols-1 grid-rows-6 border border-slate-700 rounded-2xl overflow-hidden"
      >
        <Form.FormInput
          name="title"
          type="text"
          placeholder="Title..."
          required
          className="row-start-1 row-span-full font-fm text-2xl p-2 bg-transparent font-semibold"
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
      </Form.Form>
    </section>
  );
}
