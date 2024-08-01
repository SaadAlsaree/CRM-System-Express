import ProtectedPage from '@/components/ProtectedPage';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Building2, Link, Plus } from 'lucide-react';
import React from 'react';
import Skeleton from 'react-loading-skeleton';

const OrganizationListLoadingPage = () => {
   return (
      <ProtectedPage>
         <div>
            <Card>
               <div className='flex justify-between items-center mt-2 mb-6'>
                  <div className='flex flex-row gap-2'>
                     <Building2 className='text-primary' />
                     <h1 className='text-2xl font-bold text-primary'>قائمة الدوائر و المديريات .</h1>
                  </div>

                  <div className='flex flex-row items-center gap-2'>
                     {/* <Button variant='outline'>فلتر</Button> */}

                     <Button variant='outline'>
                        <Link href='/organizations/create' className='ml-4'>
                           إضافة جديدة
                        </Link>

                        <Plus className='h-10 text-gray-400' />
                     </Button>
                  </div>
               </div>
               <Skeleton count={10} height={30} />
            </Card>
         </div>
      </ProtectedPage>
   );
};

export default OrganizationListLoadingPage;
