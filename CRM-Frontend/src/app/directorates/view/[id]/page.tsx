import Link from 'next/link';

import ProtectedPage from '@/components/ProtectedPage';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Divider } from '@/components';
import DirectorateView from '../../_components/DirectorateView';
import EmployeesTable from '@/app/employees/_components/EmployeesTable';
//service
import { directorateService } from '@/services/directorate/directorate.server.service';
import DepartmentList from '@/app/organizations/_components/DepartmentList';
import { Plus } from 'lucide-react';

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

type Props = {
   params: { id: string };
};

const DirectorateViewPage = async ({ params }: Props) => {
   const directorate = await directorateService.getDirectorateById(params.id, 1);

   const departments = directorate?.Data?.department;
   const users = directorate?.Users;
   const userCount = directorate?.userCount;

   return (
      <ProtectedPage>
         <div className='mt-8'>
            <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 gap-3'>
               <Card>
                  <h1 className='text-2xl font-bold text-primary'>تفاصيل المديرية .</h1>
                  <Divider title='' />
                  <DirectorateView directorate={directorate.Data} userCount={userCount} />
               </Card>

               <Card>
                  <div className='flex justify-between'>
                     <h1 className='text-xl font-bold text-primary'>الأقسام .</h1>
                     {/* Add New Department */}
                     <div>
                        <Button variant='outline'>
                           <Link href={`/departments/create/${directorate?.Data?._id}`} className='ml-4'>
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
      </ProtectedPage>
   );
};

export default DirectorateViewPage;
