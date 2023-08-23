import React from "react";
import NoteInput from "../components/2NoteInput";
import { useNavigate } from "react-router-dom";
import { addNote } from "../utils/network-data";

function AddPage() {
  const navigate = useNavigate();
  async function onAddNoteHandler(note) {
    await addNote(note);
    navigate("/");
  }

  return (
    <main>
      <NoteInput addNote={onAddNoteHandler} />
    </main>
  );
}

export default AddPage;
