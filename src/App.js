import React from 'react';
import ViewNotes from './Pages/ViewNotes/ViewNotes';
import Nav from './Components/Nav/Nav';
import CreateNote from './Pages/CreateNote/CreateNote';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import './App.css';

function App() {
  return (
    // <Router>
    //   <div className="App">
    //     <div className="navigationBar">
    //       <div className="container">
    //         <div className="navigationLinks">
    //           <Link className="navLink" to="/">HOME</Link>
    //           <Link className="navLink" to="/notes">View Notes</Link>
    //         </div>
    //       </div>
    //     </div>
    //     <main>
    //       <Switch>
    //         <Route path="/notes">
    //           <ViewNotes />
    //         </Route>
    //         <Route path="/" component={CreateNote} />
    //           {/* <CreateNote />
    //         </Route> */}
    //       </Switch>
    //     </main> 
    //   </div>
    // </Router>
    <div className="app">
      <Nav />
      <main>
        <CreateNote />
        {/* if there are notes, display notes. If no notes, display no notes */}
        <ViewNotes />
      </main>
    </div>
  );
}

export default App;
