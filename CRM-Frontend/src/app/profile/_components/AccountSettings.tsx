'use client';
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { updateUserStingsSchema } from '@/schema/user.schema';

type updateUserStingsData = z.infer<typeof updateUserStingsSchema>;

type Props = {
   userStings: any;
};

const AccountSettings = ({ userStings }: Props) => {
   const [error, setError] = useState('');
   const [isSubmitting, setSubmitting] = useState(false);
   const { toast } = useToast();

   const form = useForm<updateUserStingsData>({
      resolver: zodResolver(updateUserStingsSchema),
      defaultValues: {
         cases: userStings?.user?.cases,
         messages: userStings?.user?.messages,
         tasks: userStings?.user?.tasks,
         follows: userStings?.user?.follows,
         tickets: userStings?.user?.tickets
      }
   });

   const { errors } = form.formState;

   const onSubmit = form.handleSubmit(async (userStings) => {
      try {
         console.log(userStings);
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
      <Form {...form}>
         <form onSubmit={onSubmit} className='w-full space-y-6'>
            <div>
               <h3 className='mb-4 text-lg font-medium'>Email Notifications</h3>
               <div className='space-y-4'>
                  <FormField
                     control={form.control}
                     name='cases'
                     render={({ field }) => (
                        <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                           <div className='space-y-0.5'>
                              <FormLabel className='text-base'>Marketing emails</FormLabel>
                              <FormDescription>Receive emails about new products, features, and more.</FormDescription>
                           </div>
                           <FormControl>
                              <label className='inline-flex items-center cursor-pointer'>
                                 <input type='checkbox' value='' className='sr-only peer' />
                                 <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                 <span className='ms-3 text-sm font-medium text-gray-900 dark:text-gray-300'>Toggle me</span>
                              </label>
                           </FormControl>
                        </FormItem>
                     )}
                  />
               </div>
            </div>
            <Button type='submit'>Submit</Button>
         </form>
      </Form>
   );
};

export default AccountSettings;
