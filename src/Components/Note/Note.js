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

  return (
    <div className="note" onClick={handleEdit}>
      <div className="noteText">
        <p className="title">{title}</p>
        <div className="body">{body}</div>
      </div>
      <div className="noteFooter">
        <div className="delete" onClick={handleDelete}>
          delete
        </div>
      </div>
    </div>
  );
}

export default Note;
