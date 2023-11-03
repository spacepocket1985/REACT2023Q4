import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainPage from './pages/MainPage';
import Page404 from './pages/Page404';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

const App = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/character/:characterId" element={<MainPage />} />
          <Route path="/page/:pageNum" element={<MainPage />} />
          <Route path="/search/:queryParam" element={<MainPage />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
