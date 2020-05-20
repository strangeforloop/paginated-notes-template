import React, { useState } from 'react';
import NoteFooter from '../NoteFooter/NoteFooter';
import './note.css';

function Note({onNotesChange, id, title, body}) {
  const [open, setOpen] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editBody, setEditBody] = useState(body);

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

  const handleUpdate = async () => {
    await fetch(`http://note.dev.cloud.lightform.com/notes/${id}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: editTitle,
        body: editBody
      })
    });
  }

  const editor = <div to={`/notes=${id}`} className="editor">
    <div className="close">x</div>
    <form onSubmit={handleUpdate}>
      <label>
        <div className="createNoteLabel">Title</div>
        <textarea
          label="Title"
          value={editTitle}
          onChange={(e) => {setEditTitle(e.target.value)}}
          className="titleInput"
        >
        </textarea>
      </label>
      <label>
        <div className="createNoteLabel">Body</div>
        <textarea
          label="Body"
          value={editBody}
          onChange={(e) => setEditBody(e.target.value)}
          className="bodyInput"
        >
        </textarea>
      </label>
      <button type="submit">Update</button>
    </form>
  </div>;

  return (
    <div className="note">
      <div>
        <div className="noteText" onClick={handleEdit}>
          <p className="title">{title}</p>
          <div className="body">{body}</div>
        </div>
        <div className="noteFooter">
          <button className="delete" onClick={handleDelete}>
            delete
          </button>
        </div>
      </div>
        {open ? editor : ''}
    </div>
  );
}

export default Note;
