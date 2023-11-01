export interface IPaginationProps {
  nextPage: null | string;
  previousPage: null | string;
  onClickPaginationButton: (url: string | null) => void;
  onQuantitySelection: (charactersOnPage: number) => void;
  defoultQuantity: number;
}
