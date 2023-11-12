import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import CharacterCard from '../components/CharacterCard/CharacterCard';
import { generateCharacters } from './mocs/generateCharacters';

describe('CharacterCard component', () => {
  const charactersQuantity = 1;
  const testCharacter = generateCharacters(charactersQuantity);

  const cardProps = {
    name: testCharacter[0].name,
    image: testCharacter[0].image,
    index: testCharacter[0].id,
    page: 2,
    id: testCharacter[0].id,
  };

  it('Ensure that the card component renders the relevant card data', () => {
    const { getByText, getByAltText } = render(
      <BrowserRouter>
        <CharacterCard {...cardProps} />
      </BrowserRouter>
    );

    const cardNameElement = getByText(cardProps.name);
    const cardImageElement = getByAltText(cardProps.name);

    expect(cardNameElement).toBeInTheDocument();
    expect(cardImageElement).toHaveAttribute('src', cardProps.image);
    expect(cardImageElement).toHaveAttribute('alt', cardProps.name);
  });

  it('Should navigate to detailed card component when clicked', () => {
    render(
      <BrowserRouter>
        <CharacterCard {...cardProps} />
      </BrowserRouter>
    );

    const characterLink = screen.getByRole('link');
    fireEvent.click(characterLink);

    expect(window.location.pathname).toBe(`/page=${cardProps.page}/characterId=${cardProps.id}`);
  });
});
