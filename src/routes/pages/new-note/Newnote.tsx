import React from "react";
import * as Form from "../../../components/Form";
import { ActionFunction, useNavigate } from "react-router-dom";

const initialValues = {
  title: "",
  description: "",
};

export const action: ActionFunction = async ({ request }) => {
  const data = await request.formData();
  console.log(data);
  return data;
};

export function Newnote() {
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  return (
    <section className="min-h-full relative">
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
        <div className="row-start-6 flex justify-around items-center absolute top-full w-full mt-2 h-14">
          <button className="w-1/2 h-full" onClick={() => goBack()}>
            Cancel
          </button>
          <Form.FormSubmit className="bg-lime-300 w-full h-full rounded-2xl border border-slate-700">
            Create
          </Form.FormSubmit>
        </div>
      </Form.Form>
    </section>
  );
}
