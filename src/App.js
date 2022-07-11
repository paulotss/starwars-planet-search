import React from 'react';
import './App.css';
import TablePlanets from './components/TablePlanets';
import ComContext from './context/ComContext';

function App() {
  return (
    <ComContext>
      <TablePlanets />
    </ComContext>
  );
}

export default App;
