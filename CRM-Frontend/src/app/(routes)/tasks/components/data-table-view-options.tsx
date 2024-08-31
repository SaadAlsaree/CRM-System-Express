'use client';

import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { MixerHorizontalIcon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
   DropdownMenu,
   DropdownMenuCheckboxItem,
   DropdownMenuContent,
   DropdownMenuLabel,
   DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Plus } from 'lucide-react';

interface DataTableViewOptionsProps<TData> {
   table: Table<TData>;
}

export function DataTableViewOptions<TData>({ table }: DataTableViewOptionsProps<TData>) {
   return (
      <div className='flex items-center justify-center gap-2'>
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <Button variant='outline' size='sm' className='ml-auto hidden h-8 lg:flex'>
                  <MixerHorizontalIcon className='mr-2 h-4 w-4' />
                  View
               </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-[150px]'>
               <DropdownMenuLabel>تبديل الأعمدة</DropdownMenuLabel>
               <DropdownMenuSeparator />
               {table
                  .getAllColumns()
                  .filter((column) => typeof column.accessorFn !== 'undefined' && column.getCanHide())
                  .map((column) => {
                     return (
                        <DropdownMenuCheckboxItem
                           key={column.id}
                           className='capitalize'
                           checked={column.getIsVisible()}
                           onCheckedChange={(value) => column.toggleVisibility(!!value)}
                        >
                           {column.id}
                        </DropdownMenuCheckboxItem>
                     );
                  })}
            </DropdownMenuContent>
         </DropdownMenu>

         <Button variant='outline' size='sm' className='h-8'>
            <div className='flex items-center gap-2'>
               <span className=''>مهمة جديدة</span>
               <Plus className='h-4 w-4' />
            </div>
         </Button>
      </div>
   );
}
