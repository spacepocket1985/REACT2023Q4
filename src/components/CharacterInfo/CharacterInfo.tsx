import { useRouter } from "next/router";

import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { useGetCharacterByIdQuery } from "../../store/slices/apiSlice";
import { setLoadingDetails } from "../../store/slices/loadingDetailsSlice";
import Spinner from "../Spinner/Spinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { ICharacter } from "../../types/interfaces/ICharacter";

const CharacterInfo = () => {
  const dispatch = useDispatch();

  const router = useRouter();
  const { characterId } = router.query;

  const {
    data: character,
    isLoading,
    isError,
    isFetching,
  } = useGetCharacterByIdQuery(Number(characterId));

  useEffect(() => {
    dispatch(setLoadingDetails(isFetching));
  }, [dispatch, isFetching]);

  const wrapperClass = characterId
    ? "character-wrapper__active"
    : "character-wrapper__unactive";

  const errorMessage = isError ? (
    <ErrorMessage errorMsg={"we have error"} />
  ) : null;
  const spinner = isLoading ? <Spinner /> : null;
  const content = !(isLoading || isError || !character) ? (
    <View character={character} />
  ) : null;

  return (
    <div className={wrapperClass}>
      <button
        className="character-title__button"
        data-testid="close-info"
        onClick={() => {
          router.push("/MainPage");
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
  const { name, status, gender, location, image, species, created } =
    props.character;
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
            <span className="detail-title">Location</span> - {location?.name}
          </div>
          <div>
            <span className="detail-title">Species</span> - {species}
          </div>
          <div>
            <span className="detail-title">Created</span> -{" "}
            {created?.substring(0, 10)}
          </div>
        </div>
      </div>
    </>
  );
};

export default CharacterInfo;
