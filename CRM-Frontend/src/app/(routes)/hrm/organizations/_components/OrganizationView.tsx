import { Badge } from '@/components/ui/badge';
import React from 'react';

type Props = {
   orgInfo?: any;
   userCount?: number;
};
const OrganizationView = ({ orgInfo, userCount }: Props) => {
   return (
      <div className='mt-4 h-96'>
         <div className='flow-root rounded-lg  border-gray-100 py-3'>
            <dl className='-my-3 divide-y divide-gray-100 text-sm'>
               <div className='grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4'>
                  <dt className='font-medium '>الأسم :</dt>
                  <dd className=' sm:col-span-2'>
                     <Badge variant='outline' className='text-md bg-blue-500 hover:bg-blue-400 text-white'>
                        دائرة {orgInfo?.name}
                     </Badge>
                  </dd>
               </div>

               <div className='grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4 dark:bg-gray-900'>
                  <dt className='font-medium '>الترميز :</dt>
                  <dd className=' sm:col-span-2'>{orgInfo?.code}</dd>
               </div>

               <div className='grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4'>
                  <dt className='font-medium '>رقم الهاتف :</dt>
                  <dd className=' sm:col-span-2'>{orgInfo?.phone}</dd>
               </div>

               <div className='grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4 dark:bg-gray-900'>
                  <dt className='font-medium '>عدد الموضفين :</dt>
                  <dd className=' sm:col-span-2'>{userCount}</dd>
               </div>
               <div className='grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4 '>
                  <dt className='font-medium '>البريد الألكتروني :</dt>
                  <dd className=' sm:col-span-2'>{orgInfo?.email}</dd>
               </div>
               <div className='grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4 dark:bg-gray-900'>
                  <dt className='font-medium '>العنوان :</dt>
                  <dd className=' sm:col-span-2'>{orgInfo?.address}</dd>
               </div>

               <div className='grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4'>
                  <dt className='font-medium '>الوصف :</dt>
                  <dd className='sm:col-span-2 truncate hover:text-wrap cursor-pointer'>{orgInfo?.description}</dd>
               </div>
            </dl>
         </div>
      </div>
   );
};

export default OrganizationView;
