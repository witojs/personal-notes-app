import React from "react";
import { FiDownload } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function ArchiveButton({ id, onArchive }) {
  const navigate = useNavigate();
  return (
    <button
      className="action"
      title="Arsipkan"
      onClick={() => {
        onArchive(id);
        navigate("/");
      }}
    >
      <FiDownload />
    </button>
  );
}

ArchiveButton.propTypes = {
  id: PropTypes.string,
  onArchive: PropTypes.func.isRequired,
};

export default ArchiveButton;
