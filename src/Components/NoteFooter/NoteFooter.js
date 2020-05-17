import React from 'react';
import './NoteFooter.css';

function NoteFooter({ id, title }) {
  const handleClick = async () => {
    console.log(`deleting note with title ${title}`);
    const response = await fetch(`http://note.dev.cloud.lightform.com/notes/${id}`, {
      method: 'DELETE'
    });

    console.log(response);
  }

  return (
    <div className="noteFooter">
      <div className="delete" onClick={handleClick}>
        delete
      </div>
    </div>
  );
}

export default NoteFooter;


  // useEffect(() => {
  //   const getNotes = async () => {
  //     const response = await fetch('http://note.dev.cloud.lightform.com/notes', {
  //       method: 'GET'
  //     });
  //     console.log(response);

  //     const data = await response.json();
  //     const notesArray = await data._embedded.notes;
  //     setNotes(notesArray);
  //     console.log('data', data._embedded.notes);
  //   }

  //   getNotes();
  // }, []);