import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Link from 'next/link';
import DirectorateTableAction from './DirectorateTableAction';

type Props = {
   columns: { label: string; value: any; className?: string }[];
   searchParams: any;
   directorates: any;
};
const DirectorateTable = ({ columns, searchParams, directorates }: Props) => {
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
            {directorates &&
               directorates?.map((directorate: any) => (
                  <TableRow key={directorate._id}>
                     <TableCell>
                        <span className='text-primary hover:underline hover:font-medium duration-100 transition-all'>
                           <Link href={`/directorates/view/${directorate._id}`}>{directorate.name}</Link>
                        </span>
                        <div className='block md:hidden'>{directorate.code}</div>
                     </TableCell>
                     <TableCell className='hidden md:table-cell'>{directorate.code}</TableCell>
                     <TableCell className='hidden md:table-cell'>{directorate?.organization?.name}</TableCell>
                     <TableCell className='hidden md:table-cell'>{directorate.address}</TableCell>
                     <TableCell className='hidden md:table-cell'>{directorate.phone}</TableCell>
                     <TableCell className='hidden md:table-cell'>{directorate.email}</TableCell>
                     {/* <TableCell className='hidden md:table-cell'>{org.website}</TableCell> */}
                     <TableCell>
                        <DirectorateTableAction directorateId={directorate._id} />
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

export default DirectorateTable;
