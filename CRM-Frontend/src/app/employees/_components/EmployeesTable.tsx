import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Props {
   columns: { label: string; value: any; className?: string }[];
   searchParams: any;
}
const EmployeesTable = ({ columns, searchParams }: Props) => {
   return (
      <Card>
         <CardHeader className='px-7'>
            <CardTitle className='text-primary'>الموظفين</CardTitle>
            <CardDescription>قائمة موظفي الدوائر و المديريات جهاز الأمن الوطني .</CardDescription>
         </CardHeader>
         <CardContent>
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
                  <TableRow className='hover:bg-accent cursor-pointer'>
                     <TableCell>
                        <div className='font-medium'>Liam Johnson</div>
                        <div className='hidden text-sm text-muted-foreground md:inline'>liam@example.com</div>
                     </TableCell>
                     <TableCell className='hidden sm:table-cell'>Sale</TableCell>
                     <TableCell className='hidden sm:table-cell'>
                        <Badge className='text-xs' variant='secondary'>
                           Fulfilled
                        </Badge>
                     </TableCell>
                     <TableCell className='hidden md:table-cell'>2023-06-23</TableCell>
                     <TableCell className='text-right'>$250.00</TableCell>
                  </TableRow>
                  <TableRow>
                     <TableCell>
                        <div className='font-medium'>Olivia Smith</div>
                        <div className='hidden text-sm text-muted-foreground md:inline'>olivia@example.com</div>
                     </TableCell>
                     <TableCell className='hidden sm:table-cell'>Refund</TableCell>
                     <TableCell className='hidden sm:table-cell'>
                        <Badge className='text-xs' variant='outline'>
                           Declined
                        </Badge>
                     </TableCell>
                     <TableCell className='hidden md:table-cell'>2023-06-24</TableCell>
                     <TableCell className='text-right'>$150.00</TableCell>
                  </TableRow>
                  <TableRow>
                     <TableCell>
                        <div className='font-medium'>Noah Williams</div>
                        <div className='hidden text-sm text-muted-foreground md:inline'>noah@example.com</div>
                     </TableCell>
                     <TableCell className='hidden sm:table-cell'>Subscription</TableCell>
                     <TableCell className='hidden sm:table-cell'>
                        <Badge className='text-xs' variant='secondary'>
                           Fulfilled
                        </Badge>
                     </TableCell>
                     <TableCell className='hidden md:table-cell'>2023-06-25</TableCell>
                     <TableCell className='text-right'>$350.00</TableCell>
                  </TableRow>
                  <TableRow>
                     <TableCell>
                        <div className='font-medium'>Emma Brown</div>
                        <div className='hidden text-sm text-muted-foreground md:inline'>emma@example.com</div>
                     </TableCell>
                     <TableCell className='hidden sm:table-cell'>Sale</TableCell>
                     <TableCell className='hidden sm:table-cell'>
                        <Badge className='text-xs' variant='secondary'>
                           Fulfilled
                        </Badge>
                     </TableCell>
                     <TableCell className='hidden md:table-cell'>2023-06-26</TableCell>
                     <TableCell className='text-right'>$450.00</TableCell>
                  </TableRow>
                  <TableRow>
                     <TableCell>
                        <div className='font-medium'>Liam Johnson</div>
                        <div className='hidden text-sm text-muted-foreground md:inline'>liam@example.com</div>
                     </TableCell>
                     <TableCell className='hidden sm:table-cell'>Sale</TableCell>
                     <TableCell className='hidden sm:table-cell'>
                        <Badge className='text-xs' variant='secondary'>
                           Fulfilled
                        </Badge>
                     </TableCell>
                     <TableCell className='hidden md:table-cell'>2023-06-23</TableCell>
                     <TableCell className='text-right'>$250.00</TableCell>
                  </TableRow>
                  <TableRow>
                     <TableCell>
                        <div className='font-medium'>Liam Johnson</div>
                        <div className='hidden text-sm text-muted-foreground md:inline'>liam@example.com</div>
                     </TableCell>
                     <TableCell className='hidden sm:table-cell'>Sale</TableCell>
                     <TableCell className='hidden sm:table-cell'>
                        <Badge className='text-xs' variant='secondary'>
                           Fulfilled
                        </Badge>
                     </TableCell>
                     <TableCell className='hidden md:table-cell'>2023-06-23</TableCell>
                     <TableCell className='text-right'>$250.00</TableCell>
                  </TableRow>
                  <TableRow>
                     <TableCell>
                        <div className='font-medium'>Olivia Smith</div>
                        <div className='hidden text-sm text-muted-foreground md:inline'>olivia@example.com</div>
                     </TableCell>
                     <TableCell className='hidden sm:table-cell'>Refund</TableCell>
                     <TableCell className='hidden sm:table-cell'>
                        <Badge className='text-xs' variant='outline'>
                           Declined
                        </Badge>
                     </TableCell>
                     <TableCell className='hidden md:table-cell'>2023-06-24</TableCell>
                     <TableCell className='text-right'>$150.00</TableCell>
                  </TableRow>
                  <TableRow>
                     <TableCell>
                        <div className='font-medium'>Emma Brown</div>
                        <div className='hidden text-sm text-muted-foreground md:inline'>emma@example.com</div>
                     </TableCell>
                     <TableCell className='hidden sm:table-cell'>Sale</TableCell>
                     <TableCell className='hidden sm:table-cell'>
                        <Badge className='text-xs' variant='secondary'>
                           Fulfilled
                        </Badge>
                     </TableCell>
                     <TableCell className='hidden md:table-cell'>2023-06-26</TableCell>
                     <TableCell className='text-right'>$450.00</TableCell>
                  </TableRow>
               </TableBody>
            </Table>
         </CardContent>
      </Card>
   );
};

export default EmployeesTable;
