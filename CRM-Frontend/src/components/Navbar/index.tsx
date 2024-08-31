import React from 'react';
import { DarkModeToggle } from './darkmode-toggle';
import NavbarLogo from './navbar-logo';
import { Pi, SlidersHorizontal } from 'lucide-react';
import UserSetting from './UserSetting';
//icons
import { MdOutlineNotifications } from 'react-icons/md';
import { HiOutlineChatBubbleLeftEllipsis } from 'react-icons/hi2';

type Props = {
   sidebarOpen: string | boolean | undefined;
   setSidebarOpen: (arg0: boolean) => void;
};
const Navbar = ({ setSidebarOpen, sidebarOpen }: Props) => {
   return (
      <nav className='sticky top-0 lg:z-50 flex w-full items-center justify-between border-b bg-white p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
         <div className='flex items-center gap-6'>
            <div
               className='lg:hidden'
               onClick={(e) => {
                  e.stopPropagation();
                  setSidebarOpen(!sidebarOpen);
               }}
            >
               <SlidersHorizontal className='h-5 w-5 duration-200 transition-colors cursor-pointer text-gray-500 hover:text-gray-700 dark:hover:text-gray-300' />
            </div>
            <NavbarLogo />
         </div>
         <div className='flex gap-3 items-center'>
            {/* <Search /> */}

            <span>
               <DarkModeToggle />
            </span>
            <HiOutlineChatBubbleLeftEllipsis className='h-6 w-6 text-gray-500 dark:text-gray-300 cursor-pointer hover:text-primary duration-200 transition-colors' />
            <MdOutlineNotifications className='h-6 w-6 text-gray-500 dark:text-gray-300 cursor-pointer hover:text-primary duration-200 transition-colors' />
            <UserSetting />
         </div>
      </nav>
   );
};

export default Navbar;
