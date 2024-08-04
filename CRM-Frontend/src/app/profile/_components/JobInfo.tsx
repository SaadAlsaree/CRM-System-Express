import { Badge } from '@/components/ui/badge';
import React from 'react';

type Props = {
   jobInfo?: any;
};
const JobInfo = ({ jobInfo }: Props) => {
   return (
      <div className='flow-root m-4'>
         <div className='mt-2'>
            <h1 className='text-primary text-xl'>معلومات الوظيفة .</h1>
         </div>
         <dl className='-my-3 divide-y divide-gray-100 text-sm mt-4'>
            <div className='grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4'>
               <dt className='font-medium text-gray-900 dark:text-white'>الدائرة أو المديرية :</dt>
               <dd className='text-gray-700 sm:col-span-2'>
                  <Badge variant='outline' className='px-4 py-1'>
                     {jobInfo?.organization?.name}
                  </Badge>
               </dd>
            </div>

            <div className='grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4'>
               <dt className='font-medium text-gray-900 dark:text-white'>القسم :</dt>
               <dd className='text-gray-700 sm:col-span-2 dark:text-white'> {jobInfo?.department?.name}</dd>
            </div>

            <div className='grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4'>
               <dt className='font-medium text-gray-900 dark:text-white'>العنوان الوظيفي :</dt>
               <dd className='text-gray-700 sm:col-span-2 dark:text-white'>{jobInfo?.user?.work}</dd>
            </div>

            <div className='grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4'>
               <dt className='font-medium text-gray-900 dark:text-white'>المنصب :</dt>
               <dd className='text-gray-700 sm:col-span-2 dark:text-white'>{jobInfo?.rank?.rankName}</dd>
            </div>

            <div className='grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4'>
               <dt className='font-medium text-gray-900'>الصلاحيات :</dt>
               <dd className='text-gray-700 sm:col-span-2'>
                  {jobInfo?.role?.map((permission: any, index: number) => (
                     <Badge key={index} variant='default' className='mx-1'>
                        {permission.roleName}
                     </Badge>
                  ))}
               </dd>
            </div>
         </dl>
      </div>
   );
};

export default JobInfo;
