import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../store/store';

import CharacterInfo from '../components/CharacterInfo/CharacterInfo';

describe('CharacterInfo component', () => {
  it('Ensure that clicking the close button hides the componen', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <CharacterInfo />
        </Provider>
      </BrowserRouter>
    );

    const closeBtnButton = screen.getByTestId('close-info');
    fireEvent.click(closeBtnButton);

    expect(window.location.pathname).toBe('/');
  });
});
