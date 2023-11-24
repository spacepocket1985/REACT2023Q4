import { Provider } from "react-redux";
import store from "../store/store";

import "../components/CharacterInfo/CharacterInfo.css";
import "../components/CharactersList/CharactersList.css";
import "../components/ErrorMessage/ErrorMessage.css";
import "../components/Pagination/Pagination.css";
import "../components/SearchForm/SearchForm.css";
import "../components/Spinner/Spinner.css";
import "../styles/index.css";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
