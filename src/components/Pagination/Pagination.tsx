import { useNavigate } from 'react-router-dom';
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setCharactersOnPage } from '../../store/slices/charactersOnPageSlice';
import { useGetCharactersQuery } from '../../store/slices/apiSlice';
import ROUTE_PARTH from '../../types/enums/routes-parths';
import './Pagination.css';

const Pagination = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pageNum, characterId } = useParams();

  const dispatch = useDispatch();

  const { data } = useGetCharactersQuery(
    !characterId ? `?${location.pathname.substring(1)}` : `/?page=${pageNum}`
  );

  const onUpdateQuantety = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const quantety = event.target.value;
    dispatch(setCharactersOnPage(Number(quantety)));
    navigate(ROUTE_PARTH.MAIN);
  };

  return (
    <div className="pagination__wrapper">
      <div className="pages-btns__wrapper">
        <button
          disabled={!data?.info.prev}
          onClick={() => navigate(`/page=${data?.info.prev?.slice(-1)}`)}
        >
          Previous
        </button>
        <button className="page-informer" data-testid="informer">
          {pageNum ? pageNum : 1}
        </button>
        <button
          disabled={!data?.info.next}
          onClick={() => {
            navigate(`/page=${data?.info.next?.slice(-1)}`);
          }}
        >
          Next
        </button>
      </div>
      <div className="limit-wrapper">
        <form>
          {
            <select
              id="characters-number"
              className="limit-select"
              name="characters-number"
              data-testid="characters-number"
              onChange={(e) => onUpdateQuantety(e)}
              defaultValue={20}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          }
          <label htmlFor="characters-number">characters on page</label>
        </form>
      </div>
    </div>
  );
};

export default Pagination;
