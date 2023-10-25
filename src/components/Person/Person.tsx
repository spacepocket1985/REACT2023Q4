import { Component } from 'react';
import './Person.css';
import { IPersonProps } from '../../interfaces/IPersonProps';

class Person extends Component<IPersonProps> {
  constructor(props: IPersonProps) {
    super(props);
  }

  render() {
    const { name, height, mass, gender } = this.props.personData;

    return (
      <li>
        <span>{name}</span> {gender} - {height}cm - {mass}kg
      </li>
    );
  }
}

export default Person;
