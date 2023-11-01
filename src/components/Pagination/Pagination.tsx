import { IPaginationProps } from '../../interfaces/IPaginationProps';
import './Pagination.css';

const Pagination = (props: IPaginationProps) => {
  const { previousPage, nextPage, onClickPaginationButton, onQuantitySelection, defoultQuantity } =
    props;

  const onUpdateQuantety = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const quantety = event.target.value;
    onQuantitySelection(Number(quantety));
  };

  return (
    <div className="pagination__wrapper">
      <div className="pages-btns__wrapper">
        <button disabled={!previousPage} onClick={() => onClickPaginationButton(previousPage)}>
          Previous page
        </button>
        <button disabled={!nextPage} onClick={() => onClickPaginationButton(nextPage)}>
          Next page
        </button>
      </div>
      <div className="limit-wrapper">
        <form>
          <select
            className="limit-select"
            name="characters-number"
            onChange={(e) => onUpdateQuantety(e)}
            defaultValue={defoultQuantity}
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
