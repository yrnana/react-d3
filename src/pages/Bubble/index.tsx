import { Navigate, Route, Routes } from 'react-router-dom';

import { NavLink } from '~/components';

import Component from './Component';
import Simple from './Simple';

export default function BubbleChart() {
  return (
    <>
      <nav className="flex space-x-4 pb-4">
        <NavLink to="simple">Simple</NavLink>
        <NavLink to="component">Component</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Navigate to="simple" />} />
        <Route path="simple" element={<Simple />} />
        <Route path="component" element={<Component />} />
      </Routes>
    </>
  );
}
