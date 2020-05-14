import React, { useState } from 'react';
import './CreateNote.css';

function CreateNote( {history} ) {
  const [titleText, setTitleText] = useState('');
  const [bodyText, setBodyText] = useState('');

  const handleSubmit = function(e) {
    e.preventDefault();

    fetch('http://note.dev.cloud.lightform.com/notes', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: titleText,
        body: bodyText
      })
    }).then(async (response) => {
        console.log('Success: ', await response.json());
        // history.push('/notes');
      }).catch((error) => {
        console.log('Error: ', error);
      })
    };

  return (
    <div className="CreateNote">
      <form onSubmit={handleSubmit}>
        <label>
          <div className="createNoteLabel">Title</div>
          <textarea 
            label="Title"
            className="titleInput"
            onChange={e => setTitleText(e.target.value)}
          >
          </textarea>
        </label>
        <label>
          <div className="createNoteLabel">Body</div>
          <textarea 
            label="Body"
            className="bodyInput"
            onChange={e => setBodyText(e.target.value)}
          >
          </textarea>
        </label>
        <button type="submit">Create Your Note!</button>
      </form>
    </div>
  );
}

export default CreateNote;
