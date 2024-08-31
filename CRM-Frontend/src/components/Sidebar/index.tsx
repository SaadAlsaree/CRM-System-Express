'use client';
import React, { useEffect, useRef, useState } from 'react';
import items from '@/routes';
import SidebarItem from './item';
import UserItem from './UserItem';

interface SidebarProps {
   sidebarOpen: boolean;
   setSidebarOpen: (arg: boolean) => void;
}

// Roles
const roles = ['admin', 'employee'];

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
   const trigger = useRef<any>(null);
   const sidebar = useRef<any>(null);

   let storedSidebarExpanded = 'true';

   const [sidebarExpanded, setSidebarExpanded] = useState(storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true');

   // close on click outside
   useEffect(() => {
      const clickHandler = ({ target }: MouseEvent) => {
         if (!sidebar.current || !trigger.current) return;
         if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
         setSidebarOpen(false);
      };
      document.addEventListener('click', clickHandler);
      return () => document.removeEventListener('click', clickHandler);
   });

   // close if the esc key is pressed
   useEffect(() => {
      const keyHandler = ({ key }: KeyboardEvent) => {
         if (!sidebarOpen || key !== 'Escape') return;
         setSidebarOpen(false);
      };
      document.addEventListener('keydown', keyHandler);
      return () => document.removeEventListener('keydown', keyHandler);
   });

   useEffect(() => {
      localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
      if (sidebarExpanded) {
         document.querySelector('body')?.classList.add('sidebar-expanded');
      } else {
         document.querySelector('body')?.classList.remove('sidebar-expanded');
      }
   }, [sidebarExpanded]);

   return (
      <nav
         className={`absolute right-0 h-screen z-10 flex w-64 flex-col bg-white overflow-y-hidden border-l duration-200 ease-linear dark:border-gray-700 dark:bg-slate-900 lg:translate-x-0 lg:static  ${
            sidebarOpen ? 'translate-x-0' : 'translate-x-full'
         }`}
      >
         <div className='flex-col min-h-full flex  w-full gap-3'>
            <div className='flex flex-col overflow-y-auto overflow-x-hidden p-3'>
               <div
                  // ref={trigger}
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  aria-controls='sidebar'
                  aria-expanded={sidebarOpen}
                  className='block lg:hidden h-5 w-5 duration-200 transition-colors text-gray-300 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer '
               >
                  icon
               </div>
            </div>
            logo
            <div className='md:flex-col md:min-w-full flex flex-col  p-3 grow'>
               {items.map((item, index) => roles.includes(item.permission) && <SidebarItem key={index} item={item} />)}
            </div>
            <div className='mb-2 mx-2'>
               <UserItem />
            </div>
         </div>
      </nav>
   );
};

export default Sidebar;
