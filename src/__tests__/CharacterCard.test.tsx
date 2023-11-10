import { render } from '@testing-library/react';

import '@testing-library/jest-dom';
import CharacterCard from '../components/CharacterCard/CharacterCard';
import { generateCharacters } from './mocs/generateCharacters';

describe('CharacterCard component', () => {
  const charactersQuantity = 1;

  test('check that card component renders the relevant card data', () => {
    const character = generateCharacters(charactersQuantity);

    const { getByText, getByAltText } = render(
      <CharacterCard name={character[0].name} image={character[0].image} />
    );

    expect(getByText(character[0].name)).toBeInTheDocument();

    const image = getByAltText(character[0].name);

    expect(image).toHaveAttribute('src', character[0].image);
  });
});
