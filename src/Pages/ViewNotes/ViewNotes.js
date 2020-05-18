import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Note from '../../Components/Note/Note';
import CreateNote from '../CreateNote/CreateNote';
import './ViewNotes.css';

function ViewNotes() {
  const itemsPerPage = 10;
  const [initialTotal, setInitialTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [notes, setNotes] = useState([]);
  const [noteToChange, setNoteToChange] = useState(50);

  const getNotesForPage = async function (pageNumber) {
    console.log('notes inside getNotesForPage', notes);
    const response = await fetch(`http://note.dev.cloud.lightform.com/notes?page=${pageNumber}`, {
      method: 'GET'
    });
    console.log(response);
    
    const data = await response.json();
    console.log(data);
    
    setTotal(data.total);
    setCurrentPage(pageNumber);
    
    let notesArray = await data._embedded.notes;
    notesArray = notesArray.sort((a, b) => b.id - a.id);
    setNotes(notesArray);
    console.log(notesArray);
  }

  useEffect(() => {
    getNotesForPage(Math.ceil(initialTotal/itemsPerPage));
  }, [initialTotal]);

  const getInitialTotal = async function () {
    // have to make an initial request to the first page
    // in order to get the total so we can calculate last page
    const response = await fetch(`http://note.dev.cloud.lightform.com/notes?page=1`, {
      method: 'GET'
    });
    console.log(response);

    const data = await response.json();
    console.log(data);

    setInitialTotal(data.total);
  }

  useEffect(() => {
    console.log('calling');
    getInitialTotal();
  }, []);

  useEffect(() => {
    console.log('TOTAL WAS UPDATED');
  }, [total]);

  const handleNotesChange = (id) => {
    console.log('changing a note');
    setNoteToChange(id);

    for (var i = notes.length - 1; i >= 0; --i) {
      if (notes[i].id === id) {
        notes.splice(i, 1);
      }
    }

    getNotesForPage(currentPage);
  }
  
  const handleAddNote = () => {
    const helperTotal = total + 1;
    const lastPage = Math.ceil(helperTotal / itemsPerPage);
    // setCurrentPage(lastPage);
    // getNotesForPage(lastPage);
  }

  useEffect(() => {
    console.log('--- the notes were updated.');
    console.log('notes', notes);
  }, [notes]);

  console.log('------------calculating listOfNotes');
  let listOfNotes = notes.map(note => {
    return <Note onNotesChange={handleNotesChange} key={note.id} id={note.id} title={note.title} body={note.body} />;
  });
  console.log(listOfNotes);

  // Calculate Page Numbers
  const pageNumbers = [];
  const numberOfPages = Math.ceil(total / itemsPerPage);
  console.log('total', total);
  console.log('number of pages: ', numberOfPages);

  for (let i = numberOfPages; i >= 1; i--) {
    pageNumbers.push(i);
  }

  // Pagination Elements
  const renderPageNumbers = pageNumbers.map(number => {
    let classes = currentPage === number ? 'active' : '';

    return (
      <span key={number} className={classes} onClick={() => getNotesForPage(number)}>{number}</span>
    );    
  });

  return (
    <div className="content">
      <CreateNote onNotesChange={handleAddNote} />
        <Router>
          <div className="viewNotes">
            {listOfNotes}
          </div>
          {/* {console.log('list of notes', listOfNotes)} */}
          <div className="pagination">
            <span>&laquo;</span>      
            {
              pageNumbers.map(number => {
                let classes = currentPage === number ? 'active' : '';

                return (
                  <Link to={`/page=${number}`}>
                    <span key={number} className={classes} onClick={() => getNotesForPage(number)}>{number}
                    </span>
                  </Link>
                );
              })
            }
            <span>&raquo;</span> 
          </div>
        </Router>
    </div>
  );
}

export default ViewNotes;