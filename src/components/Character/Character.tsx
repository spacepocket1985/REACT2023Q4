import { Component } from 'react';
import './Character.css';
import { ICharacterProps } from '../../interfaces/ICharacterProps';

class Character extends Component<ICharacterProps> {
  constructor(props: ICharacterProps) {
    super(props);
  }

  render() {
    const { name, status, gender, image } = this.props.charData;

    return (
      <div className="characterCard__Wrapper">
        <div className="characterCard__ImgWrapper">
          <img src={image} alt={name} />
        </div>
        <div className="characterCard__ContentWrapper">
          <div className="characterName">{name}</div>
          <div className="characterGender">{gender}</div>
          <div className="characterStatus">{status}</div>
        </div>
      </div>
    );
  }
}

export default Character;
