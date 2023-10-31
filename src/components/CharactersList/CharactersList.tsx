import { ICharacter } from '../../interfaces/ICharacter';
import { ICharactersListProps } from '../../interfaces/ICharactersListProps';
import './CharactersList.css';

const CharactersList = (props: ICharactersListProps) => {
  const { charactersList, nextPage, previousPage, onClickPaginationButton, onCharSelected } = props;

  const renderCharacters = (characters: ICharacter[]) =>
    characters.map((char) => {
      const { name, image, id } = char;
      return (
        <div
          className="character-card__wrapper"
          key={id}
          onClick={() => {
            onCharSelected(id);
          }}
        >
          <div className="card-img__wrapper">
            <img src={image} alt={name} />
          </div>
          <div className="card-content__wrapper">
            <div className="card-content__name">{name}</div>
          </div>
        </div>
      );
    });

  return (
    <>
      <div className="characters__wrapper">{renderCharacters(charactersList)}</div>
      {charactersList && (nextPage || previousPage) ? (
        <div className="pagination__wrapper">
          <button disabled={!previousPage} onClick={() => onClickPaginationButton(previousPage)}>
            Previous page
          </button>
          <button disabled={!nextPage} onClick={() => onClickPaginationButton(nextPage)}>
            Next page
          </button>
        </div>
      ) : null}
    </>
  );
};

export default CharactersList;
