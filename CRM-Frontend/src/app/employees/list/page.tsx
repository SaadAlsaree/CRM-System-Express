import Link from 'next/link';

import ProtectedPage from '@/components/ProtectedPage';
import Pagination from '@/components/Pagination';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import EmployeesTable from '../_components/EmployeesTable';
import EmployeeFilter from '../_components/EmployeeFilter';
//services
import { userServerService } from '@/services/user/user.server.service';
import { orgService } from '@/services/organization/org.server.service';
//Icons
import { Building2, FileDown, Filter, Plus, Search } from 'lucide-react';

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
   { label: 'الإعدادات', value: 'actions', className: 'font-bold' }
];

interface Props {
   searchParams: { page: string; search: string; organization: string; department: string };
}

const EmployeesListPage = async ({ searchParams }: Props) => {
   const page = parseInt(searchParams.page) || 1;
   const pageSize = 12;
   const userLogin = searchParams.search || '';
   const organizationId = searchParams.organization || '';
   const departmentId = searchParams.department || '';

   const orgList = await orgService.getOrgs();
   const userList = await userServerService.getAllUsers(page, userLogin, organizationId, departmentId);

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
                     {/* <Popover>
                        <PopoverTrigger className='w-full'>
                           <div className='border rounded-md px-4 py-[7px] flex items-center gap-4'>
                              <h1 className='text-muted-foreground'>فلترة</h1>
                              <Filter className=' text-muted-foreground' />
                           </div>
                        </PopoverTrigger>
                        <PopoverContent className='w-full'>
                           <EmployeeFilter orgList={orgList} />
                        </PopoverContent>
                     </Popover> */}
                     {/* Filter */}
                     <EmployeeFilter orgList={orgList} />

                     <Button variant='outline'>
                        <Link href='/employees/importFromExcel' className='ml-4'>
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
