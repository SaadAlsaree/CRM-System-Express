import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import EmployeeStatus from './EmployeeStatus';
import { UserCog } from 'lucide-react';

interface Props {
   columns: { label: string; value: any; className?: string }[];
   searchParams: any;
   userData: any;
}
const EmployeesTable = ({ columns, searchParams, userData }: Props) => {
   return (
      <div>
         <Table>
            <TableHeader>
               <TableRow>
                  {columns.map((column, index) => (
                     <TableHead key={index} className={column.className}>
                        {column.label}
                     </TableHead>
                  ))}
               </TableRow>
            </TableHeader>
            <TableBody>
               {userData?.map((user: any, index: number) => (
                  <TableRow key={index}>
                     <TableCell className='text-primary hover:underline  duration-100 transition-all cursor-pointer'>
                        <Link href={`/profile/${user?._id}`}>{user?.username}</Link>
                        <div className='block md:hidden'>{user.userLogin}</div>
                     </TableCell>
                     <TableCell className='hidden md:table-cell'>{user.userLogin}</TableCell>
                     <TableCell className='hidden md:table-cell'>{user.organization.name}</TableCell>
                     <TableCell className='hidden md:table-cell'>{user.department.name}</TableCell>
                     <TableCell className='hidden md:table-cell'>{user?.user?.phone}</TableCell>
                     <TableCell className='hidden md:table-cell'>{user?.user?.email}</TableCell>
                     <TableCell className='hidden md:table-cell'>
                        <EmployeeStatus userId={user?._id} isActivated={user?.isActivated} />
                     </TableCell>
                     <TableCell className='hidden md:table-cell'>
                        <Link href={`/employees/edit/${user?._id}`}>
                           <UserCog className='hover:text-primary duration-200 transition-colors' />
                        </Link>
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </div>
   );
};

export default EmployeesTable;
