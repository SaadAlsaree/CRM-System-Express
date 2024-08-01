import Link from 'next/link';
import { Plus } from 'lucide-react';

import ProtectedPage from '@/components/ProtectedPage';
import { orgService } from '@/services/organization/org.server.service';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Divider } from '@/components';

import OrganizationView from '../../_components/OrganizationView';
import DepartmentList from '../../_components/DepartmentList';

interface Props {
   params: { id: string };
}
const OrganizationDetailsPage = async ({ params }: Props) => {
   let data;
   try {
      data = await orgService.getOrgById(params.id);
   } catch (error) {
      console.error('Failed to fetch organization data:', error);
      // Handle the error or set data to an appropriate default value
      data = { data: { organization: null, department: [] } };
   }

   const orgInfo = data?.data?.organization;
   const departments = data?.data?.department || [];

   return (
      <ProtectedPage>
         <div className='mt-8'>
            <div className='grid grid-cols-1 xl:grid-cols-2 gap-3'>
               <Card>
                  <h1 className='text-2xl font-bold text-primary'>تفاصيل الدائرة أو المديرية .</h1>
                  <Divider title='' />
                  <OrganizationView orgInfo={orgInfo} />
               </Card>
               <Card>
                  <div className='flex justify-between'>
                     <h1 className='text-xl font-bold text-primary'>الأقسام .</h1>
                     {/* Add New Department */}
                     <div>
                        <Button variant='outline'>
                           <Link href={`/departments/create/${orgInfo._id}`} className='ml-4'>
                              إضافة قسم جديد
                           </Link>
                           <Plus className='h-10 text-primary' />
                        </Button>
                     </div>
                  </div>
                  <Divider title='' />
                  <DepartmentList departments={departments} />
               </Card>
            </div>
            <Card className='mt-4'>
               <div>
                  <h1 className='text-xl font-bold text-primary'>الموظفين .</h1>
               </div>
            </Card>
         </div>
      </ProtectedPage>
   );
};

export default OrganizationDetailsPage;
