import React, { useContext, useState } from 'react';
import MainContext from '../context/MainContext';

const SearchPlanets = () => {
  const { search, setSearch, handleOrder } = useContext(MainContext);
  const [form, setForm] = useState({
    name: '',
    column: 'population',
    comparison: 'maior que',
    number: 0,
    orderColumn: 'population',
    orderSort: 'ASC',
    itemsColumn: [
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ],
  });

  const handleChange = ({ target: { value, name } }) => {
    setForm((state) => ({
      ...state,
      [name]: value,
    }));
    if (name === 'name') {
      setSearch((state) => ({
        ...state,
        filterByName: {
          name: value,
        },
      }));
    }
  };

  const handleFilter = () => {
    setSearch((state) => (
      {
        ...state,
        filterByNumericValues: [...state.filterByNumericValues,
          {
            column: form.column,
            comparison: form.comparison,
            value: form.number,
          }],
      }
    ));
    setForm((state) => ({
      ...state,
      column: state.itemsColumn.find((item) => item !== form.column),
      itemsColumn: state.itemsColumn.filter((item) => item !== form.column),
    }));
  };

  const handleDeleteFilter = ({ target: { name } }) => {
    setSearch((state) => ({
      ...state,
      filterByNumericValues: state.filterByNumericValues.filter((item) => (
        item.column !== name)),
    }));
    setForm((state) => ({
      ...state,
      itemsColumn: [...state.itemsColumn, name],
    }));
  };

  const handleDeleteAllFilters = () => {
    setSearch((state) => ({
      ...state,
      filterByNumericValues: [],
    }));
    setForm((state) => ({
      ...state,
      itemsColumn: [
        'population',
        'orbital_period',
        'diameter',
        'rotation_period',
        'surface_water',
      ],
    }));
  };

  return (
    <header>
      <input
        type="text"
        name="name"
        value={ form.name }
        onChange={ handleChange }
        data-testid="name-filter"
        placeholder="Busca"
      />
      <select
        value={ form.column }
        onChange={ handleChange }
        name="column"
        data-testid="column-filter"
      >
        {
          form.itemsColumn.map((item) => (
            <option value={ item } key={ item }>{ item }</option>
          ))
        }
      </select>
      <select
        value={ form.comparison }
        onChange={ handleChange }
        name="comparison"
        data-testid="comparison-filter"
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <input
        type="number"
        name="number"
        value={ form.number }
        onChange={ handleChange }
        data-testid="value-filter"
        placeholder="Busca"
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleFilter }
      >
        Filtrar
      </button>
      <button
        type="button"
        onClick={ handleDeleteAllFilters }
        data-testid="button-remove-filters"
      >
        Remover filtros
      </button>
      <select name="orderColumn" data-testid="column-sort" onChange={ handleChange }>
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>
      <label htmlFor="order_asc">
        Ascendente
        <input
          data-testid="column-sort-input-asc"
          type="radio"
          name="orderSort"
          id="order_asc"
          value="ASC"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="order_desc">
        Descendente
        <input
          data-testid="column-sort-input-desc"
          type="radio"
          name="orderSort"
          id="order_desc"
          value="DESC"
          onChange={ handleChange }
        />
      </label>
      <button
        type="button"
        onClick={ () => { handleOrder(form.orderColumn, form.orderSort); } }
        data-testid="column-sort-button"
      >
        Ordenar
      </button>
      <div>
        {
          search.filterByNumericValues.map((item, index) => (
            <p data-testid="filter" key={ index }>
              {`${item.column} ${item.comparison} ${item.value}`}
              <button
                name={ item.column }
                type="button"
                onClick={ handleDeleteFilter }
              >
                Excluir
              </button>
            </p>
          ))
        }
      </div>
    </header>
  );
};

export default SearchPlanets;
