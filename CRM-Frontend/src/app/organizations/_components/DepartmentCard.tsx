import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Cog, Eye } from 'lucide-react';

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

               <Link href={`/departments/edit/${departmentInfo._id}`}>
                  <Cog className='h-6 w-6 text-gray-500 dark:text-gray-200 hover:text-primary duration-200 transition-colors cursor-pointer' />
               </Link>
            </CardFooter>
         </Card>
      </div>
   );
};

export default DepartmentCard;
