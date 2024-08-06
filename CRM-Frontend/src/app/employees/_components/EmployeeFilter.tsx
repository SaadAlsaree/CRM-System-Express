'use client';
import React from 'react';
import { useRouter } from "next/navigation";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type EmployeeFilterProps = {
   searchParams?: { organization?: string; department?: string };
};


const EmployeeFilter = (organization: any) => {
    const router = useRouter();
    const query = (organization && organization !== 'All') ? `?status=${organization}` : ''


    const handleOrganizationChange = (e: any) => {
        
        router.push('/employees/list' + query)};
    };
    
   return (
      <div className='flex flex-row gap-1'>
         <Select onOpenChange={handleOrganizationChange(e.target.value)}>
            <SelectTrigger className='w-[150px]'>
               <SelectValue placeholder='الدوائر' />
            </SelectTrigger>
            <SelectContent>
               <SelectItem value='light'>الكل</SelectItem>
               <SelectItem value='light'>أمن الأتصالات</SelectItem>
               <SelectItem value='dark'>التناقل الأمن</SelectItem>
            </SelectContent>
         </Select>
         <Select>
            <SelectTrigger className='w-[150px]'>
               <SelectValue placeholder='الأقسام' />
            </SelectTrigger>
            <SelectContent>
               <SelectItem value='light'>الكل</SelectItem>
               <SelectItem value='light'>قسم التحليل</SelectItem>
            </SelectContent>
         </Select>
      </div>
   );
};

export default EmployeeFilter;
