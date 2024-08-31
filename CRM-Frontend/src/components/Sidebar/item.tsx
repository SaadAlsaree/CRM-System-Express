'use client';
import { useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

import { ISidebarItem } from '@/types/navigation.routes';
import SubMenuItem from './sub-item';

const roles = ['employee', 'admin'];
const SidebarItem = ({ item }: { item: ISidebarItem }) => {
   const { name, icon: Icon, items, path } = item;
   const [expanded, setExpanded] = useState(false);
   const router = useRouter();
   const pathname = usePathname();

   const onClick = () => {
      if (items && items.length > 0) {
         return setExpanded(!expanded);
      }

      return router.push(path);
   };
   const isActive = useMemo(() => {
      if (items && items.length > 0) {
         if (items.find((item) => item.path === pathname)) {
            setExpanded(true);
            return true;
         }
      }

      return path === pathname;
   }, [items, path, pathname]);

   return (
      <>
         <div
            className={`flex items-center text-gray-500 p-3 rounded-lg hover:bg-violet-500 hover:dark:bg-gray-800 cursor-pointer hover:text-white justify-between duration-200 transition-colors my-1
       ${isActive && 'text-white bg-primary dark:bg-gray-800 dark:text-primary font-semibold'}
      `}
            onClick={onClick}
         >
            <div className='flex items-center gap-3'>
               <Icon size={20} />
               <p className='text-sm font-semibold'>{name} </p>
            </div>
            {items && items.length > 0 && <ChevronDown size={18} />}
         </div>
         {expanded && items && items.length > 0 && (
            <div className='flex flex-col space-y-1 ml-10'>
               {items.map((item) => roles.includes(item.permission) && <SubMenuItem key={item.path} item={item} />)}
            </div>
         )}
      </>
   );
};

export default SidebarItem;
