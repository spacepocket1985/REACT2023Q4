import { ICharacterCardProps } from '../../types/interfaces/ICharacterCardProps';

const CharacterCard = (props: ICharacterCardProps) => {
  const { name, image } = props;
  return (
    <div className="character-card__wrapper">
      <div className="card-img__wrapper">
        <img className="card-img" src={image} alt={name} />
      </div>
      <div className="card-content__wrapper">
        <div className="card-content__name">{name}</div>
      </div>
    </div>
  );
};

export default CharacterCard;
