import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import NoteFooter from '../NoteFooter/NoteFooter';
import './note.css';

function Note({onNotesChange, id, title, body}) {
  const [open, setOpen] = useState(false);

  const handleEdit = () => {
    setOpen(true);
    console.log('note is open');
  }

  const handleDelete = async () => {
    console.log(`deleting note with title ${title}`);
    const response = await fetch(`http://note.dev.cloud.lightform.com/notes/${id}`, {
      method: 'DELETE'
    });

    console.log(response);

    onNotesChange(id);
  }

  const editor = <div className="editor">
    <div className="close">x</div>
    {/* <form>
      <label>
        <div className="createNoteLabel">Title</div>
        <textarea
          label="Title"
          value={title}
          className="titleInput"
        >
        </textarea>
      </label>
      <label>
        <div className="createNoteLabel">Body</div>
        <textarea
          label="Body"
          value={body}
          className="bodyInput"
          // on submit, set body of parent
        >
        </textarea>
      </label>
      <button type="submit">Create Your Note!</button>
    </form>; */}
  </div>;

  return (
    <div className="note">
      <div>
        <div className="noteText" onClick={handleEdit}>
          <p className="title">{title}</p>
          <div className="body">{body}</div>
        </div>
        <div className="noteFooter">
          <div className="delete" onClick={handleDelete}>
            delete
          </div>
        </div>
      </div>
      {open ? editor : ''}
    </div>
  );
}

export default Note;
