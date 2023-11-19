import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setCharactersOnPage } from '../../store/slices/charactersOnPageSlice';
import ROUTE_PARTH from '../../types/enums/routes-parths';
import { IPaginationProps } from '../../types/interfaces/IPaginationProps';
import './Pagination.css';

const Pagination = (props: IPaginationProps) => {
  const navigate = useNavigate();
  const { pageNum } = useParams();
  const { nextPage, prevPage } = props;

  const dispatch = useDispatch();

  const onUpdateQuantety = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const quantety = event.target.value;
    dispatch(setCharactersOnPage(Number(quantety)));
    navigate(ROUTE_PARTH.MAIN);
  };

  return (
    <div className="pagination__wrapper">
      <div className="pages-btns__wrapper">
        <button disabled={!prevPage} onClick={() => navigate(`/page=${prevPage?.slice(-1)}`)}>
          Previous
        </button>
        <button className="page-informer" data-testid="informer">
          {pageNum ? pageNum : 1}
        </button>
        <button
          disabled={!nextPage}
          onClick={() => {
            navigate(`/page=${nextPage?.slice(-1)}`);
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
