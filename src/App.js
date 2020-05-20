import React from 'react';
import ViewNotes from './Pages/ViewNotes/ViewNotes';
import Nav from './Components/Nav/Nav';
// import CreateNote from './Pages/CreateNote/CreateNote';
import './App.css';

function App() {
  return (
    <div className="app">
      <Nav />
      <main>
        <ViewNotes />
      </main>
    </div>
  );
}

export default App;
