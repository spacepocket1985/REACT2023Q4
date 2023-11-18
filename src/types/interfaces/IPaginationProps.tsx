export interface IPaginationProps {
  nextPage: null | string;
  prevPage: null | string;
  onQuantitySelection?: (charactersOnPage: number) => void;
  defoultQuantity?: number;
  currentPage?: number;
}
