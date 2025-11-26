import * as React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useRouter } from '@tanstack/react-router';
import { Button } from './ui/button';
import type { FC } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/stores/auth.ts';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';

export const Header: FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const router = useRouter();
  const auth = useAuth();
  const authUser = auth.user;

  const firstLetter = authUser?.name
    ? authUser.name.charAt(0).toUpperCase()
    : 'U';
  const fullName = authUser?.name ?? 'User';
  const firstName = fullName.split(' ')[0];

  return (
    <header className="flex items-center justify-between h-16  bg-gray-50  px-6">
      <div className="flex-1 border-2 border-[#00204A] mx-4 border-t rounded-xl "></div>
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback className="font-semibold text-white bg-[#001F3F]">
            {firstLetter}
          </AvatarFallback>
        </Avatar>
        <span className="font-medium">{firstName}</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              onClick={() => setIsOpen(!isOpen)}
              variant="ghost"
              size="icon-sm"
            >
              {isOpen ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => {
                auth.logout();
                router.navigate({ to: '/login' });
              }}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
