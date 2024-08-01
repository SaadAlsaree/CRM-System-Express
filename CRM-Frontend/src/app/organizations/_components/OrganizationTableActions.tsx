'use client';
import React from 'react';
import { Delete, FilePenLine, Link, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const OrganizationTableActions = ({ OrgId }: { OrgId: string }) => {
   const route = useRouter();

   const handleEdit = () => {
      route.push(`/organizations/edit/${OrgId}`);
   };
   const handleDelete = () => {
      console.log(OrgId);
   };

   return (
      <div className='flex flex-row items-center gap-2'>
         <TooltipProvider>
            <Tooltip>
               <TooltipTrigger>
                  <FilePenLine
                     width='20'
                     height='20'
                     className='text-blue-600 duration-150 transition-colors cursor-pointer'
                     onClick={handleEdit}
                  />
               </TooltipTrigger>
               <TooltipContent>
                  <p>تعديل الحقل</p>
               </TooltipContent>
            </Tooltip>
            <Tooltip>
               <TooltipTrigger>
                  <Trash2
                     width='20'
                     height='20'
                     className='text-red-600 duration-150 transition-colors cursor-pointer'
                     onClick={handleDelete}
                  />
               </TooltipTrigger>
               <TooltipContent>
                  <p>حذف الحقل</p>
               </TooltipContent>
            </Tooltip>
         </TooltipProvider>
      </div>
   );
};

export default OrganizationTableActions;
