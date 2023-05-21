import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Welcome from './Welcome';
import NotFound from './NotFound';

import '../App.css';
import Dashboard from './Dashboard';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <main>
        <Routes>
          <Route path='/welcome' element={<Welcome />}/>
          <Route path='/' element={<Dashboard />}/>
          <Route />
          <Route path='*' element={<NotFound />}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;
