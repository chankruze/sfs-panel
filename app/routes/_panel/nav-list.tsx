import { NavItem } from './nav-item';

export const NavList = () => {
  return (
    <ul className='space-y-1'>
      <NavItem to="." label="Dashboard" />
      <NavItem to="plans" label="Plans" />
      <NavItem to="customers" label="Customers" />
      <NavItem to="transactions" label="Transactions" />
      <NavItem to="staffs" label="Staffs" />
      <NavItem to="activities" label="Activities" />
    </ul>
  );
};
