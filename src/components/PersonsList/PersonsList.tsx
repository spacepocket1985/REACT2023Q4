import { Component } from 'react';
import Person from '../Person/Person';
import { IPersonsListProps } from '../../interfaces/IPersonsListProps';
import './PersonsList.css';

class PersonsList extends Component<IPersonsListProps> {
  constructor(props: IPersonsListProps) {
    super(props);
  }

  render() {
    const { personsList, nextPage, previousPage, onClickPaginationButton } = this.props;
    return (
      <div className="persons-wrapper">
        <h2>[Category people]</h2>
        <ul>
          {personsList.map((person, index) => (
            <Person key={index} personData={person} />
          ))}
        </ul>
        {personsList && (nextPage || previousPage) ? (
          <div className="pagination-wrapper">
            <button disabled={!previousPage} onClick={() => onClickPaginationButton(previousPage)}>
              Previous page
            </button>
            <button disabled={!nextPage} onClick={() => onClickPaginationButton(nextPage)}>
              Next page
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}

export default PersonsList;
