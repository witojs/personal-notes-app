import React from "react";
import { showFormattedDate } from "../utils";
import DeleteButton from "./7DeleteButton";
import ArchiveButton from "./8ArchiveButton";
import UnArchiveButton from "./9UnarchiveButton";
import PropTypes from "prop-types";

function NoteDetail({
  id,
  title,
  createdAt,
  body,
  archived,
  onDelete,
  onUnArchive,
  onArchive,
}) {
  return (
    <section className="detail-page">
      <h3 className="detail-page__title">{title}</h3>
      <p className="detail-page__createdAt">{showFormattedDate(createdAt)}</p>
      <div className="detail-page__body">{body}</div>
      <div className="detail-page__action">
        {archived ? (
          <UnArchiveButton id={id} onUnArchive={onUnArchive} />
        ) : (
          <ArchiveButton id={id} onArchive={onArchive} />
        )}
        <DeleteButton id={id} onDelete={onDelete} />
      </div>
    </section>
  );
}

NoteDetail.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  createdAt: PropTypes.string,
  body: PropTypes.string,
  archived: PropTypes.bool,
  onDelete: PropTypes.func.isRequired,
  onUnArchive: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
};

export default NoteDetail;
