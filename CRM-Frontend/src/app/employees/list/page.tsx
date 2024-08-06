import Link from 'next/link';

import ProtectedPage from '@/components/ProtectedPage';
import EmployeesTable from '../_components/EmployeesTable';
//services
import { userServerService } from '@/services/user/user.server.service';
import Pagination from '@/components/Pagination';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, FileDown, Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import EmployeeSearch from '../_components/EmployeeSearch';
import EmployeeFilter from '../_components/EmployeeFilter';

const columns: { label: string; value: any; className?: string }[] = [
   { label: 'الأسم', value: 'name', className: 'font-bold' },
   { label: 'الترميز', value: 'code', className: 'hidden md:table-cell font-bold' },
   { label: 'المديرية', value: 'employees', className: 'hidden md:table-cell font-bold' },
   { label: 'القسم', value: 'address', className: 'hidden md:table-cell font-bold' },
   { label: 'الهاتف', value: 'phone', className: 'hidden md:table-cell font-bold' },
   { label: 'البريد الإلكتروني', value: 'email', className: 'hidden md:table-cell font-bold' },
   { label: 'حالة الموظف', value: 'isActivated', className: 'hidden md:table-cell font-bold' },
   // { label: 'الموقع الإلكتروني', value: 'website', className: 'hidden md:table-cell font-bold' },
   { label: 'الإجراءات', value: 'actions', className: 'font-bold' }
];

interface Props {
   searchParams: { page: string; username: string };
}

const EmployeesListPage = async ({ searchParams }: Props) => {
   const page = parseInt(searchParams.page) || 1;
   const pageSize = 12;

   const userList = await userServerService.getAllUsers(page);

   return (
      <ProtectedPage>
         <div>
            <Card>
               <div className='flex justify-between items-center mt-2 mb-6'>
                  <div className='flex flex-row gap-2'>
                     <Building2 className='text-primary' />
                     <div className='ml'>
                        <h1 className='text-2xl text-primary'>الموظفين</h1>
                        <h1 className='text-base text-muted-foreground'>قائمة موظفي الدوائر و المديريات جهاز الأمن الوطني .</h1>
                     </div>
                  </div>

                  <div className='flex flex-row items-center gap-2'>
                     {/* Search */}
                     <EmployeeSearch searchParams={searchParams} />

                     {/* Filter */}
                     <EmployeeFilter />

                     <Button variant='outline'>
                        <Link href='/employees/create' className='ml-4'>
                           استيراد بيانات
                        </Link>

                        <FileDown className='h-10 text-green-600' />
                     </Button>

                     <Button variant='outline'>
                        <Link href='/employees/create' className='ml-4'>
                           إضافة جديدة
                        </Link>

                        <Plus className='h-10 text-primary' />
                     </Button>
                  </div>
               </div>
               <EmployeesTable columns={columns} searchParams={searchParams} userData={userList?.data.users} />
               <Pagination itemCount={userList?.data?.totalUsers} pageSize={pageSize} currentPage={page} />
            </Card>
         </div>
      </ProtectedPage>
   );
};

export default EmployeesListPage;
