'use client';
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { updatePasswordSchema } from '@/schema/user.schema';
import { CustomSwitch, Spinner } from '@/components';

type updateUserStingsData = z.infer<typeof updatePasswordSchema>;

type Props = {
   userStings: any;
};

const PasswordChangeForm = ({ userStings }: Props) => {
   const [error, setError] = useState('');
   const [isSubmitting, setSubmitting] = useState(false);
   const { toast } = useToast();

   const form = useForm<updateUserStingsData>({
      resolver: zodResolver(updatePasswordSchema),
      defaultValues: {
         currentPassword: '',
         newPassword: '',
         confirmPassword: ''
      }
   });

   const onSubmit = form.handleSubmit(async (userData) => {
      setSubmitting(true);
      try {
      } catch (error) {
         setSubmitting(false);
         setError('حدث خطأ غير متوقع.');
         toast({
            title: 'خطأ',
            description: 'حدث خطأ غير متوقع.',
            variant: 'destructive'
         });
      }
      setSubmitting(false);
   });
   return (
      <div>
         <Form {...form}>
            <form onSubmit={onSubmit} className='w-full space-y-6'>
               <div className='p-4'>
                  <div className='space-y-4 my-4'>
                     <FormField
                        name='currentPassword'
                        label='كلمة المرور الحالية'
                        type='password'
                        placeholder='كلمة المرور الحالية'
                        required
                     />
                     <FormField name='newPassword' label='كلمة المرور الجديدة' type='password' placeholder='كلمة المرور الجديدة' required />
                     <FormField name='confirmPassword' label='تأكيد كلمة المرور' type='password' placeholder='تأكيد كلمة المرور' required />
                  </div>
               </div>
               {/* Button */}
               <div className='flex gap-3 mt-10 justify-between'>
                  <div className='flex flex-row gap-4'>
                     {/* <Button variant='outline'>إلغاء</Button> */}
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

export default PasswordChangeForm;
