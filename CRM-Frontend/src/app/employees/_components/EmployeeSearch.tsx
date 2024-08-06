import React from 'react';
import { Input } from '@/components/ui/input';
// Icons
import { Search } from 'lucide-react';

type EmployeeSearchProps = {
   searchParams: { page: string; username: string };
};
const EmployeeSearch = ({ searchParams }: EmployeeSearchProps) => {
   return (
      <div className='relative ml-auto flex-1 md:grow-0'>
         <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
         <Input type='search' placeholder='بحث ...' className='w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[250px]' />
      </div>
   );
};

export default EmployeeSearch;
