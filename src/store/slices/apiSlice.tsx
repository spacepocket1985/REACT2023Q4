import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IRickAndMortyData } from '../../types/interfaces/IRickAndMortyData';
import { ICharacter } from '../../types/interfaces/ICharacter';

const _apiBase = 'https://rickandmortyapi.com/api';
const _queryForCharacters = '/character';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: _apiBase }),

  endpoints: (builder) => ({
    getCharacters: builder.query<IRickAndMortyData, string>({
      query: (term) => `${_queryForCharacters}/${term}`,
    }),
    getCharacterById: builder.query<ICharacter, number>({
      query: (id) => `${_queryForCharacters}/${id}`,
    }),
  }),
});

export const { useGetCharactersQuery, useGetCharacterByIdQuery } = apiSlice;
export default apiSlice;
