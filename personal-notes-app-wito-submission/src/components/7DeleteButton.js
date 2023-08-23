import React from "react";
import { FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function DeleteButton({ id, onDelete }) {
  const navigate = useNavigate();
  return (
    <button
      className="action"
      title="hapus"
      onClick={() => {
        onDelete(id);
        navigate("/");
      }}
    >
      <FiTrash2 />
    </button>
  );
}

DeleteButton.propTypes = {
  id: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteButton;
