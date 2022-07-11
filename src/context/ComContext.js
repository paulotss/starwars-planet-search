import React from 'react';
import PropTypes from 'prop-types';
import MainContext from './MainContext';
import usePlanetList from '../hooks/usePlanetList';

const ComContext = ({ children }) => {
  const [isLoading, search, setSearch, filterPlanet] = usePlanetList('teste');

  const context = {
    isLoading,
    search,
    setSearch,
    filterPlanet,
  };

  return (
    <MainContext.Provider value={ context }>
      { children }
    </MainContext.Provider>
  );
};

ComContext.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};

export default ComContext;
