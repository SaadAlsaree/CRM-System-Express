import { Divider } from '@/components';
import ProtectedPage from '@/components/ProtectedPage';
import { Card } from '@/components/ui/card';
import React from 'react';
import Skeleton from 'react-loading-skeleton';

const OrganizationViewLoading = () => {
   return (
      <ProtectedPage>
         <div className='mt-8'>
            <div className='grid grid-cols-1 xl:grid-cols-2 gap-3'>
               <Card>
                  <h1 className='text-2xl font-bold text-primary'>تفاصيل الدائرة أو المديرية .</h1>
                  <Skeleton count={1} height={150} />
               </Card>
               <Card>
                  <div className='flex justify-between'>
                     <h1 className='text-xl font-bold text-primary'>الأقسام .</h1>
                     {/* Add New Department */}
                     <div>
                        <Skeleton count={1} height={40} />
                     </div>
                  </div>
                  <Divider title='' />
                  <Skeleton count={1} height={150} />
               </Card>
            </div>
            <Card className='mt-4'>
               <div>
                  <h1 className='text-xl font-bold text-primary'>الموظفين .</h1>
                  <Skeleton count={4} height={40} />
               </div>
            </Card>
         </div>
      </ProtectedPage>
   );
};

export default OrganizationViewLoading;
