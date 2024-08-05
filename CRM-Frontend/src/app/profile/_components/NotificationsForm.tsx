'use client';
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { updateUserStingsSchema } from '@/schema/user.schema';
import { CustomSwitch, Spinner } from '@/components';
// Services
import { userClientService } from '@/services/user/user.client.service';

type updateUserStingsData = z.infer<typeof updateUserStingsSchema>;

type Props = {
   userStings: any;
};

const NotificationsForm = ({ userStings }: Props) => {
   const [error, setError] = useState('');
   const [isSubmitting, setSubmitting] = useState(false);
   const router = useRouter();
   const { toast } = useToast();

   //    console.log(userStings?.notifications.cases);
   const form = useForm<updateUserStingsData>({
      resolver: zodResolver(updateUserStingsSchema),
      defaultValues: {
         cases: userStings?.notifications?.cases,
         messages: userStings?.notifications?.messages,
         comments: userStings?.notifications?.comments,
         tasks: userStings?.notifications?.tasks,
         follows: userStings?.notifications?.follows,
         tickets: userStings?.notifications?.tickets
      }
   });

   const { errors } = form.formState;

   const onSubmit = form.handleSubmit(async (userData) => {
      setSubmitting(true);
      try {
         console.log(userData);
         const response = await userClientService.updateUserNotificationSettings(userStings._id, userData);
         if (response) {
            toast({
               title: 'تم تحديث البيانات بنجاح',
               description: 'تم تحديث البيانات بنجاح',
               variant: 'default'
            });
            router.refresh();
         }
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
               <div className='space-y-4 my-4'>
                  <FormField
                     control={form.control}
                     name='cases'
                     defaultValue={userStings?.notifications.cases}
                     render={({ field }) => (
                        <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4 '>
                           <div className='space-y-0.5'>
                              <FormLabel className='text-base'>آشعارات القظايا .</FormLabel>
                              <FormDescription>عند تعطيل آشعار القظايا لن تصل لك اشعارات عند آضافتك الى قظية جديدة .</FormDescription>
                           </div>
                           <CustomSwitch value={field.value ?? false} onChange={field.onChange} />
                        </FormItem>
                     )}
                  />
               </div>

               <div className='space-y-4 my-4'>
                  <FormField
                     control={form.control}
                     name='messages'
                     defaultValue={userStings?.notifications.cases}
                     render={({ field }) => (
                        <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4 '>
                           <div className='space-y-0.5'>
                              <FormLabel className='text-base'>آشعارات الرسائل .</FormLabel>
                              <FormDescription>عند تعطيل آشعار الرسائل لن تصل لك اشعارات عند آستلام الرسائل .</FormDescription>
                           </div>
                           <CustomSwitch value={field.value ?? false} onChange={field.onChange} />
                        </FormItem>
                     )}
                  />
               </div>
               <div className='space-y-4 my-4'>
                  <FormField
                     control={form.control}
                     name='tasks'
                     defaultValue={userStings?.notifications.cases}
                     render={({ field }) => (
                        <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4 '>
                           <div className='space-y-0.5'>
                              <FormLabel className='text-base'>آشعارات المهام .</FormLabel>
                              <FormDescription>عند تعطيل آشعار المهام لن تصل لك اشعارات عند آضافتك الى مهمة جديدة .</FormDescription>
                           </div>
                           <CustomSwitch value={field.value ?? false} onChange={field.onChange} />
                        </FormItem>
                     )}
                  />
               </div>
               <div className='space-y-4 my-4'>
                  <FormField
                     control={form.control}
                     name='tickets'
                     defaultValue={userStings?.notifications.cases}
                     render={({ field }) => (
                        <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4 '>
                           <div className='space-y-0.5'>
                              <FormLabel className='text-base'>آشعارات التذاكر .</FormLabel>
                              <FormDescription>عند تعطيل آشعار التذاكر لن تصل لك اشعارات عند آجابة التذكرة .</FormDescription>
                           </div>
                           <CustomSwitch value={field.value ?? false} onChange={field.onChange} />
                        </FormItem>
                     )}
                  />
               </div>
               <div className='space-y-4 my-4'>
                  <FormField
                     control={form.control}
                     name='comments'
                     defaultValue={userStings?.notifications.cases}
                     render={({ field }) => (
                        <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4 '>
                           <div className='space-y-0.5'>
                              <FormLabel className='text-base'>آشعارات التعليقات .</FormLabel>
                              <FormDescription>عند تعطيل آشعار التعليقات لن تصل لك الشعارات الجديدة .</FormDescription>
                           </div>
                           <CustomSwitch value={field.value ?? false} onChange={field.onChange} />
                        </FormItem>
                     )}
                  />
               </div>
               <div className='space-y-4 my-4'>
                  <FormField
                     control={form.control}
                     name='follows'
                     defaultValue={userStings?.notifications.cases}
                     render={({ field }) => (
                        <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4 '>
                           <div className='space-y-0.5'>
                              <FormLabel className='text-base'>آشعارات المتابعة .</FormLabel>
                              <FormDescription>عند تعطيل آشعار المتابعة لن تصل لك اشعارات عند متابعتك .</FormDescription>
                           </div>
                           <CustomSwitch value={field.value ?? false} onChange={field.onChange} />
                        </FormItem>
                     )}
                  />
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
   );
};

export default NotificationsForm;
