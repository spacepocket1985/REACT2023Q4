import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import { setCharactersOnPage } from '../../store/slices/charactersOnPageSlice';
import ROUTE_PARTH from '../../types/enums/routes-parths';
import { IPaginationProps } from '../../types/interfaces/IPaginationProps';

const Pagination = (props: IPaginationProps) => {
  const router = useRouter();
  const { pageNum } = router.query;

  const { nextPage, prevPage } = props;

  const dispatch = useDispatch();

  const onUpdateQuantety = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const quantety = event.target.value;
    dispatch(setCharactersOnPage(Number(quantety)));
    router.push('/MainPage');
  };

  return (
    <div className="pagination__wrapper">
      <div className="pages-btns__wrapper">
        <button disabled={!prevPage} onClick={() => router.push(`MainPage?pageNum=${prevPage?.slice(-1)}`)}>
          Previous
        </button>
        <button className="page-informer" data-testid="informer">
          {pageNum ? pageNum : 1}
        </button>
        <button
          disabled={!nextPage}
          onClick={() => {
            router.push(`/MainPage?pageNum=${nextPage?.slice(-1)}`);
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
