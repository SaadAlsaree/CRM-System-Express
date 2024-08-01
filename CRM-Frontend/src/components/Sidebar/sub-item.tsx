'use client';
import { usePathname, useRouter } from 'next/navigation';
import React, { useMemo } from 'react';

interface ISubItem {
   name: string;
   path: string;
}

const SubMenuItem = ({ item }: { item: ISubItem }) => {
   const { name, path } = item;
   const router = useRouter();
   const pathname = usePathname();

   const onClick = () => {
      router.push(path);
   };

   const isActive = useMemo(() => path === pathname, [path, pathname]);

   return (
      <div
         className={`mr-5 text-gray-500 font-semibold hover:scale-105 duration-75 transition-all ease-in-out hover:text-primary cursor-pointer   ${
            isActive && 'text-primary font-semibold '
         } my-2`}
         onClick={onClick}
      >
         -{'  '}
         {name}
      </div>
   );
};

export default SubMenuItem;
