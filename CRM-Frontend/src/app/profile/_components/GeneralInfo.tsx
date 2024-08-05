'use client';
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

// Icons
import { TriangleAlert } from 'lucide-react';
//components
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ErrorMessage, Spinner } from '@/components';
import { Button } from '@/components/ui/button';
import { updateUserInfoSchema } from '@/schema/user.schema';
// Services
import { userClientService } from '@/services/user/user.client.service';

type updateUserInfoData = z.infer<typeof updateUserInfoSchema>;

type Props = {
   userInfo: any;
   isCurrentUser?: boolean;
};

const GeneralInfo = ({ userInfo, isCurrentUser }: Props) => {
   const [error, setError] = useState('');
   const [isSubmitting, setSubmitting] = useState(false);
   const router = useRouter();
   const { toast } = useToast();

   const form = useForm<updateUserInfoData>({
      resolver: zodResolver(updateUserInfoSchema),
      defaultValues: {
         displayName: userInfo?.user?.displayName,
         email: userInfo?.user?.email,
         phone: userInfo?.user?.phone,
         work: userInfo?.user?.work,
         address: userInfo?.user?.address
      }
   });

   const { errors } = form.formState;

   const onSubmit = form.handleSubmit(async (userData) => {
      setSubmitting(true);
      try {
         const response = await userClientService.updateUserInfo(userInfo?.user?._id, userData);
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
      <div className='flow-root rounded-lg border-gray-100 py-3 m-4'>
         <div className='my-6'>
            {error && (
               <Alert variant='destructive'>
                  <TriangleAlert className='h-4 w-4' />
                  <AlertTitle>خطأ</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
               </Alert>
            )}
         </div>
         <div className=' my-4'>
            <h1 className='text-xl font-semibold text-gray-500'>معلومات عامة :</h1>
         </div>
         <Form {...form}>
            <form onSubmit={onSubmit} className='w-full' autoComplete='off'>
               <dl className='-my-3 divide-y divide-gray-100 text-sm'>
                  <div className='grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4'>
                     <dt className='font-medium '>ترمز الموظف :</dt>
                     <dd className=' sm:col-span-2'>{userInfo?.userLogin}</dd>
                  </div>

                  <div className='grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4 dark:bg-gray-900 items-center'>
                     <dt className='font-medium '>الأسم :</dt>
                     <dd className=' sm:col-span-2'>
                        {isCurrentUser ? (
                           <div>
                              <Input
                                 {...form.register('displayName')}
                                 defaultValue={userInfo?.user?.displayName}
                                 className='border-none bg-gray-50 dark:bg-gray-900'
                              />
                              <ErrorMessage>{errors.displayName?.message}</ErrorMessage>
                           </div>
                        ) : (
                           <div>{userInfo?.user?.displayName}</div>
                        )}
                     </dd>
                  </div>

                  <div className='grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4 items-center'>
                     <dt className='font-medium '>البريد الألكتروني :</dt>
                     <dd className='sm:col-span-2'>
                        {isCurrentUser ? (
                           <div>
                              <Input {...form.register('email')} defaultValue={userInfo?.user?.email} className='border-none' />
                              <ErrorMessage>{errors.email?.message}</ErrorMessage>
                           </div>
                        ) : (
                           <div>{userInfo?.user?.email}</div>
                        )}
                     </dd>
                  </div>

                  <div className='grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4 dark:bg-gray-900 items-center'>
                     <dt className='font-medium'>رقم الهاتف :</dt>
                     <dd className=' sm:col-span-2'>
                        {isCurrentUser ? (
                           <div>
                              <Input
                                 {...form.register('phone')}
                                 defaultValue={userInfo?.user?.phone}
                                 className='border-none bg-gray-50 dark:bg-gray-900'
                              />
                              <ErrorMessage>{errors.phone?.message}</ErrorMessage>
                           </div>
                        ) : (
                           <div>{userInfo?.user?.phone}</div>
                        )}
                     </dd>
                  </div>

                  <div className='grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4 items-center'>
                     <dt className='font-medium '>الدائرة أو المديرية :</dt>
                     <dd className='sm:col-span-2'>{userInfo?.organization.name}</dd>
                  </div>

                  <div className='grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4 dark:bg-gray-900'>
                     <dt className='font-medium '>القسم :</dt>
                     <dd className=' sm:col-span-2'>{userInfo?.department ? userInfo.department.name : 'لا يوجد قسم'}</dd>
                  </div>

                  <div className='grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4 items-center'>
                     <dt className='font-medium '>العنوان الوظيفي :</dt>
                     <dd className=' sm:col-span-2'>
                        {isCurrentUser ? (
                           <div>
                              <Input {...form.register('work')} defaultValue={userInfo?.user?.work} className='border-none' />
                              <ErrorMessage>{errors.work?.message}</ErrorMessage>
                           </div>
                        ) : (
                           <div>{userInfo?.user?.work}</div>
                        )}
                     </dd>
                  </div>
                  <div className='grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4 dark:bg-gray-900 items-center'>
                     <dt className='font-medium '>العنوان :</dt>
                     <dd className=' sm:col-span-2'>
                        {isCurrentUser ? (
                           <div>
                              <Input
                                 {...form.register('address')}
                                 defaultValue={userInfo?.user?.address}
                                 className='border-none bg-gray-50 dark:bg-gray-900'
                              />
                              <ErrorMessage>{errors.address?.message}</ErrorMessage>
                           </div>
                        ) : (
                           <div>{userInfo?.user?.address}</div>
                        )}
                     </dd>
                  </div>
               </dl>

               {/* Button */}
               {isCurrentUser && (
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
               )}
            </form>
         </Form>
      </div>
   );
};

export default GeneralInfo;
