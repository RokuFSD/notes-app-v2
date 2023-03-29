import React, { memo } from "react";
import { Form } from "react-router-dom";
import * as CIcon from "@coreui/icons-react";
import { cilTrash } from "@coreui/icons";

type DeleteButtonProps = {
  className: string
}

const DeleteIcon = memo(CIcon.default);

function DeleteButton({ className }: DeleteButtonProps) {
  return (
    <Form
      method="post"
      action="destroy"
      className={className}>
      <button type="submit">
        <DeleteIcon icon={cilTrash} className="w-6 h-6 text-red-600 dark:text-red-400" />
      </button>
    </Form>
  );
}

export default DeleteButton;