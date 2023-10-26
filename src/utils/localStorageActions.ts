const setUserQuery = (value: string): void => {
  value !== ''
    ? localStorage.setItem('userQueryForSearch', value)
    : localStorage.removeItem('userQueryForSearch');
};

const getUserQuery = (): string | null => localStorage.getItem('userQueryForSearch');

export { setUserQuery, getUserQuery };
