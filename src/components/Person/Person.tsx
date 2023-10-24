import { Component } from 'react';
import './Person.css';
import { IPersonProps } from '../../interfaces/IPersonProps';

class Person extends Component<IPersonProps> {
  constructor(props: IPersonProps) {
    super(props);
  }

  render() {
    const { name, height, mass } = this.props.personData;

    return (
      <li>
        {name} - {height} - {mass}
      </li>
    );
  }
}

export default Person;
