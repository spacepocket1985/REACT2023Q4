import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import SearchForm from '../components/SearchForm/SearchForm';
import { BrowserRouter } from 'react-router-dom';
import { getUserQuery } from '../utils/localStorageActions';

import { Provider } from 'react-redux';
import store from '../store/store';

describe('SearchForm', () => {
  it('verify that clicking the Search button saves the entered value to the local storage', () => {
    const { getByTestId, getByRole } = render(
      <BrowserRouter>
        <Provider store={store}>
          <SearchForm />
        </Provider>
      </BrowserRouter>
    );

    const input = getByTestId('my-input');

    fireEvent.change(input, { target: { value: 'Rick' } });
    const button = getByRole('button');
    fireEvent.click(button);

    expect(getUserQuery()).toBe('Rick');
  });

  it('checks if the searchValue is saved in Store', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Provider store={store}>
          <SearchForm />
        </Provider>
      </BrowserRouter>
    );

    const input = getByTestId('my-input');
    fireEvent.change(input, { target: { value: 'Rick' } });

    expect(store.getState().searchValue.searchValue).toBe('Rick');
  });

  it('checks the url when submit is clicked', () => {
    const { getByTestId, getByRole } = render(
      <BrowserRouter>
        <Provider store={store}>
          <SearchForm />
        </Provider>
      </BrowserRouter>
    );

    const input = getByTestId('my-input');
    fireEvent.change(input, { target: { value: 'Morty' } });
    const button = getByRole('button');
    fireEvent.click(button);

    expect(window.location.pathname).toBe('/search/Morty');
  });
});
