import * as React from 'react';
import { Bell, BellDot, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface HeaderProps {
  auth: {
    name: string;
  } | null;
}

export const Header: React.FC<HeaderProps> = ({ auth }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [notifications, setNotifications] = React.useState(3);
  const [seetNotifications, setSeetNotifications] = React.useState(false);

  const handleClick = () => {
    setNotifications(0); // reset counter
    setSeetNotifications((prev) => !prev); // toggle dropdown
  };
  const firstLetter = auth?.name ? auth.name.charAt(0).toUpperCase() : 'U';
  const fullName = auth?.name ?? 'User';
  const firstName = fullName.split(' ')[0];
  return (
    <header className="h-19 flex items-center justify-between px-6 border-b shadow-sm bg-white">
      <hr className="border-[2px] w-full" />
      <div className="ml-10 flex items-center gap-3">
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback>{firstLetter}</AvatarFallback>
        </Avatar>
        <span>{firstName}</span>

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
        <Button
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
        )}
      </div>
    </header>
  );
};
export default Header;
