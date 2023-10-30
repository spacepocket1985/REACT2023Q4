import { ICharacterProps } from '../../interfaces/ICharacterProps';
import './Character.css';

const Character = (props: ICharacterProps) => {
  const { name, status, gender, image } = props.charData;

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
};

export default Character;
