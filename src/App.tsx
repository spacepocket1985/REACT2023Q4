import { Routes, Route, HashRouter } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import FormReact from './pages/FormReact';
import FormSimple from './pages/FormSimple';
import Page404 from './pages/Page404 ';

import './App.css';

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="form-react" element={<FormReact />} />
            <Route path="form-simple" element={<FormSimple />} />
            <Route path="*" element={<Page404 />} />
          </Route>
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
