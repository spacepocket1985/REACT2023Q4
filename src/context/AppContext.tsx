import { createContext } from 'react';
import { IAppContext } from '../types/interfaces/IAppContext';

const AppContext = createContext<IAppContext>({
  appData: {
    charactersList: [],
    nextPage: null,
    previousPage: null,
    error: false,
    errorMsg: '',
    loading: false,
    query: '',
    charactersOnPage: 20,
    currentPage: 1,
  },
  setAppData: () => {},
});

export default AppContext;
