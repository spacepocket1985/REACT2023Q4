import { render } from '@testing-library/react';
import { useState } from 'react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { IAppState } from '../types/interfaces/IAppState';
//import { ICharacter } from '../types/interfaces/ICharacter';
import CharactersList from '../components/CharactersList/CharactersList';

describe('CharactersList component', () => {
  const characters = [
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
    nextPage: '',
    previousPage: '',
    error: false,
    errorMsg: '',
    loading: false,
    query: '',
    charactersOnPage: 20,
    currentPage: 1,
  });

  test('renders empty characters list', () => {
    const { container } = render(
      <BrowserRouter>
        <AppContext.Provider value={{ appData: appData, setAppData: setAppData }}>
          <CharactersList />
        </AppContext.Provider>
      </BrowserRouter>
    );

    const items = container.querySelectorAll('a');
    expect(items.length).toBe(2);
  });
});
