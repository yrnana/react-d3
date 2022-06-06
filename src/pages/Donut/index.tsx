import { Navigate, Route, Routes } from 'react-router-dom';

import { NavLink } from '~/components';

import Component from './Component';
import DataLabel from './DataLabel';
import Simple from './Simple';
import Transition from './Transition';

export default function BarChart() {
  return (
    <>
      <nav className="flex space-x-4 pb-4">
        <NavLink to="simple">Simple</NavLink>
        <NavLink to="data-label">DataLabel</NavLink>
        <NavLink to="transition">Transition</NavLink>
        <NavLink to="component">Component</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Navigate to="simple" />} />
        <Route path="simple" element={<Simple />} />
        <Route path="data-label" element={<DataLabel />} />
        <Route path="transition" element={<Transition />} />
        <Route path="component" element={<Component />} />
      </Routes>
    </>
  );
}
