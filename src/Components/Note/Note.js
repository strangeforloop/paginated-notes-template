import React, { useState, useEffect } from 'react';
import NoteFooter from '../NoteFooter/NoteFooter';
import './note.css';

function Note({id, title, body}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    console.log('note is open');
  }

  return (
    <div className="note" onClick={handleOpen}>
      <div className="noteText">
      <p className="title">{title}</p>
      <div className="body">{body}</div>
      </div>
      <NoteFooter id={id} title={title}/>
    </div>
  );
}

export default Note;
