import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Note from '../../Components/Note/Note';
import './ViewNotes.css';

function ViewNotes() {
  const itemsPerPage = 10;
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [notes, setNotes] = useState([]);

  const getNotesForPage = async function(pageNumber) {
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

  // Upon initial loading, show the last page of notes
  // Issue: It calculates how many pagination buttons to show
  // but doesn't display data
  useEffect(() => {
    debugger;
    console.log('calling');
    // debugger;
    getNotesForPage(5);
    // console.log('notes!!', notes);
    // let listOfNotes = notes.map(note => {
      // return <Note key={note.id} id={note.id} title={note.title} body={note.body} />;
    // });
  }, []);

  const listOfNotes = notes.map(note => {
    return <Note key={note.id} id={note.id} title={note.title} body={note.body} />;
  });
  // console.log('b: ', notes);

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


  // complete logic for conditional rendering

  return (
    <div className="viewNotes">
      {/* <div>below</div>
      <Router>
        <Link to="/test">test</Link>
        <Route path="/test">
          <p>Stuff that gets rendered</p>
        </Route>
      </Router>
      <div>above</div> */}

      {listOfNotes}
      {console.log('list of notes', listOfNotes)}
      hi
      <div className="pagination">
        <span>&laquo;</span>      
        {renderPageNumbers}
        <span>&raquo;</span> 
      </div>
    </div>
  );
}

export default ViewNotes;

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

  // const listOfNotes = notes.map(note => {
  //   return <Note key={note.id} id={note.id} title={note.title} body={note.body} />;
  // });

  // return (
  //   <div className="viewNotes">
  //     {listOfNotes}
  //   </div>
  // );
