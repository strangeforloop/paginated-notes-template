import React from 'react';
import './note.css';

function Note({title, body}) {
  return (
    <div className="note">
      <p className="title">{title}</p>
      <div className="body">{body}</div>
    </div>
  );
}

export default Note;
