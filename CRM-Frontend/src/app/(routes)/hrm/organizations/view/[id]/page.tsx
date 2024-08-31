import Link from 'next/link';
import { Plus } from 'lucide-react';

import { orgService } from '@/services/organization/org.server.service';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Divider } from '@/components';

import OrganizationView from '../../_components/OrganizationView';
import DepartmentList from '../../_components/DepartmentList';
import DirectoratesList from '../../_components/DirectoratesList';
import EmployeesTable from '@/app/(routes)/hrm/employees/_components/EmployeesTable';

const columns: { label: string; value: any; className?: string }[] = [
   { label: 'الأسم', value: 'name', className: 'font-bold' },
   { label: 'الترميز', value: 'code', className: 'hidden md:table-cell font-bold' },
   { label: 'الدائرة', value: 'organization', className: 'hidden md:table-cell font-bold' },
   { label: 'المديرية', value: 'directorate', className: 'hidden md:table-cell font-bold' },
   { label: 'القسم', value: 'address', className: 'hidden md:table-cell font-bold' },
   { label: 'الهاتف', value: 'phone', className: 'hidden md:table-cell font-bold' },
   { label: 'البريد الإلكتروني', value: 'email', className: 'hidden md:table-cell font-bold' },
   { label: 'حالة الموظف', value: 'isActivated', className: 'hidden md:table-cell font-bold' },
   // { label: 'الموقع الإلكتروني', value: 'website', className: 'hidden md:table-cell font-bold' },
   { label: 'الإجراءات', value: 'actions', className: 'font-bold' }
];

interface Props {
   params: { id: string };
}
const OrganizationDetailsPage = async ({ params }: Props) => {
   let data;
   let userCount: number = 0;
   try {
      data = await orgService.getOrgById(params.id, 1);
      userCount = await orgService.getUserCountInOrganization(params.id);
   } catch (error) {
      console.error('Failed to fetch organization data:', error);
      // Handle the error or set data to an appropriate default value
      data = { data: { organization: null, department: [] } };
   }

   const orgInfo = data?.data?.Organization;
   const departments = data?.data?.Organization?.department || [];
   const directorates = data?.data?.Organization?.directorate || [];
   const users = data?.data?.Users || [];

   // console.log(users);

   return (
      <div>
         <div className='mt-8'>
            <div className='grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 gap-3'>
               <Card>
                  <h1 className='text-2xl font-bold text-primary'>تفاصيل الدائرة .</h1>
                  <Divider title='' />
                  <OrganizationView orgInfo={orgInfo} userCount={userCount} />
               </Card>

               <Card>
                  <div className='flex justify-between'>
                     <h1 className='text-xl font-bold text-primary'>المديريات .</h1>
                     <div>
                        <h1 className='text-gray-500'>عدد المديريات : {directorates.length}</h1>
                     </div>
                  </div>
                  <Divider title='' />
                  <DirectoratesList directorates={directorates} />
               </Card>

               <Card>
                  <div className='flex justify-between'>
                     <h1 className='text-xl font-bold text-primary'>الأقسام .</h1>
                     {/* Add New Department */}
                     <div>
                        <Button variant='outline'>
                           <Link href={`/departments/create/${orgInfo?._id}`} className='ml-4'>
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

               <EmployeesTable userData={users} columns={columns} />
            </Card>
         </div>
      </div>
   );
};

export default OrganizationDetailsPage;
