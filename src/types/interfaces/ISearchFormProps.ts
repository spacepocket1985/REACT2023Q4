export interface ISearchFormProps {
  onSearchSubmit: (query: string, error?: boolean) => void;
  buttonStatus: boolean;
  hasError: boolean;
}
