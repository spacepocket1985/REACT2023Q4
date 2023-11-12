import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';
import Pagination from '../components/Pagination/Pagination';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('Pagination', () => {
  const navigate = jest.fn();
  const setAppData = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(navigate);
  });

  it('Make sure the component updates URL query parameter when page changes', () => {
    const appData = {
      previousPage: '/page=1',
      currentPage: 2,
      nextPage: '/page=3',
      charactersOnPage: 10,
    };

    const { getByText } = render(
      <AppContext.Provider value={{ appData: appData }}>
        <Pagination />
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

  it('should update the characters on page when the select input is changed', () => {
    const appData = {
      previousPage: '/page=1',
      nextPage: '/page=3',
      currentPage: 2,
      charactersOnPage: 10,
    };

    const { getByTestId } = render(
      <AppContext.Provider value={{ appData, setAppData }}>
        <Pagination />
      </AppContext.Provider>
    );

    const selectInput = getByTestId('characters-number');

    fireEvent.change(selectInput, { target: { value: '15' } });

    expect(setAppData).toHaveBeenCalledWith({ ...appData, charactersOnPage: 15 });
    expect(navigate).toHaveBeenCalledWith('/');
  });

  it('should navigate to the previous page when the "Previous page" button is clicked', () => {
    const appData = {
      previousPage: '/page=1',
      nextPage: '/page=3',
      currentPage: 2,
      charactersOnPage: 10,
    };

    const { getByText } = render(
      <AppContext.Provider value={{ appData, setAppData }}>
        <Pagination />
      </AppContext.Provider>
    );

    const previousPageButton = getByText('Previous page');

    fireEvent.click(previousPageButton);

    expect(navigate).toHaveBeenCalledWith('/page=1');
  });

  it('should navigate to the next page when the "Next page" button is clicked', () => {
    const appData = {
      previousPage: '/page=1',
      nextPage: '/page=3',
      currentPage: 2,
      charactersOnPage: 10,
    };

    const { getByText } = render(
      <AppContext.Provider value={{ appData, setAppData }}>
        <Pagination />
      </AppContext.Provider>
    );

    const nextPageButton = getByText('Next page');

    fireEvent.click(nextPageButton);

    expect(navigate).toHaveBeenCalledWith('/page=3');
  });
  it('Check the status of the pagnation buttons, depending on whether there is a next or previous page', () => {
    const appData = {
      previousPage: null,
      currentPage: 1,
      nextPage: '/page=2',
      charactersPerPage: 10,
    };

    render(
      <AppContext.Provider value={{ appData, setAppData }}>
        <Pagination />
      </AppContext.Provider>
    );

    expect(screen.getByText('Previous page')).toBeDisabled();
    expect(screen.getByText('Next page')).not.toBeDisabled();
  });

  it('Check informer number', () => {
    const appData = {
      previousPage: '/page=3',
      currentPage: 4,
      nextPage: '/page=4',
    };

    const { getByText } = render(
      <AppContext.Provider value={{ appData: appData }}>
        <Pagination />
      </AppContext.Provider>
    );

    const informer = screen.getByTestId('informer');

    fireEvent.click(getByText('Next page'));
    expect(appData.currentPage).toBe(Number(informer.textContent));
  });
});
