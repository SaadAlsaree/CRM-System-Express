import ProtectedPage from '@/components/ProtectedPage';
import EmployeesTable from '../_components/EmployeesTable';
//services
import { userServerService } from '@/services/user/user.server.service';
import Pagination from '@/components/Pagination';
import { Card } from '@/components/ui/card';

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
         <Card>
            <EmployeesTable columns={columns} searchParams={searchParams} userData={userList?.data.users} />
            <Pagination itemCount={userList?.data?.totalUsers} pageSize={pageSize} currentPage={page} />
         </Card>
      </ProtectedPage>
   );
};

export default EmployeesListPage;
