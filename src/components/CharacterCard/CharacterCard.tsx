import Link from 'next/link';

import { ICharacterCardProps } from '../../types/interfaces/ICharacterCardProps';

const CharacterCard = (props: ICharacterCardProps) => {
  const { name, image, page, id } = props;
  return (
    <Link href={{ pathname: '/MainPage/', query: { pageNum: page, characterId: id } }}>
      <div className="character-card__wrapper">
        <div className="card-img__wrapper">
          <img className="card-img" src={image} alt={name} />
        </div>
        <div className="card-content__wrapper">
          <div className="card-content__name">{name}</div>
        </div>
      </div>
    </Link>
  );
};

export default CharacterCard;
