import { useSubmit } from '@remix-run/react';
import { Key, LogOut, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { avatarTextFromName } from '~/utils';

type UserProfileProps = {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
};

export const UserProfile = ({ user }: UserProfileProps) => {
  const submit = useSubmit();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="line-clamp-1 flex cursor-pointer items-center gap-1.5 text-ellipsis rounded-2xl border border-accent/10 p-2">
          <Avatar>
            <AvatarImage
              src={`https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=Felix${user.id}`}
              alt={user.email}
            />
            <AvatarFallback>{avatarTextFromName(user.name)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="line-clamp-1 text-ellipsis">{user.name}</p>
            <p className="text-xs font-medium text-muted-foreground">
              {user.role}
            </p>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Key className="mr-2 h-4 w-4" />
            <span>Change password</span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() =>
            submit(null, {
              method: 'post',
              action: '/logout',
            })
          }
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
