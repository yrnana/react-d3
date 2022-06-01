import { Outlet } from 'react-router-dom';

import { NavLink } from '~/components/NavLink';

export const Layout = () => {
  return (
    <div className="container mx-auto px-4">
      <nav className="flex space-x-4 py-4">
        <NavLink to="bar">Bar</NavLink>
        <NavLink to="donut">Donut</NavLink>
        <NavLink to="bubble">Bubble</NavLink>
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  );
};
