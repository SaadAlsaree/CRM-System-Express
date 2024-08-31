'use client';
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import DepartmentForm from './DepartmentForm';
import { Plus } from 'lucide-react';
import { Divider } from '@/components';

type Props = {
   department?: any;
   directorateId?: string;
};
const DepartmentModel = ({ department, directorateId }: Props) => {
   return (
      <Dialog>
         <DialogTrigger>
            <div className='border  rounded-md px-4 items-center flex justify-between'>
               <h1 className='ml-4 font-semibold text-muted-foreground'>أظافة قسم</h1>
               <Plus className='h-10 text-primary' />
            </div>
         </DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle className='mb-4'>تأكد من بيانات القسم المراد أظافته .</DialogTitle>
               <Divider title='' />
               <DialogDescription className='mt-4'>
                  <DepartmentForm department={department} directorateId={directorateId} />
               </DialogDescription>
            </DialogHeader>
         </DialogContent>
      </Dialog>
   );
};

export default DepartmentModel;
