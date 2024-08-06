'use client';
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
// Icons
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

type EmployeeFilterProps = {
   orgList?: any;
};

const EmployeeFilter = ({ orgList }: EmployeeFilterProps) => {
   const router = useRouter();
   const searchParams = useSearchParams();

   // Get the current query parameters
   const currentOrg = searchParams.get('organization') || '';
   const currentDept = searchParams.get('department') || '';
   const search = searchParams.get('search') || '';

   const updateQuery = (key: string, value: string | undefined) => {
      const urlParams = new URLSearchParams(window.location.search);
      if (value) {
         urlParams.set(key, value);
      } else {
         urlParams.delete(key);
      }
      router.push(`?${urlParams.toString()}`);
   };

   const handleOrganizationChange = (orgId: string) => {
      if (orgId === 'All') {
         updateQuery('organization', '');
      } else {
         updateQuery('organization', orgId);
      }
   };

   const handleDepartmentChange = (depId: string) => {
      if (depId === 'All') {
         updateQuery('department', '');
      } else {
         updateQuery('department', depId);
      }
   };

   const handleStatusChange = (search: any) => {
      console.log(search);
      if (search === '') {
         updateQuery('search', '');
      } else {
         updateQuery('search', search);
      }
   };

   const orgOptions = orgList?.organizations?.map((org: Record<string, string>) => ({ label: org.name, value: org._id })) || [];

   return (
      <div className='flex flex-row gap-2'>
         <div className='relative ml-auto flex-1 md:grow-0'>
            <Button className='absolute left-0'>
               <Search className='h-4 w-4 ' />
            </Button>
            {/* <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground font-bold hover:text-blue-500 cursor-pointer duration-200 transition-colors' /> */}
            <Input
               value={search}
               type='search'
               placeholder='بحث ...'
               className='w-full rounded-lg bg-background pl-14 md:w-[200px] lg:w-[250px]'
               onChange={(e) => handleStatusChange(e.target.value)}
            />
         </div>
         <Select value={currentOrg} onValueChange={handleOrganizationChange}>
            <SelectTrigger className='w-[150px]'>
               <SelectValue placeholder='المديرية' />
            </SelectTrigger>
            <SelectContent>
               <SelectItem value='All'>الكل</SelectItem>
               {orgOptions.map((org: any) => (
                  <SelectItem key={org.value} value={org.value}>
                     {org.label}
                  </SelectItem>
               ))}
            </SelectContent>
         </Select>
         <Select value={currentDept} onValueChange={handleDepartmentChange} disabled>
            <SelectTrigger className='w-[150px]'>
               <SelectValue placeholder='القسم' />
            </SelectTrigger>
            <SelectContent>
               <SelectItem value='All'>الكل</SelectItem>
               <SelectItem value='light'>قسم التحليل</SelectItem>
               <SelectItem value='black'>قسم آخر</SelectItem>
            </SelectContent>
         </Select>
      </div>
   );
};

export default EmployeeFilter;
