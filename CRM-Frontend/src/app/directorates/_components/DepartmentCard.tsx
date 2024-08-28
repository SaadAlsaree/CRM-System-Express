import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Cog, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Divider } from '@/components';
import DepartmentForm from './DepartmentForm';

type Props = {
   departmentInfo?: any;
};

const DepartmentCard = ({ departmentInfo }: Props) => {
   return (
      <div>
         <Card>
            <CardHeader>
               <CardTitle className='text-blue-600'>{departmentInfo.name}</CardTitle>
               <CardDescription>{departmentInfo.description}</CardDescription>
            </CardHeader>
            <CardContent>
               <CardDescription className='text-2xl text-cyan-500'>{departmentInfo.code}</CardDescription>
            </CardContent>
            <CardFooter className='flex justify-between -mb-6'>
               <Link href={`/departments/view/${departmentInfo._id}`}>
                  <Eye className='h-6 w-6 text-gray-500 dark:text-gray-200 hover:text-primary duration-200 transition-colors cursor-pointer' />
               </Link>

               <Dialog>
                  <DialogTrigger>
                     <Cog className='h-6 w-6 text-gray-500 dark:text-gray-200 hover:text-primary duration-200 transition-colors cursor-pointer' />
                  </DialogTrigger>
                  <DialogContent>
                     <DialogHeader>
                        <DialogTitle className='mb-4'>تأكد من بيانات القسم المراد أظافته .</DialogTitle>
                        <Divider title='' />
                        <DialogDescription className='mt-4'>
                           <DepartmentForm department={departmentInfo} />
                        </DialogDescription>
                     </DialogHeader>
                  </DialogContent>
               </Dialog>
            </CardFooter>
         </Card>
      </div>
   );
};

export default DepartmentCard;
