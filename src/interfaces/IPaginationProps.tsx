export interface IPaginationProps {
  nextPage: null | string;
  previousPage: null | string;
  onQuantitySelection: (charactersOnPage: number) => void;
  defoultQuantity: number;
}
