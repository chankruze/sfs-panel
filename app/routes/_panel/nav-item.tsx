import { NavLink } from '@remix-run/react';
import { cn } from '~/lib/utils';

export type NavItemProps = {
  to: string;
  label: string;
};

export const NavItem = ({ to, label }: NavItemProps) => {
  return (
    <li className="flex">
      <NavLink
        to={to}
        className={({ isActive, isPending }) =>
          cn(
            'flex flex-1 items-center gap-1.5 rounded-2xl px-4 py-3 font-poppins transition-all duration-300',
            {
              'bg-yellow-400/10 text-yellow-400': isActive,
              'hover:bg-accent/5': !isActive,
              'bg-red-400/10 text-red-400': isPending,
            }
          )
        }
      >
        <span>{label}</span>
      </NavLink>
    </li>
  );
};
