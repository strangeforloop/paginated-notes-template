import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Notes from './Pages/Notes/Notes';
import TestPage from './TestPage';
// import ViewNotes from './Pages/ViewNotes/ViewNotes';
// import Nav from './Components/Nav/Nav';
// import CreateNote from './Pages/CreateNote/CreateNote';
import './App.css';

function App() {
  return (
    <div className="app">
      {/* <Nav /> */}
      <main>
        {/* <ViewNotes /> */} 
        <Router>
          <Link to="/notes"><li>Notes</li></Link>
          <Link to="/test"><li>Test</li></Link>
          <Switch>
            <Route path="/" exact component={TestPage}/>
            <Route path="/notes" component={Notes}/>
      
          </Switch>
        </Router>
      </main>
    </div>
  );
}

export default App;
