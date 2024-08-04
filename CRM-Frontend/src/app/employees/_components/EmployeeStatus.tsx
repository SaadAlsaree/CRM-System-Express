'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

//services
import { userClientService } from '@/services/user/user.client.service';
type Props = {
   userId: string;
   isActivated: boolean;
};

const EmployeeStatus = ({ userId, isActivated }: Props) => {
   const router = useRouter();
   const handelActivated = async (userId: string, isActivated: boolean) => {
      await userClientService.updateUserActivationStatus(userId, isActivated);
      router.refresh();
   };
   return (
      <div>
         {isActivated ? (
            <span
               className='bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 cursor-pointer'
               onClick={() => handelActivated(userId, false)}
            >
               مفعل
            </span>
         ) : (
            <span
               className='bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300 cursor-pointer'
               onClick={() => handelActivated(userId, true)}
            >
               غير مفعل
            </span>
         )}
      </div>
   );
};

export default EmployeeStatus;
