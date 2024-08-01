import ProtectedPage from '@/components/ProtectedPage';
import EmployeesTable from '../_components/EmployeesTable';

const columns: { label: string; value: any; className?: string }[] = [
   { label: 'الأسم', value: 'name', className: 'font-bold' },
   { label: 'الترميز', value: 'code', className: 'hidden md:table-cell font-bold' },
   { label: 'المديرية', value: 'employees', className: 'hidden md:table-cell font-bold' },
   { label: 'القسم', value: 'address', className: 'hidden md:table-cell font-bold' },
   { label: 'المنصب', value: 'type', className: 'hidden md:table-cell font-bold' },
   { label: 'الهاتف', value: 'phone', className: 'hidden md:table-cell font-bold' },
   { label: 'البريد الإلكتروني', value: 'email', className: 'hidden md:table-cell font-bold' },
   // { label: 'الموقع الإلكتروني', value: 'website', className: 'hidden md:table-cell font-bold' },
   { label: 'الإجراءات', value: 'actions', className: 'font-bold' }
];

interface Props {
   searchParams: any;
}

const EmployeesListPage = ({ searchParams }: Props) => {
   return (
      <ProtectedPage>
         <div>
            <EmployeesTable columns={columns} searchParams={searchParams} />
         </div>
      </ProtectedPage>
   );
};

export default EmployeesListPage;
