import { render } from '@testing-library/react';
import { useState } from 'react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { IAppState } from '../types/interfaces/IAppState';
import { ICharacter } from '../types/interfaces/ICharacter';
import CharactersList from '../components/CharactersList/CharactersList';

describe('CharactersList component', () => {
  const characters: ICharacter[] = [
    {
      id: 1,
      name: 'Rick',
      status: 'Alive',
      type: '',
      origin: {
        name: 'Earth (C-137)',
        url: '',
      },
      location: {
        name: 'Earth (Replacement Dimension)',
        url: '',
      },
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      episode: [
        'https://rickandmortyapi.com/api/episode/1',
        'https://rickandmortyapi.com/api/episode/2',
      ],
      gender: 'Male',
      species: 'Human',
      created: '2023-11-09',
      url: '',
    },
    {
      id: 2,
      name: 'Morty',
      status: 'Alive',
      type: '',
      origin: {
        name: 'Earth (C-150)',
        url: '',
      },
      location: {
        name: 'Earth (Replacement Dimension)',
        url: '',
      },
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      episode: [
        'https://rickandmortyapi.com/api/episode/1',
        'https://rickandmortyapi.com/api/episode/2',
      ],
      gender: 'Male',
      species: 'Human',
      created: '2023-11-09',
      url: '',
    },
  ];

  const [appData, setAppData] = useState<IAppState>({
    charactersList: characters,
    nextPage: null,
    previousPage: null,
    error: false,
    errorMsg: '',
    loading: false,
    query: '',
    charactersOnPage: 20,
    currentPage: 1,
  });

  test('renders characters list', () => {
    const { getByAltText, getByText } = render(
      <MemoryRouter>
        <AppContext.Provider value={{ appData: appData, setAppData: setAppData }}>
          <CharactersList />
        </AppContext.Provider>
      </MemoryRouter>
    );

    appData.charactersList.forEach((character) => {
      expect(getByAltText(character.name)).toBeInTheDocument();
      expect(getByText(character.name)).toBeInTheDocument();
    });
    // const liItems = container.querySelectorAll('li');
    // expect(liItems.length).toBe(ITEMS_COUNT);

    // expect(appData.charactersList.length).toBe(ITEMS_COUNT);
  });

  test('renders correct links', () => {
    const { container } = render(
      <MemoryRouter>
        <AppContext.Provider value={{ appData: appData, setAppData: setAppData }}>
          <CharactersList />
        </AppContext.Provider>
      </MemoryRouter>
    );

    appData.charactersList.forEach((character) => {
      const link = container.querySelector(`[href="/page=1/characterid=${character.id}"]`);
      expect(link).toBeInTheDocument();
    });
  });

  test('renders empty characters list', () => {
    const { container } = render(
      <MemoryRouter>
        <AppContext.Provider value={{ appData: appData, setAppData: setAppData }}>
          <CharactersList />
        </AppContext.Provider>
      </MemoryRouter>
    );

    const liItems = container.querySelectorAll('.character-card__wrapper');
    expect(liItems.length).toBe(5);
  });
});
