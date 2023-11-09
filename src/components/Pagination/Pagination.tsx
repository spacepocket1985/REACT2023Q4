import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import ROUTE_PARTH from '../../types/enums/routes-parths';
import AppContext from '../../context/AppContext';
import './Pagination.css';

const Pagination = () => {
  const navigate = useNavigate();
  const { appData, setAppData } = useContext(AppContext);

  const onUpdateQuantety = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const quantety = event.target.value;
    if (setAppData) setAppData({ ...appData, charactersOnPage: Number(quantety) });
    navigate(ROUTE_PARTH.MAIN);
  };

  return (
    <div className="pagination__wrapper">
      <div className="pages-btns__wrapper">
        <button
          disabled={!appData.previousPage}
          onClick={() => navigate(`/page=${appData.previousPage?.slice(-1)}`)}
        >
          Previous page
        </button>
        <div className="page-informer">{appData.currentPage ? appData.currentPage : 1}</div>
        <button
          disabled={!appData.nextPage}
          onClick={() => navigate(`/page=${appData.nextPage?.slice(-1)}`)}
        >
          Next page
        </button>
      </div>
      <div className="limit-wrapper">
        <form>
          <select
            id="characters-number"
            className="limit-select"
            name="characters-number"
            onChange={(e) => onUpdateQuantety(e)}
            defaultValue={appData.charactersOnPage}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
          <label htmlFor="characters-number">characters on page</label>
        </form>
      </div>
    </div>
  );
};

export default Pagination;
