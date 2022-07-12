import { useState, useEffect } from 'react';

const usePlanetList = () => {
  const [planetList, setPlanetList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [filterPlanet, setFilterPlanet] = useState([]);
  const [search, setSearch] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
  });
  useEffect(() => {
    const getPlanetList = async () => {
      setLoading(true);
      const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const planets = await fetch(endpoint).then((response) => response.json());
      planets.results.forEach((planet) => delete planet.residents);

      // https://stackoverflow.com/questions/6712034/sort-array-by-firstname-alphabetically-in-javascript
      planets.results.sort((a, b) => a.name.localeCompare(b.name));
      setPlanetList(planets.results);
      setFilterPlanet(planets.results);
      setLoading(false);
    };
    getPlanetList();
  }, []);

  useEffect(() => {
    const filterPlanetList = () => {
      const searchName = new RegExp(search.filterByName.name, 'i');
      let filterList = planetList.filter((planet) => (
        planet.name.match(searchName)
      ));
      search.filterByNumericValues.forEach((term) => {
        filterList = filterList.filter((planet) => {
          switch (term.comparison) {
          case 'maior que':
            return Number(planet[term.column]) > Number(term.value);
          case 'menor que':
            return Number(planet[term.column]) < Number(term.value);
          default:
            return Number(planet[term.column]) === Number(term.value);
          }
        });
      });
      setFilterPlanet(filterList);
    };
    filterPlanetList();
  }, [search, planetList]);
  return [planetList, isLoading, search, setSearch, filterPlanet, setFilterPlanet];
};

export default usePlanetList;
