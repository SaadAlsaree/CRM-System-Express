import { useRouter } from 'next/navigation';
import React from 'react';

const UserItem = () => {
   const router = useRouter();

   const handelProfile = () => {
      router.push('/profile');
   };

   return (
      <div
         className='flex justify-between items-center gap-4 border rounded-[8px] px-4 py-2 cursor-pointer hover:shadow-md active:shadow-none duration-200 transition-all'
         onClick={handelProfile}
      >
         <div className='avatar rounded-full min-h-11 min-w-11 bg-emerald-500 text-white font-[700] flex justify-center items-center'>
            <p>S.A</p>
         </div>
         <div className='grow'>
            <p className='text-[16px] font-bold'>Saad Ace</p>
            <p className='text-[12px] text-neutral-500'>Saad@m14.com</p>
         </div>
      </div>
   );
};

export default UserItem;
