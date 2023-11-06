const storageKey = 'userQueryForSearch';

const setUserQuery = (value: string): void => {
  value !== '' ? localStorage.setItem(storageKey, value) : localStorage.removeItem(storageKey);
};

const getUserQuery = (): string | null => localStorage.getItem(storageKey);

export { storageKey, setUserQuery, getUserQuery };
