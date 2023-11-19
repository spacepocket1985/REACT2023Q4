import { Routes, Route, HashRouter } from 'react-router-dom';

import MainPage from './pages/MainPage';
import Page404 from './pages/Page404';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import ROUTE_PARTH from './types/enums/routes-parths';

const App = () => {
  return (
    <HashRouter>
      <ErrorBoundary>
        <Routes>
          <Route index element={<MainPage />} />
          <Route path={ROUTE_PARTH.MAIN} element={<MainPage />} />
          {<Route path={ROUTE_PARTH.DEFAULT_SEARCH} element={<MainPage />} />}
          <Route path={ROUTE_PARTH.PAGE} element={<MainPage />} />
          {<Route path={ROUTE_PARTH.SEARCH} element={<MainPage />} />}
          <Route path={ROUTE_PARTH.CHARACTER} element={<MainPage />} />
          <Route path={ROUTE_PARTH.PAGE404} element={<Page404 />} />
        </Routes>
      </ErrorBoundary>
    </HashRouter>
  );
};

export default App;
