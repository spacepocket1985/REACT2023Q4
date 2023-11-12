import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';
import SearchForm from '../components/SearchForm/SearchForm';
import { yourLocalStorage } from '../utils/localStorageActions';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

const spySetQuery = jest.spyOn(yourLocalStorage, 'setData');

describe('SearchForm', () => {
  const navigate = jest.fn();
  const setAppData = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(navigate);
  });

  it('Verify that clicking the Search button saves the entered value to the local storage', async () => {
    const { getByRole } = render(<SearchForm />);
    const input = screen.getByPlaceholderText('name for search') as HTMLInputElement;
    const searchButton = getByRole('button');
    input.value = 'test query';

    yourLocalStorage.setData(input.value);

    fireEvent.click(searchButton);

    expect(spySetQuery).toHaveBeenCalledTimes(1);
    expect(spySetQuery).toHaveBeenCalledWith('test query');
  });

  it('should update query in context on form submit', () => {
    const appData = {
      previousPage: '/page=1',
      currentPage: 2,
      nextPage: '/page=3',
      charactersOnPage: 10,
      query: '',
    };
    const { getByTestId, getByRole } = render(
      <AppContext.Provider value={{ appData: appData, setAppData }}>
        <SearchForm />
      </AppContext.Provider>
    );

    const input = getByTestId('my-input');
    fireEvent.change(input, { target: { value: 'test' } });

    const button = getByRole('button');
    fireEvent.click(button);

    expect(setAppData).toHaveBeenCalledWith({ ...appData, query: 'test' });
  });
});
