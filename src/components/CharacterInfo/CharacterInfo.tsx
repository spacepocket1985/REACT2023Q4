import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';

import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import RickAndMortyAPI from '../../services/RickAndMortyAPI';
import ROUTE_PARTH from '../../types/enums/routes-parths';
import { ICharacterInfoProps } from '../../types/interfaces/ICharacterInfoProps';
import { ICharacter } from '../../types/interfaces/ICharacter';
import './CharacterInfo.css';

const CharacterInfo = (props: ICharacterInfoProps) => {
  const [character, setCharacter] = useState<null | ICharacter>(null);
  const [loading, setLoading] = useState(false);
  const [errorData, setError] = useState({
    error: false,
    errorMsg: '',
  });

  const { characterId } = props;

  const navigate = useNavigate();

  const { getCharacter } = RickAndMortyAPI();

  const wrapperClass = characterId ? 'character-wrapper__active' : 'character-wrapper__unactive';

  useEffect(() => {
    showCharacter();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characterId]);

  const showCharacter = () => {
    if (!characterId) {
      return;
    }
    setLoading(true);
    setError({ error: false, errorMsg: '' });
    getCharacter(Number(characterId)).then(onCharacterLoaded).catch(onError);
  };

  const onCharacterLoaded = (character: ICharacter) => {
    setLoading(false);
    setCharacter(character);
  };

  const onError = (error: Error) => {
    setError({
      error: true,
      errorMsg: error.message,
    });
    setLoading(false);
  };

  const errorMessage = errorData.error ? <ErrorMessage errorMsg={errorData.errorMsg} /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || errorData.error || !character) ? (
    <View character={character} />
  ) : null;

  return (
    <div className={wrapperClass}>
      <button
        className="character-title__button"
        onClick={() => {
          navigate(ROUTE_PARTH.MAIN);
        }}
      >
        X
      </button>
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
};

interface ICharacterProps {
  character: ICharacter;
}

const View = (props: ICharacterProps) => {
  const { name, status, gender, location, image, species, created } = props.character;
  return (
    <>
      <div className="character-title">
        <h2>Character info</h2>
      </div>
      <div className="character-img">
        <img src={image} alt={name} />
      </div>
      <div className="character-content__wrapper">
        <h3 className="character-name">{name}</h3>
        <div className="character-content__detail">
          <div>
            <span className="detail-title">Gender</span> - {gender}
          </div>
          <div>
            <span className="detail-title">Status</span> - {status}
          </div>
          <div>
            <span className="detail-title">Location</span> - {location.name}
          </div>
          <div>
            <span className="detail-title">Species</span> - {species}
          </div>
          <div>
            <span className="detail-title">Created</span> - {created.substring(0, 10)}
          </div>
        </div>
      </div>
    </>
  );
};

export default CharacterInfo;
