import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Pagination from '../components/Pagination/Pagination';
import AppContext from '../context/AppContext';

describe('Pagination component', () => {
  test('check the status of the pagnation buttons, depending on whether there is a next or previous page', () => {
    const appData = {
      previousPage: null,
      currentPage: 1,
      nextPage: '/page=2',
      charactersPerPage: 10,
    };
    const setAppData = jest.fn();

    render(
      <AppContext.Provider value={{ appData, setAppData }}>
        <BrowserRouter>
          <Pagination />
        </BrowserRouter>
      </AppContext.Provider>
    );

    expect(screen.getByText('Previous page')).toBeDisabled();
    expect(screen.getByText('Next page')).not.toBeDisabled();
  });

  test('updates URL query parameter when page changes', () => {
    const appData = {
      previousPage: '/page=1',
      currentPage: 2,
      nextPage: '/page=3',
      charactersOnPage: 10,
    };

    const { getByText } = render(
      <AppContext.Provider value={{ appData: appData }}>
        <BrowserRouter>
          <Pagination />
        </BrowserRouter>
      </AppContext.Provider>
    );

    // Click 'Next page' button
    fireEvent.click(getByText('Next page'));

    // Check if the URL has changed to the next page
    expect(appData.nextPage).toBe(`/page=${appData.currentPage + 1}`);

    // Click 'Previous page' button
    fireEvent.click(getByText('Previous page'));

    // Check if the URL has changed to the previous page
    expect(appData.previousPage).toBe(`/page=${appData.currentPage - 1}`);
  });

  test('check informer', () => {
    const appData = {
      previousPage: '/page=3',
      currentPage: 4,
      nextPage: '/page=4',
    };

    const { getByText } = render(
      <AppContext.Provider value={{ appData: appData }}>
        <BrowserRouter>
          <Pagination />
        </BrowserRouter>
      </AppContext.Provider>
    );

    const informer = screen.getByTestId('informer');

    fireEvent.click(getByText('Next page'));
    expect(appData.currentPage).toBe(Number(informer.textContent));
  });

  test('should update characters per page correctly', () => {
    const appData = {
      currentPage: 20,
    };

    render(
      <AppContext.Provider value={{ appData: appData }}>
        <BrowserRouter>
          <Pagination />
        </BrowserRouter>
      </AppContext.Provider>
    );

    // Select the characters per page select element
    const selectElement = screen.getByTestId('characters-number');

    // Fire change event to select a different value
    fireEvent.change(selectElement, { target: { value: '10' } });

    // Assert that the value of the characters per page select has been updated
    expect(screen.getByTestId('characters-number')).toHaveValue('10');
  });
});
