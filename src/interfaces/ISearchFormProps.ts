export interface ISearchFormProps {
  onSearchSubmit: (query: string) => void;
  buttonStatus: boolean;
  hasError: boolean;
}
