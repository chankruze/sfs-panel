import { navLinks } from './nav-data';
import { NavItem } from './nav-item';

export const NavList = () => {
  return (
    <ul className="space-y-1">
      {navLinks.map(({ to, label }) => (
        <NavItem key={`nav-${to}`} to={to} label={label} />
      ))}
    </ul>
  );
};
