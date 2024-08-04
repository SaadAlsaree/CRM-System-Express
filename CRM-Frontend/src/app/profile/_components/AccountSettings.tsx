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
import { CustomSwitch } from '@/components';

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
            <div className='p-4'>
               <h3 className='mb-4 text-xl text-primary font-semibold'>أدارة الأشعارات .</h3>
               <div className='space-y-4'>
                  <FormField
                     control={form.control}
                     name='cases'
                     defaultValue={userStings?.user?.cases}
                     render={({ field }) => (
                        <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                           <div className='space-y-0.5'>
                              <FormLabel className='text-base'>Marketing emails</FormLabel>
                              <FormDescription>Receive emails about new products, features, and more.</FormDescription>
                           </div>
                           <CustomSwitch value={field.value ?? false} onChange={field.onChange} />
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
