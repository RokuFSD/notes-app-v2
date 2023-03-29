import React from "react";
import { Form } from "react-router-dom";

function DeleteButton() {
  return (
    <Form
      method="post"
      action="destroy"
    >
      <button type="submit">Delete</button>
    </Form>
  );
}

export default DeleteButton;