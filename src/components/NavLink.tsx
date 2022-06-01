import { type NavLinkProps, NavLink as BaseNavLink } from 'react-router-dom';

export const NavLink = (props: NavLinkProps) => (
  <BaseNavLink
    className={({ isActive }) =>
      isActive
        ? 'text-violet-400 hover:text-violet-500'
        : 'text-slate-400 hover:text-violet-500'
    }
    {...props}
  />
);
