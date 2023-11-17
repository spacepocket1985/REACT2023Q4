import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import RickAndMortyAPI from '../../services/RickAndMortyAPI';
import { IRickAndMortyData } from '../../types/interfaces/IRickAndMortyData';
import { ICharacter } from '../../types/interfaces/ICharacter';

const { _apiBase, _queryForCharacters } = RickAndMortyAPI();

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: _apiBase }),

  endpoints: (builder) => ({
    getCharacters: builder.query<IRickAndMortyData, string>({
      query: (term) => `${_queryForCharacters}/${term}`,
    }),
    getCharacterById: builder.query<ICharacter, number | null>({
      query: (id) => `${_queryForCharacters}/${id}`,
    }),
  }),
});

export const { useGetCharactersQuery, useGetCharacterByIdQuery } = apiSlice;
export default apiSlice;
