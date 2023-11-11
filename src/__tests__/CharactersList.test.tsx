import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import AppContext from '../context/AppContext';
import CharactersList from '../components/CharactersList/CharactersList';
import { generateCharacters } from './mocs/generateCharacters';

describe('CharactersList component', () => {
  const charactersQuantity = 20;

  it('Check that an appropriate message is displayed if no cards are present', () => {
    const appData = {
      charactersList: [],
    };

    render(
      <AppContext.Provider value={{ appData: appData }}>
        <Router>
          <CharactersList />
        </Router>
      </AppContext.Provider>
    );

    expect(screen.getByText('No characters')).toBeInTheDocument();
  });

  it('Check render for characters list', () => {
    const appData = {
      charactersList: generateCharacters(charactersQuantity),
    };

    const { getByText } = render(
      <AppContext.Provider value={{ appData: appData }}>
        <Router>
          <CharactersList />
        </Router>
      </AppContext.Provider>
    );

    appData.charactersList.forEach((character) => {
      expect(getByText(character.name)).toBeInTheDocument();
    });
  });

  it('Verify that the component renders the specified number of cards', () => {
    const appData = {
      charactersList: generateCharacters(charactersQuantity),
    };

    render(
      <AppContext.Provider value={{ appData }}>
        <Router>
          <CharactersList />
        </Router>
      </AppContext.Provider>
    );

    const cards = screen.getAllByRole('link');
    expect(cards).toHaveLength(appData.charactersList.length);
  });
});
