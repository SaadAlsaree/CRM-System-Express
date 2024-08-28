'use client';
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import EmployeeForm from './EmployeeForm';
import { Plus } from 'lucide-react';

type Props = {
   orgList: any;
   rankList: any;
   roleList: any;
   directorateList: any;
};

const EmployeeModel = ({ directorateList, orgList, rankList, roleList }: Props) => {
   return (
      <Dialog>
         <DialogTrigger>
            <div className='rounded-md border flex items-center justify-center hover:bg-gray-50 active:bg-none p-2 px-4 dark:hover:bg-gray-900 duration-100 transition-colors'>
               <h1 className='ml-2'>إضافة موظف جديد</h1>
               <Plus className='text-primary' />
            </div>
         </DialogTrigger>
         <DialogContent className='min-w-[900px]'>
            <DialogHeader>
               <DialogTitle>تأكد من البيانات المدخلة قبل الحفظ .</DialogTitle>
            </DialogHeader>

            <EmployeeForm orgList={orgList} rankList={rankList} roleList={roleList} directorateList={directorateList} />
         </DialogContent>
      </Dialog>
   );
};

export default EmployeeModel;
