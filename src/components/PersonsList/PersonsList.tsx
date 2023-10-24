import { Component } from 'react';
import Person from '../Person/Person';
import { IPersonsListProps } from '../../interfaces/IPersonsListProps';
import './PersonsList.css';

class PersonsList extends Component<IPersonsListProps> {
  constructor(props: IPersonsListProps) {
    super(props);
  }

  render() {
    return (
      <div className="persons-wrapper">
        <h2>SWAPI</h2>
        <ul>
          {this.props.personsList.map((person, index) => (
            <Person key={index} personData={person} />
          ))}
        </ul>
      </div>
    );
  }
}

export default PersonsList;
