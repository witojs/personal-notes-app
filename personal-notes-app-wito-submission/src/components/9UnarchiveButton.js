import React from "react";
import { FiUpload } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function UnArchiveButton({ id, onUnArchive }) {
  const navigate = useNavigate();
  return (
    <button
      className="action"
      title="Pindahkan"
      onClick={() => {
        onUnArchive(id);
        navigate("/");
      }}
    >
      <FiUpload />
    </button>
  );
}

UnArchiveButton.propTypes = {
  id: PropTypes.string,
  onUnArchive: PropTypes.func.isRequired,
};

export default UnArchiveButton;
