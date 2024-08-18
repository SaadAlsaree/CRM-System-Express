'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { UserCog } from 'lucide-react';

type Props = {
   employeeId: string;
};
const EmployeeAction = ({ employeeId }: Props) => {
   const router = useRouter();

   const handleEdit = () => {
      router.push(`/employees/edit/${employeeId}`);
   };
   return (
      <TooltipProvider>
         <Tooltip>
            <TooltipTrigger>
               <UserCog />
            </TooltipTrigger>
            <TooltipContent>
               <p>تعديل بيانات الموظف</p>
            </TooltipContent>
         </Tooltip>
      </TooltipProvider>
   );
};

export default EmployeeAction;
