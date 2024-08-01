import React from 'react';
import { DarkModeToggle } from './darkmode-toggle';
import NavbarLogo from './navbar-logo';
import { SlidersHorizontal } from 'lucide-react';
import UserSetting from './UserSetting';

type Props = {
   sidebarOpen: string | boolean | undefined;
   setSidebarOpen: (arg0: boolean) => void;
};
const Navbar = ({ setSidebarOpen, sidebarOpen }: Props) => {
   return (
      <nav className='sticky top-0 lg:z-50 flex w-full items-center justify-between border-b bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
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
         <div className='flex gap-3'>
            {/* <Search /> */}

            <span>
               <DarkModeToggle />
            </span>
            <UserSetting />
         </div>
      </nav>
   );
};

export default Navbar;
