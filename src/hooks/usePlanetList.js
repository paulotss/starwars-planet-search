import { useState, useEffect } from 'react';

const usePlanetList = () => {
  const [planetList, setPlanetList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [filterPlanet, setFilterPlanet] = useState([]);
  const [search, setSearch] = useState({
    filterByName: {
      name: '',
    },
  });
  useEffect(() => {
    const getPlanetList = async () => {
      setLoading(true);
      const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const planets = await fetch(endpoint).then((response) => response.json());
      planets.results.forEach((planet) => delete planet.residents);
      setPlanetList(planets.results);
      setFilterPlanet(planets.results);
      setLoading(false);
      console.log(planets.results);
    };
    getPlanetList();
  }, []);

  useEffect(() => {
    const filterPlanetList = () => {
      const filterList = planetList.filter((planet) => (
        planet.name.match(new RegExp(search.filterByName.name, 'i'))
      ));
      setFilterPlanet(filterList);
    };
    filterPlanetList();
  }, [search, planetList]);
  return [isLoading, search, setSearch, filterPlanet];
};

export default usePlanetList;
