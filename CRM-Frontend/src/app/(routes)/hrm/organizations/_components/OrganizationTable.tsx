import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import OrganizationTableActions from './OrganizationTableActions';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

type Props = {
   searchParams: any;
   columns: { label: string; value: any; className?: string }[];
   OrgData: any;
};

const OrganizationTable = ({ searchParams, columns, OrgData }: Props) => {
   return (
      <Table>
         {/* <TableCaption>جدول المستخدمين</TableCaption> */}
         <TableHeader>
            <TableRow>
               {columns.map((column) => (
                  <TableHead align='right' key={column.value} className={column.className}>
                     {column.label}
                  </TableHead>
               ))}
            </TableRow>
         </TableHeader>
         <TableBody>
            {OrgData &&
               OrgData?.organizations.map((org: any) => (
                  <TableRow key={org._id}>
                     <TableCell>
                        <span className='text-primary hover:underline hover:font-medium duration-100 transition-all'>
                           <Link href={`/organizations/view/${org._id}`}>{org.name}</Link>
                        </span>
                        <div className='block md:hidden'>{org.code}</div>
                     </TableCell>
                     <TableCell className='hidden md:table-cell'>{org.code}</TableCell>

                     <TableCell className='hidden md:table-cell'>{org.address}</TableCell>
                     <TableCell className='hidden md:table-cell'>{org.phone}</TableCell>
                     <TableCell className='hidden md:table-cell'>{org.email}</TableCell>
                     {/* <TableCell className='hidden md:table-cell'>{org.website}</TableCell> */}
                     <TableCell>
                        <OrganizationTableActions OrgId={org._id} />
                     </TableCell>
                     {/* {columns.map((column) => (
                     <TableCell key={column.value}>
                        {column.value === 'actions' ? <OrganizationTableActions OrgId={org._id} /> : org[column.value]}
                     </TableCell>
                  ))} */}
                  </TableRow>
               ))}
         </TableBody>
      </Table>
   );
};

export default OrganizationTable;
