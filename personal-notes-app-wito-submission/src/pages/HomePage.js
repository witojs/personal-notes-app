import React from "react";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import NoteList from "../components/4NoteList";
import SearchBar from "../components/5SearchBar";
import { getActiveNotes } from "../utils/network-data";

function HomePage() {
  const [notes, setNotes] = React.useState([]);
  const [keyword, setKeyword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    getActiveNotes().then(({ data }) => {
      setNotes(data);
      setIsLoading(false);
    });
  }, [notes.length]);

  function onKeywordChangeHandler(keyword) {
    setKeyword(keyword);
  }

  const searchedNote = notes.filter((item) => {
    return item.title.toLowerCase().includes(keyword.toLowerCase());
  });

  if (isLoading === true) {
    return (
      <section className="homepage">
        <h2>Catatan Aktif</h2>
        <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
        <p className="notes-list__empty">Memuat Catatan</p>
        <div className="homepage__action">
          <Link to="/notes/new">
            <button className="action" title="tambah" type="button">
              <FiPlus />
            </button>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="homepage">
      <h2>Catatan Aktif</h2>
      <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
      {searchedNote.length > 0 ? (
        <NoteList notes={searchedNote} />
      ) : (
        <section className="notes-list-empty">
          <p className="notes-list__empty">Tidak ada Catatan</p>
        </section>
      )}
      <div className="homepage__action">
        <Link to="/notes/new">
          <button className="action" title="tambah" type="button">
            <FiPlus />
          </button>
        </Link>
      </div>
    </section>
  );
}

export default HomePage;
