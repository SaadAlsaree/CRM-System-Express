'use client';
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components';
//services
import { orgClientService } from '@/services/organization/org.client.service';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';
import { addDepartmentSchema } from '@/schema/organization.schema';
//Icons
import { TriangleAlert } from 'lucide-react';

type addDepartmentData = z.infer<typeof addDepartmentSchema>;

interface Props {
   department?: any;
   orgId?: string;
}

const DepartmentForm = ({ department, orgId }: Props) => {
   const [error, setError] = useState('');
   const [isSubmitting, setSubmitting] = useState(false);
   const router = useRouter();
   const { toast } = useToast();

   const form = useForm<addDepartmentData>({
      resolver: zodResolver(addDepartmentSchema),
      defaultValues: department
         ? {
              name: department.name,
              code: department.code,
              description: department.description,
              email: department.email,
              phone: department.phone,
              organization: orgId
           }
         : {
              organization: orgId?.toString()
           }
   });

   const { errors } = form.formState;

   const onSubmit = form.handleSubmit(async (data) => {
      setSubmitting(true);
      try {
         if (department) {
            // update department
            const response = await orgClientService.updateDepartment(data, department._id);

            if (response.status === 200) {
               toast({
                  title: 'تم التحديث',
                  description: 'تم تحديث بيانات القسم بنجاح.',
                  variant: 'default',
                  duration: 5000
               });

               router.push(`/organizations/view/${department.organization.toString()}`);
            }
         } else {
            // create department
            const response = await orgClientService.createDepartment(data);

            if (response.status === 200) {
               router.push(`/organizations/view/${orgId}`);
               toast({
                  title: 'تم الإنشاء',
                  description: 'تم إنشاء القسم بنجاح.',
                  variant: 'default',
                  duration: 5000
               });
            }
         }
      } catch (error) {
         setSubmitting(false);
         setError('حدث خطأ غير متوقع.');
         toast({
            title: 'خطأ',
            description: 'حدث خطأ غير متوقع.',
            variant: 'destructive',
            duration: 5000
         });
      }
      setSubmitting(false);
   });

   return (
      <div>
         {error && (
            <Alert variant='destructive'>
               <TriangleAlert className='h-4 w-4' />
               <AlertTitle>خطأ</AlertTitle>
               <AlertDescription>{error}</AlertDescription>
            </Alert>
         )}
         <Form {...form}>
            <form onSubmit={onSubmit}>
               <FormItem>
                  <FormLabel>الإسم :</FormLabel>
                  <Input {...form.register('name')} placeholder='الاسم' />
                  {errors.name && <FormMessage>{errors.name.message}</FormMessage>}
               </FormItem>
               <FormItem className='mt-4'>
                  <FormLabel>الرمز</FormLabel>
                  <Input {...form.register('code')} />
                  {errors.code && <FormMessage>{errors.code.message}</FormMessage>}
               </FormItem>
               <FormItem className='mt-4'>
                  <FormLabel>الوصف</FormLabel>
                  <Input {...form.register('description')} />
                  {errors.description && <FormMessage>{errors.description.message}</FormMessage>}
               </FormItem>
               <FormItem className='mt-4'>
                  <FormLabel>البريد الإلكتروني</FormLabel>
                  <Input {...form.register('email')} />
                  {errors.email && <FormMessage>{errors.email.message}</FormMessage>}
               </FormItem>
               <FormItem className='mt-4'>
                  <FormLabel>الهاتف</FormLabel>
                  <Input {...form.register('phone')} />
                  {errors.phone && <FormMessage>{errors.phone.message}</FormMessage>}
               </FormItem>

               {/* Button */}
               <div className='flex gap-3 mt-10 justify-between'>
                  <div className='flex flex-row gap-4'>
                     <Button disabled={isSubmitting}>
                        {isSubmitting ? (
                           <>
                              <p className='ml-2'>حفظ البيانات</p> <Spinner />
                           </>
                        ) : (
                           'حفظ البيانات'
                        )}
                     </Button>
                  </div>
               </div>
            </form>
         </Form>
      </div>
   );
};

export default DepartmentForm;
