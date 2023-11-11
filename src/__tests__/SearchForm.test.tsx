import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import SearchForm from '../components/SearchForm/SearchForm';
import { yourLocalStorage } from '../utils/localStorageActions';

afterEach(() => {
  jest.restoreAllMocks();
});

const spySetQuery = jest.spyOn(yourLocalStorage, 'setData');

describe('SearchForm', () => {
  it('Verify that clicking the Search button saves the entered value to the local storage', async () => {
    const { getByRole } = render(
      <BrowserRouter>
        <SearchForm />
      </BrowserRouter>
    );
    const input = screen.getByPlaceholderText('name for search') as HTMLInputElement;
    const searchButton = getByRole('button');
    input.value = 'test query';

    yourLocalStorage.setData(input.value);

    fireEvent.click(searchButton);

    expect(spySetQuery).toHaveBeenCalledTimes(1);
    expect(spySetQuery).toHaveBeenCalledWith('test query');
  });
});
