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

    userEvent.selectOptions(columnFilter, 'orbital_period');
    userEvent.selectOptions(comparisonFilter, 'maior que');
    userEvent.type(valueFilter, '{selectall}{backspace}400');
    userEvent.click(buttonFilter);
    userEvent.selectOptions(columnFilter, 'diameter');
    userEvent.selectOptions(comparisonFilter, 'menor que');
    userEvent.type(valueFilter, '{selectall}{backspace}100000');
    userEvent.click(buttonFilter);
    userEvent.selectOptions(columnFilter, 'surface_water');
    userEvent.selectOptions(comparisonFilter, 'igual a');
    userEvent.type(valueFilter, '{selectall}{backspace}8');
    userEvent.click(buttonFilter);

    const tablePlanet = screen.getByRole('table');
    const rowsCount = tablePlanet.lastChild.childElementCount;
    expect(rowsCount).toBe(2);

  });

  test('Verfica exclusão de filtros', async () => {
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

    userEvent.selectOptions(columnFilter, 'orbital_period');
    userEvent.selectOptions(comparisonFilter, screen.getByText('maior que'));
    userEvent.type(valueFilter, '{selectall}{backspace}400');
    userEvent.click(buttonFilter);

    expect(columnFilter.childElementCount).toBe(4);

    const deleteButton = screen.getByText('Excluir');
    userEvent.click(deleteButton);

    const tablePlanet = screen.getByRole('table');
    const rowsCount = tablePlanet.lastChild.childElementCount;
    expect(columnFilter.childElementCount).toBe(5);
    expect(rowsCount).toBe(10);
  });

  test('Verificar botão de deletar tudo', async () => {
    render(<App />);
    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByTestId('button-filter');
    const deleteAll = screen.getByTestId('button-remove-filters');

    await waitFor(() => {
      const tablePlanet = screen.getByRole('table');
      const rowsCount = tablePlanet.lastChild.childElementCount;
      expect(rowsCount).toBe(10);
    });

    userEvent.selectOptions(columnFilter, 'orbital_period');
    userEvent.selectOptions(comparisonFilter, screen.getByText('maior que'));
    userEvent.type(valueFilter, '{selectall}{backspace}400');
    userEvent.click(buttonFilter);
    userEvent.selectOptions(columnFilter, 'diameter');
    userEvent.selectOptions(comparisonFilter, screen.getByText('menor que'));
    userEvent.type(valueFilter, '{selectall}{backspace}100000');
    userEvent.click(buttonFilter);

    screen.getAllByTestId('filter');
    expect(screen.getAllByTestId('filter')).toHaveLength(2);

    expect(columnFilter.childElementCount).toBe(3);

    userEvent.click(deleteAll);

    const tablePlanet = screen.getByRole('table');
    const rowsCount = tablePlanet.lastChild.childElementCount;
    expect(columnFilter.childElementCount).toBe(5);
    expect(screen.queryAllByTestId('filter')).toHaveLength(0);
    expect(rowsCount).toBe(10);
  });

  test('Verifica ordenação da tabela', async () => {
    render(<App />);
    await waitFor(() => {
      const firstTd = screen.getAllByTestId('planet-name');
      expect(firstTd[0]).toContainHTML("<td data-testid='planet-name'>Alderaan</td>")
    });

    const selectColumnOrder = screen.getByTestId('column-sort');
    const radioAsc = screen.getByTestId('column-sort-input-asc');
    const radioDesc = screen.getByTestId('column-sort-input-desc');
    const buttonOrder = screen.getByTestId('column-sort-button');

    userEvent.selectOptions(selectColumnOrder, 'diameter');
    userEvent.click(radioAsc);
    userEvent.click(buttonOrder);

    expect(screen.getAllByTestId('planet-name')[0])
      .toContainHTML("<td data-testid='planet-name'>Endor</td>");

    userEvent.click(radioDesc);
    userEvent.click(buttonOrder);

    expect(screen.getAllByTestId('planet-name')[0])
      .toContainHTML("<td data-testid='planet-name'>Bespin</td>");

  })

})


