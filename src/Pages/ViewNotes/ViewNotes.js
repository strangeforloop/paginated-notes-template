import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Note from '../../Components/Note/Note';
import CreateNote from '../CreateNote/CreateNote';
import './ViewNotes.css';

function ViewNotes() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [wasChanged, setWasChanged] = useState(false);
  const [initialTotal, setInitialTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotesForPage(currentPage);
  }, [wasChanged, currentPage]);

  const getNotesForPage = async function (pageNumber) {
    await fetch(`http://note.dev.cloud.lightform.com/notes?page=${pageNumber}`, {
      method: 'GET'
    }).then(response => response.json()).then((data) => {
      setTotal(data.total);
      setCurrentPage(pageNumber);
      let notesArray = data._embedded.notes;
      notesArray = notesArray.sort((a, b) => b.id - a.id);
      setNotes(notesArray);
    });
  }

  useEffect(() => {
    getNotesForPage(Math.ceil(initialTotal/itemsPerPage));
  }, [initialTotal]);


  useEffect(() => {
    getInitialTotal();
  }, []);
  
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

  const handleDeleteNote = (id) => {
    setWasChanged(!wasChanged);
  }
  
  const handleAddNote = () => {
    setWasChanged(!wasChanged);
    setCurrentPage(Math.ceil((total + 1)/itemsPerPage));
  }

  const handleUpdateNote = () => {}

  console.log('------------calculating listOfNotes');
  console.dir(notes);
  let listOfNotes = notes.map(note => {
    return <Note onNotesChange={handleDeleteNote} key={note.id} id={note.id} title={note.title} body={note.body} />;
  });

  // Calculate Page Numbers
  const pageNumbers = [];
  const numberOfPages = Math.ceil(total / itemsPerPage);

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
            {/* {listOfNotes} */}
            {
            notes.map(note => {
              return <Note onNotesChange={handleDeleteNote} onClick={handleUpdateNote} key={note.id} id={note.id} title={note.title} body={note.body} />;
            })
            }
          </div>
          <div className="pagination">
            <span>&laquo;</span>      
            {
              pageNumbers.map(number => {
                let classes = currentPage === number ? 'active' : '';

                return (
                  <Link to={`/page=${number}`}>
                    {/* <span key={number} className={classes} onClick={() => getNotesForPage(number)}>{number} */}
                    <span key={number} className={classes} onClick={() => setCurrentPage(number)}>{number}
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