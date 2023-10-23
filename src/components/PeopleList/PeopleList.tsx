import { Component } from 'react';
import SwapiDevService from '../../services/SwapiDev';
import './PeopleList.css';

class PeopleList extends Component {
  SwapiDevService = new SwapiDevService();

  onRequest = () => {
    this.SwapiDevService.getAllPeople();
  };

  render() {
    {
      this.onRequest();
    }
    return (
      <div className="peopleList-wrapper">
        <h2>People List</h2>
      </div>
    );
  }
}

export default PeopleList;
