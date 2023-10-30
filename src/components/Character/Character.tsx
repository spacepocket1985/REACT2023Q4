import { ICharacterProps } from '../../interfaces/ICharacterProps';
import './Character.css';

const Character = (props: ICharacterProps) => {
  const { name, status, gender, image } = props.charData;

  return (
    <div className="character-card__wrapper">
      <div className="card-img__wrapper">
        <img src={image} alt={name} />
      </div>
      <div className="card-content__wrapper">
        <div className="character-name">{name}</div>
        <div>{gender}</div>
        <div>{status}</div>
      </div>
    </div>
  );
};

export default Character;
