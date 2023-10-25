import { Component } from 'react';
import Character from '../Character/Character';
import { ICharactersListProps } from '../../interfaces/ICharactersListProps';
import './CharactersList.css';

class CharactersList extends Component<ICharactersListProps> {
  constructor(props: ICharactersListProps) {
    super(props);
  }

  render() {
    const { charactersList, nextPage, previousPage, onClickPaginationButton } = this.props;
    return (
      <>
        {' '}
        <div className="characters__Wrapper">
          {charactersList.map((char) => (
            <Character key={char.id} charData={char} />
          ))}
        </div>
        {charactersList && (nextPage || previousPage) ? (
          <div className="pagination__Wrapper">
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
  }
}

export default CharactersList;
