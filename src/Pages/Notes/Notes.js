import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Note from '../../Components/Note/Note';
import queryString from 'query-string';
// import Pagination from 'rc-pagination';

// import CreateNote from '../CreateNote/CreateNote';
import './Notes.css';

import { getNotes } from '../../api';

function Notes({ match, location }) {
  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [previousPage, setPreviousPage] = useState(1);
  const [nextPage, setNextPage] = useState(1);

  useEffect(() => {
    console.log('notes were updated', notes);
  }, [notes]);

  useEffect(() => {
    console.log('NEXTTT page: ', nextPage);
  }, [nextPage]);

  useEffect(() => {
    console.log('PREVIOUS page: ', previousPage);
  }, [previousPage]);

  useEffect(() => {
    const getPageNotes = async () => {
      await getNotes(currentPage).then(response => response.json()).then((data) => {
        setNotes(data._embedded.notes);

        let re = /\?page=(.*)/;
        let pageAsString = data.links.next ? data.links.next.match(re)[1] : null;
        setNextPage(Number(pageAsString));

        console.log('current page: ', currentPage, 'prev info: ', data.links.prev);
        pageAsString = data.links.prev ? data.links.prev.match(re)[1] : null;
        setPreviousPage(Number(pageAsString));
      }).catch(e => {
        console.log(e);
      })
    }

    getPageNotes();
  }, [currentPage]);

  // let query = queryString.parse(location.search);
  // let params = new URLSearchParams(query);
  // let q = parseInt(params.get("q"));
  // { console.log('match:', match) }
  // { console.log('location:', location) }
  // { console.log(queryString.parse(location.search)) }

  let previousPaginationControl = previousPage ? (<Link to={`/notes?page=${previousPage}`}>
    <span onClick={() => setCurrentPage(previousPage)}>&laquo; prev</span>
</Link>) : '';

  let nextPaginationControl = nextPage ? (<Link to={`/notes?page=${nextPage}`}>
    {console.log('going to ', nextPage)}
    <span onClick={() => setCurrentPage(nextPage)}>next &raquo;</span>
</Link>) : '';

  return(
    <div>
      {previousPaginationControl}
      {nextPaginationControl}

      {notes.map(note => {
        return <Link to={`${note.id}`}><Note key={note.id} id={note.id} title={note.title} body={note.body} /></Link>
      })}

      {previousPaginationControl}
      {nextPaginationControl}
    </div>
  );
}

export default Notes;


// const getNotesForPage = async function (pageNumber) {
//   await fetch(`http://note.dev.cloud.lightform.com/notes?page=${pageNumber}`, {
//     method: 'GET'
//   }).then(response => response.json()).then((data) => {
//     setTotal(data.total);
//     setCurrentPage(pageNumber);
//     let notesArray = data._embedded.notes;
//     notesArray = notesArray.sort((a, b) => b.id - a.id);
//     setNotes(notesArray);
//   });
// }

// useEffect(() => {
//   getNotesForPage(Math.ceil(initialTotal / itemsPerPage));
// }, [initialTotal]);


// useEffect(() => {
//   getInitialTotal();
// }, []);

// const getInitialTotal = async function () {
//   // have to make an initial request to the first page
//   // in order to get the total so we can calculate last page
//   const response = await fetch(`http://note.dev.cloud.lightform.com/notes?page=1`, {
//     method: 'GET'
//   });
//   console.log(response);

//   const data = await response.json();
//   console.log(data);

//   setInitialTotal(data.total);
// }

// const handleDeleteNote = (id) => {
//   setWasChanged(!wasChanged);
// }

// const handleAddNote = () => {
//   setWasChanged(!wasChanged);
//   setCurrentPage(Math.ceil((total + 1) / itemsPerPage));
// }

// const handleUpdateNote = () => { }

// // console.log('------------calculating listOfNotes');
// // console.dir(notes);
// // let listOfNotes = notes.map(note => {
// //   return <Note onNotesChange={handleDeleteNote} key={note.id} id={note.id} title={note.title} body={note.body} />;
// // });

// // Calculate Page Numbers
// const pageNumbers = [];
// const numberOfPages = Math.ceil(total / itemsPerPage);

// for (let i = numberOfPages; i >= 1; i--) {
//   pageNumbers.push(i);
// }

// // Pagination Elements
// // const renderPageNumbers = pageNumbers.map(number => {
// //   let classes = currentPage === number ? 'active' : '';

// //   return (
// //     <span key={number} className={classes} onClick={() => getNotesForPage(number)}>{number}</span>
// //   );    
// // });

// return (
//   <div className="content">
//     <CreateNote onNotesChange={handleAddNote} />
//     <Router>
//       <div className="viewNotes">
//         {/* {listOfNotes} */}
//         {
//           notes.map(note => {
//             return <Note onNotesChange={handleDeleteNote} onClick={handleUpdateNote} key={note.id} id={note.id} title={note.title} body={note.body} />;
//           })
//         }
//       </div>
//       <div className="pagination">
//         <span>&laquo;</span>
//         {
//           pageNumbers.map(number => {
//             let classes = currentPage === number ? 'active' : '';

//             return (
//               <Link to={`/page=${number}`}>
//                 {/* <span key={number} className={classes} onClick={() => getNotesForPage(number)}>{number} */}
//                 <span key={number} className={classes} onClick={() => setCurrentPage(number)}>{number}
//                 </span>
//               </Link>
//             );
//           })
//         }
//         <span>&raquo;</span>
//       </div>
//     </Router>
//   </div>
// );