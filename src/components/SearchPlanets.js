import React, { useContext } from 'react';
import MainContext from '../context/MainContext';

const SearchPlanets = () => {
  const { search, setSearch } = useContext(MainContext);

  const handleChange = ({ target: { value } }) => {
    setSearch({
      filterByName: {
        name: value,
      },
    });
  };

  return (
    <header>
      <input
        type="text"
        value={ search.filterByName.name }
        onChange={ handleChange }
        data-testid="name-filter"
      />
    </header>
  );
};

export default SearchPlanets;
