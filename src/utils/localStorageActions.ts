const storageKey = 'userQueryForSearch';

const setUserQuery = (value: string): void => {
  localStorage.setItem(storageKey, value);
};

const getUserQuery = (): string | null => localStorage.getItem(storageKey);

export { storageKey, setUserQuery, getUserQuery };
