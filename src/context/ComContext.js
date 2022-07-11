import React from 'react';
import PropTypes from 'prop-types';
import MainContext from './MainContext';
import usePlanetList from '../hooks/usePlanetList';

const ComContext = ({ children }) => {
  const [planetList, isLoading] = usePlanetList();
  const context = {
    planetList,
    isLoading,
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
