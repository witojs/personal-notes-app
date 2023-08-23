import React from "react";
import { FiCheck } from "react-icons/fi";
import PropTypes from "prop-types";

class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
    };

    this.onTitleChangeHandler = this.onTitleChangeHandler.bind(this);
    this.onBodyChangeHandler = this.onBodyChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onTitleChangeHandler(e) {
    this.setState(() => {
      return {
        title: e.target.value,
      };
    });
  }

  onBodyChangeHandler(e) {
    this.setState(() => {
      return {
        body: e.target.value,
      };
    });
  }

  onSubmitHandler(e) {
    e.preventDefault();
    this.props.addNote(this.state);
  }

  render() {
    return (
      <section className="add-new-page">
        <form className="add-new-page__input" onSubmit={this.onSubmitHandler}>
          <input
            type="text"
            placeholder="Masukan Judul..."
            className="add-new-page__input__title"
            value={this.state.title}
            onChange={this.onTitleChangeHandler}
            required
          />
          <textarea
            className="add-new-page__input__body"
            placeholder="Masukan isi Catatan..."
            value={this.state.body}
            onChange={this.onBodyChangeHandler}
          ></textarea>
          <div className="add-new-page__action">
            <button className="action" type="submit" title="Simpan">
              <FiCheck />
            </button>
          </div>
        </form>
      </section>
    );
  }
}

NoteInput.propTypes = {
  addNote: PropTypes.func.isRequired,
};

export default NoteInput;
