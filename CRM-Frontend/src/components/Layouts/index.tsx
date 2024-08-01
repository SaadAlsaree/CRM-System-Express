'use client';
import React, { useState } from 'react';
import { Navbar } from '@/components';
import Sidebar from '@/components/Sidebar';

type Props = {
   children: React.ReactNode;
};
const Layout = ({ children }: Props) => {
   const [sidebarOpen, setSidebarOpen] = useState(false);

   return (
      <div>
         {true && (
            <div className='flex h-screen overflow-hidden'>
               <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

               <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
                  <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                  <main className='2xl:p-3 xl:p-2 p-1'>{children}</main>
               </div>
            </div>
         )}
      </div>
   );
};

export default Layout;
