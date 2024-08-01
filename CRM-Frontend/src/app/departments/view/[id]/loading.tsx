import { Divider } from '@/components';
import ProtectedPage from '@/components/ProtectedPage';
import { Card } from '@/components/ui/card';
import React from 'react';
import Skeleton from 'react-loading-skeleton';

const DepartmentViewLoading = () => {
   return (
      <ProtectedPage>
         <Card className='mx-10 xl:mx-32 2xl:mx-40 mt-16'>
            <h1 className='text-2xl font-bold text-primary'>تفاصيل القسم .</h1>
            <Divider title='' />
            <div className='flow-root mt-12 p-4'>
               <dl className='-my-3 divide-y divide-gray-100 text-sm '>
                  <div className='grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4'>
                     <dt className='font-medium text-gray-900'>الأسم :</dt>
                     <dd className='text-gray-700 sm:col-span-2'>
                        <Skeleton width={200} height={20} />
                     </dd>
                  </div>

                  <div className='grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4 dark:bg-gray-900'>
                     <dt className='font-medium text-gray-900'>الترميز :</dt>
                     <dd className='text-gray-700 sm:col-span-2'>
                        <Skeleton width={200} height={20} />
                     </dd>
                  </div>

                  <div className='grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4'>
                     <dt className='font-medium text-gray-900'>البريد الألكتروني :</dt>
                     <dd className='text-gray-700 sm:col-span-2'>
                        <Skeleton width={200} height={20} />
                     </dd>
                  </div>

                  <div className='grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4 dark:bg-gray-900'>
                     <dt className='font-medium text-gray-900'>رقم الهاتف :</dt>
                     <dd className='text-gray-700 sm:col-span-2'>
                        <Skeleton width={200} height={20} />
                     </dd>
                  </div>

                  <div className='grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4'>
                     <dt className='font-medium text-gray-900'>الوصف :</dt>
                     <dd className='text-gray-700 sm:col-span-2'>
                        <Skeleton width={200} height={20} />
                     </dd>
                  </div>

                  <div className='grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4 dark:bg-gray-900'>
                     <dt className='font-medium text-gray-900'> تاريخ الأنشاء :</dt>
                     <dd className='text-gray-700 sm:col-span-2'>
                        {' '}
                        <Skeleton width={200} height={20} />
                     </dd>
                  </div>
               </dl>
            </div>
         </Card>
      </ProtectedPage>
   );
};

export default DepartmentViewLoading;
