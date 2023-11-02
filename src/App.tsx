import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainPage from './pages/MainPage';
import Page404 from './pages/Page404';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

const App = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          {/* <Route path="/" element={<Navigate to="/pages/1" replace />} /> */}
          <Route path="/" element={<MainPage />} />
          <Route path="/character/:characterId" element={<MainPage />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
