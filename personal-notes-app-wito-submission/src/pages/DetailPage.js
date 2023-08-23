import React from "react";
import NoteDetail from "../components/6NoteDetail";
import { useParams } from "react-router-dom";
import {
  archiveNote,
  deleteNote,
  getNote,
  unarchiveNote,
} from "../utils/network-data";

function DetailPageWrapper() {
  const { id } = useParams();
  const [notes, setNotes] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    getNote(id).then(({ data }) => {
      setNotes(data);
      setIsLoading(false);
    });
  }, [id]);

  async function onDeleteHandler(id) {
    await deleteNote(id);
  }

  async function onArchiveHandler(id) {
    await archiveNote(id);
  }

  async function onUnarchiveHandler(id) {
    await unarchiveNote(id);
  }

  if (isLoading === true) {
    return <p>Memuat Data...</p>;
  }

  if (notes !== null) {
    return (
      <NoteDetail
        {...notes}
        onDelete={onDeleteHandler}
        onArchive={onArchiveHandler}
        onUnArchive={onUnarchiveHandler}
      />
    );
  } else {
    return <h1>404 Page Not Found</h1>;
  }
}

export default DetailPageWrapper;
