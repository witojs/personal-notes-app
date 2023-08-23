import React from "react";
import NoteItem from "./3NoteItem";
import PropTypes from "prop-types";

function NoteList({ notes }) {
  return (
    <section className="notes-list">
      {notes.map((note) => {
        return <NoteItem key={note.id.toString()} id={note.id} {...note} />;
      })}
    </section>
  );
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default NoteList;
