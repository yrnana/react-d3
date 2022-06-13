import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from './components';
import { Bar, Bubble, D3, Donut } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/bar/simple" replace />} />
          <Route path="d3/*" element={<D3 />} />
          <Route path="bar/*" element={<Bar />} />
          <Route path="donut/*" element={<Donut />} />
          <Route path="bubble/*" element={<Bubble />} />
          <Route path="line/*" element={<Bubble />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
