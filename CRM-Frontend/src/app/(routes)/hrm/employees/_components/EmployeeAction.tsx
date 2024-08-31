'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuGroup,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Lock, LifeBuoy, LogOut, Plus, Settings, ShieldCheck, ShieldMinus, User, Users, Building2, Building, UserCog } from 'lucide-react';
//services
import { userClientService } from '@/services/user/user.client.service';

import { MdMoreVert } from 'react-icons/md';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type Props = {
   employeeId: string;
   isActivated: boolean;
};
const EmployeeAction = ({ employeeId, isActivated }: Props) => {
   const router = useRouter();

   const handleEdit = () => {
      router.push(`/employees/edit/${employeeId}`);
   };

   // Employee activation status
   const handelActivated = async (userId: string) => {
      await userClientService.updateUserActivationStatus(userId, !isActivated);
      router.refresh();
   };

   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            {/* <MdMoreVert className='w-6 h-6 text-muted-foreground hover:text-primary duration-200 transition-colors cursor-pointer' /> */}
            <Button variant='ghost'>
               <MdMoreVert className='w-6 h-6 text-muted-foreground hover:text-primary duration-200 transition-colors cursor-pointer' />
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent className='w-56' align='end'>
            <DropdownMenuLabel>الإعدادات</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
               <Link href={`/profile/${employeeId}`}>
                  <DropdownMenuItem>
                     <User className='mr-2 h-4 w-4' />
                     <span className='mr-2'>الملف الشخصي</span>
                  </DropdownMenuItem>
               </Link>
               <DropdownMenuItem onClick={() => handelActivated(employeeId)}>
                  {isActivated ? (
                     <ShieldCheck className='mr-2 h-4 w-4 text-green-500' />
                  ) : (
                     <ShieldMinus className='mr-2 h-4 w-4 text-red-500' />
                  )}
                  <span className='mr-2'>
                     {isActivated ? <h1 className='text-green-500'>مفعل</h1> : <h1 className='text-red-500'>غير مفعل</h1>}
                  </span>
               </DropdownMenuItem>
               <Link href={`/employees/edit/${employeeId}`}>
                  <DropdownMenuItem>
                     <UserCog className='mr-2 h-4 w-4' />
                     <span className='mr-2'>تعديل</span>
                  </DropdownMenuItem>
               </Link>
               <DropdownMenuItem>
                  <Lock className='mr-2 h-4 w-4' />
                  <span className='mr-2'>تعديل كلمة المرور</span>
               </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
               <DropdownMenuItem>
                  <Building2 className='mr-2 h-4 w-4' />
                  <span className='mr-2'>الدائرة</span>
               </DropdownMenuItem>
               <DropdownMenuItem>
                  <Building className='mr-2 h-4 w-4' />
                  <span className='mr-2'>المديرية</span>
               </DropdownMenuItem>

               <DropdownMenuItem>
                  <Users className='mr-2 h-4 w-4' />
                  <span className='mr-2'>القسم</span>
               </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
         </DropdownMenuContent>
      </DropdownMenu>
   );
};

export default EmployeeAction;
