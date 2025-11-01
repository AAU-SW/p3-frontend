import type { FC } from 'react';
import * as React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/stores/auth.ts';

export const Header: FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const auth = useAuth();
  const authUser = auth.user;
  /* const [notifications, setNotifications] = React.useState(3);
  const [seetNotifications, setSeetNotifications] = React.useState(false); */

  /* const handleClick = () => {
    setNotifications(0); // reset counter
    setSeetNotifications((prev) => !prev); // toggle dropdown
  }; */
  const firstLetter = authUser?.name
    ? authUser.name.charAt(0).toUpperCase()
    : 'U';
  const fullName = authUser?.name ?? 'User';
  const firstName = fullName.split(' ')[0];
  return (
    <header className="h-19 flex items-center justify-between px-6 border-b shadow-sm bg-white">
      <div className=" flex ml-auto gap-3">
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback>{firstLetter}</AvatarFallback>
        </Avatar>
        <span className=" m-auto">{firstName}</span>

        <Button
          onClick={setIsOpen.bind(null, !isOpen)}
          variant="ghost"
          size="icon-sm"
        >
          {isOpen ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronUp className="w-4 h-4" />
          )}
        </Button>
        {/* <Button
          className="-ml-4"
          onClick={handleClick}
          variant="ghost"
          size="icon-sm"
        >
          {notifications > 0 ? (
            <BellDot className="w-4 h-4" />
          ) : (
            <Bell className="w-4 h-4" />
          )}
        </Button>
        {seetNotifications && (
          <div className="absolute right-0 top-17 mt-2 w-[200px] h-[300px] border-2 bg-white shadow-lg z-10">
            <p className="p-4">hello</p>
          </div>
        )} */}
      </div>
    </header>
  );
};
export default Header;
