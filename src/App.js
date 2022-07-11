import React from 'react';
import './App.css';
import SearchPlanets from './components/SearchPlanets';
import TablePlanets from './components/TablePlanets';
import ComContext from './context/ComContext';

function App() {
  return (
    <ComContext>
      <SearchPlanets />
      <TablePlanets />
    </ComContext>
  );
}

export default App;
