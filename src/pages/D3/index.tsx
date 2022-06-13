import { Navigate, Route, Routes } from 'react-router-dom';

import { NavLink } from '~/components';

import Scale from './Scale';

export default function DonutChart() {
  return (
    <>
      <nav className="flex space-x-4 pb-4">
        <NavLink to="scale">Scale</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Navigate to="scale" />} />
        <Route path="scale" element={<Scale />} />
      </Routes>
    </>
  );
}
