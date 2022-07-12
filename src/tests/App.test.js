import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import data from './data';

describe('Testes da página App', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(data),
    });
  });

  test('Verifica se fetch foi chamado', async () => {
    render(<App />);
  
    await waitFor(() => {
      expect(fetch).toBeCalledWith('https://swapi-trybe.herokuapp.com/api/planets/');
      expect(fetch).toHaveBeenCalledTimes(1);

      const tablePlanet = screen.getByRole('table');
      const columns = tablePlanet.firstElementChild.firstElementChild.childElementCount;
      const rows = tablePlanet.lastChild.childElementCount;
      expect(tablePlanet).toBeInTheDocument();
      expect(columns).toBe(13);
      expect(rows).toBe(10);
    });
  });

  test('Verifica inputs do header', async () => {

    render(<App />);

    await waitFor(() => {
      const nameFilter = screen.getByTestId('name-filter');
      const columnFilter = screen.getByTestId('column-filter');
      const comparisonFilter = screen.getByTestId('comparison-filter');
      const valueFilter = screen.getByTestId('value-filter');
      const buttonFilter = screen.getByTestId('button-filter');

      expect(nameFilter).toBeInTheDocument();
      expect(columnFilter).toBeInTheDocument();
      expect(comparisonFilter).toBeInTheDocument();
      expect(valueFilter).toBeInTheDocument();
      expect(buttonFilter).toBeInTheDocument();
    });
  });

  test('Verifica busca pelo input name-filter', async () => {
    render(<App />);
    const nameFilter = screen.getByTestId('name-filter');
    userEvent.type(nameFilter, 'Kamino');

    await waitFor(() => {
      const tablePlanet = screen.getByRole('table');
      const rowsCount = tablePlanet.lastChild.childElementCount;
      const rowCheck = screen.getByText('Kamino');
      expect(rowsCount).toBe(1);
      expect(rowCheck).toBeInTheDocument();
    });
  });

  test('Verifica busca por comparação', async () => {
    render(<App />);
    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByTestId('button-filter');

    await waitFor(() => {
      const tablePlanet = screen.getByRole('table');
      const rowsCount = tablePlanet.lastChild.childElementCount;
      expect(rowsCount).toBe(10);
    });

    userEvent.selectOptions(columnFilter, screen.getByText('orbital_period'));
    userEvent.selectOptions(comparisonFilter, screen.getByText('maior que'));
    userEvent.type(valueFilter, '{selectall}{backspace}400');
    userEvent.click(buttonFilter);
    userEvent.selectOptions(columnFilter, screen.getByText('diameter'));
    userEvent.selectOptions(comparisonFilter, screen.getByText('menor que'));
    userEvent.type(valueFilter, '{selectall}{backspace}100000');
    userEvent.click(buttonFilter);
    userEvent.type(valueFilter, '{selectall}{backspace}100000');
    userEvent.click(buttonFilter);
    userEvent.selectOptions(columnFilter, screen.getByText('surface_water'));
    userEvent.selectOptions(comparisonFilter, screen.getByText('igual a'));
    userEvent.type(valueFilter, '{selectall}{backspace}8');
    userEvent.click(buttonFilter);

    const tablePlanet = screen.getByRole('table');
    const rowsCount = tablePlanet.lastChild.childElementCount;
    expect(rowsCount).toBe(2);

  })

})


