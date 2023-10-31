import { ICharacterInfoProps } from '../../interfaces/ICharacterInfoProps';
import './CharacterInfo.css';

const CharacterInfo = (props: ICharacterInfoProps) => {
  console.log(props.charId);
  return (
    <div className="character-info__wrapper">
      <h2>Character Info</h2>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti fugit dolorem animi
        numquam deserunt incidunt natus, ipsum pariatur doloremque et at? Beatae a velit impedit
        doloribus nihil rem quibusdam eaque.
      </p>
    </div>
  );
};

export default CharacterInfo;
