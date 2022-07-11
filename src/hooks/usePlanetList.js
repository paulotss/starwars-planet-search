import { useState, useEffect } from 'react';

const usePlanetList = () => {
  const [planetList, setPlanetList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    const getPlanetList = async () => {
      setLoading(true);
      const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const planets = await fetch(endpoint).then((response) => response.json());
      planets.results.forEach((planet) => delete planet.residents);
      setPlanetList(planets.results);
      setLoading(false);
      console.log(planets.results);
    };
    getPlanetList();
  }, []);
  return [planetList, isLoading];
};

export default usePlanetList;
