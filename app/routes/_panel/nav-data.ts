import {
  Activity,
  Folder,
  Home,
  PiggyBank,
  UserCog,
  Users,
} from 'lucide-react';
import type { BottomNavItemProps } from './bottom-nav-item';
import type { NavItemProps } from './nav-item';

type NavLinkType = NavItemProps & BottomNavItemProps;

export const navLinks: NavLinkType[] = [
  {
    to: '.',
    label: 'Dashboard',
    icon: Home,
  },
  {
    to: 'plans',
    label: 'Plans',
    icon: Folder,
  },
  {
    to: 'customers',
    label: 'Customers',
    icon: Users,
  },
  {
    to: 'transactions',
    label: 'Transactions',
    icon: PiggyBank,
  },
  {
    to: 'staffs',
    label: 'Staffs',
    icon: UserCog,
  },
  {
    to: 'activities',
    label: 'Activities',
    icon: Activity,
  },
];
