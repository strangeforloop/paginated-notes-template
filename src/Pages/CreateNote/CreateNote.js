import React, { useState } from 'react';
import './CreateNote.css';

function CreateNote({onNotesChange}) {
  const [titleText, setTitleText] = useState('');
  const [bodyText, setBodyText] = useState('');
  const [isOpen, setIsOpen]= useState(false);

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
      }).catch((error) => {
        console.log('Error: ', error);
      })

      setIsOpen(!isOpen);
      onNotesChange();
    };

  const toggleView = () => {
    setIsOpen(!isOpen);
  }

  let closedView = <div className="closedView" onClick={toggleView}>
    <textarea defaultValue="" placeholder="Take a note"></textarea>
  </div>;

  let openView = <form onSubmit={handleSubmit}>
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
  </form>;

  return (
    <div className="CreateNote">
      {isOpen? openView : closedView}
    </div>
  );
}

export default CreateNote;
