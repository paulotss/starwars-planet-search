import React from 'react';
import PropTypes from 'prop-types';
import MainContext from './MainContext';
import usePlanetList from '../hooks/usePlanetList';

const ComContext = ({ children }) => {
  const [
    planetList,
    isLoading,
    search,
    setSearch,
    filterPlanet,
    setFilterPlanet,
  ] = usePlanetList();

  const valNumber = (number, value) => {
    const result = number === 'unknown' ? value : number;
    return Number(result);
  };

  const handleOrder = (column, order) => {
    filterPlanet.sort((a, b) => {
      const MAX = 1000000000001;
      const MIN = -1;
      if (order === 'ASC') {
        return valNumber(a[column], MAX) - valNumber(b[column], MAX);
      }
      return valNumber(b[column], MIN) - valNumber(a[column], MIN);
    });
    setFilterPlanet([...filterPlanet]);
  };

  const context = {
    isLoading,
    search,
    setSearch,
    filterPlanet,
    planetList,
    setFilterPlanet,
    handleOrder,
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
