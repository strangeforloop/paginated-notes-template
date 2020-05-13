import React, { useState, useEffect } from 'react';
import Note from '../../Components/Note/Note';

function ViewNotes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const getNotes = async () => {
      const response = await fetch('http://note.dev.cloud.lightform.com/notes', {
        method: 'GET'
      });
      console.log(response);

      const data = await response.json();
      const notesArray = await data._embedded.notes;
      setNotes(notesArray);
      console.log('data', data._embedded.notes);
    }

    getNotes();
  }, []);

  const listOfNotes = notes.map(note => {
    return <Note key={note.id} title={note.title} body={note.body}/>;
  });

  return (
    <div className="ViewNotes">
      {listOfNotes}
    </div>
  );
}

export default ViewNotes;
