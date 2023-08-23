import React from "react";
import NoteList from "../components/4NoteList";
import SearchBar from "../components/5SearchBar";
import { getArchivedNotes } from "../utils/network-data";

function ArchivePage() {
  const [notes, setNotes] = React.useState([]);
  const [keyword, setKeyword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    getArchivedNotes().then(({ data }) => {
      setNotes(data);
      setIsLoading(false);
    });
  }, []);

  function onKeywordChangeHandler(keyword) {
    setKeyword(keyword);
  }

  const searchedNote = notes.filter((item) => {
    return item.title.toLowerCase().includes(keyword.toLowerCase());
  });

  if (isLoading === true) {
    return (
      <section className="archives-page">
        <h2>Catatan Arsip</h2>
        <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
        <p className="notes-list__empty">Memuat Catatan...</p>
      </section>
    );
  }

  return (
    <section className="archives-page">
      <h2>Catatan Arsip</h2>
      <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
      {searchedNote.length > 0 ? (
        <NoteList notes={searchedNote} />
      ) : (
        <section className="notes-list-empty">
          <p className="notes-list__empty">Tidak ada Catatan</p>
        </section>
      )}
    </section>
  );
}

export default ArchivePage;
