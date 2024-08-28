'use client';
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

//services
import { directorateClientService } from '@/services/directorate/directorate.client.service';
// Components
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { addDirectorateSchema } from '@/schema/organization.schema';
import { useToast } from '@/components/ui/use-toast';
import { TriangleAlert } from 'lucide-react';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { ErrorMessage, Spinner } from '@/components';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type addDirectorateData = z.infer<typeof addDirectorateSchema>;

type Props = {
   directorate?: any;
   orgList: any;
};
const DirectorateForm = ({ directorate, orgList }: Props) => {
   const [error, setError] = useState('');
   const [isSubmitting, setSubmitting] = useState(false);

   const orgOptions: [] = orgList?.organizations?.map((org: Record<string, string>) => ({ label: org.name, value: org._id }));

   const router = useRouter();
   const { toast } = useToast();

   const form = useForm<addDirectorateData>({
      resolver: zodResolver(addDirectorateSchema),
      defaultValues: directorate
         ? {
              name: directorate.name,
              code: directorate.code,
              email: directorate.email,
              phone: directorate.phone,
              address: directorate.address,
              website: directorate.website,
              description: directorate.description,
              organizationId: directorate.organizationId
           }
         : {}
   });

   const { errors } = form.formState;

   const onSubmit = form.handleSubmit(async (directorateData) => {
      setSubmitting(true);
      try {
         if (directorate) {
            // update directorate
            const response = await directorateClientService.updateDirectorate(JSON.stringify(directorateData), directorate._id);

            if (response.status === 201) {
               router.push('/directorates');

               toast({
                  title: 'تم التحديث',
                  description: 'تم تحديث البيانات بنجاح.',
                  variant: 'default'
               });
            }
         } else {
            // create directorate
            const response = await directorateClientService.createDirectorate(JSON.stringify(directorateData));

            if (response.status === 201) {
               router.push('/directorates');
               toast({
                  title: 'تم الإضافة',
                  description: 'تمت إضافة البيانات بنجاح.',
                  variant: 'default'
               });
            }
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
      <div className='my-6'>
         {error && (
            <Alert variant='destructive'>
               <TriangleAlert className='h-4 w-4' />
               <AlertTitle>خطأ</AlertTitle>
               <AlertDescription>{error}</AlertDescription>
            </Alert>
         )}
         <div className='flex items-center mx-4 2xl:mx-44 xl:mx-32 md:mx-10'>
            <Form {...form}>
               <form onSubmit={onSubmit} className='w-full' autoComplete='off'>
                  <div className='grid grid-cols-1 xl:grid-cols-2 gap-4 '>
                     <div>
                        <FormItem>
                           <FormLabel>أسم الدائرة أو المديرية :</FormLabel>
                           <Input {...form.register('name')} placeholder='الأسم' type='text' defaultValue={directorate?.name} />
                           <ErrorMessage>{errors.name?.message}</ErrorMessage>
                        </FormItem>
                     </div>
                     <div>
                        <FormItem>
                           <FormLabel>ترميز الدائرة أو المديرية :</FormLabel>
                           <Input {...form.register('code')} placeholder='الترميز' type='text' defaultValue={directorate?.code} />
                           <ErrorMessage>{errors.code?.message}</ErrorMessage>
                        </FormItem>
                     </div>
                  </div>

                  <div className='mt-4'>
                     <FormField
                        control={form.control}
                        name='organizationId'
                        defaultValue={directorate?.organizationId}
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>الدائرة :</FormLabel>
                              <Select onValueChange={field.onChange} name='organizationId' defaultValue={directorate?.organization._id}>
                                 <SelectTrigger>
                                    <SelectValue placeholder='الدائرة' />
                                 </SelectTrigger>
                                 <SelectContent>
                                    {orgOptions?.map((org: any) => (
                                       <SelectItem key={org.value} value={org.value}>
                                          {org.label}
                                       </SelectItem>
                                    ))}
                                 </SelectContent>
                              </Select>

                              <FormMessage />
                           </FormItem>
                        )}
                     ></FormField>
                  </div>
                  <div className='mt-4 grid grid-cols-1 xl:grid-cols-2 gap-4'>
                     <div>
                        <FormItem>
                           <FormLabel>البريد الألكتروني</FormLabel>
                           <Input
                              {...form.register('email')}
                              placeholder='البريد الألكتروني'
                              //   type='email'
                              defaultValue={directorate?.email}
                           />
                           <ErrorMessage>{errors.email?.message}</ErrorMessage>
                        </FormItem>
                     </div>

                     <div>
                        <FormItem>
                           <FormLabel>الهاتف</FormLabel>
                           <Input {...form.register('phone')} placeholder='الهاتف' type='text' defaultValue={directorate?.phone} />
                           <ErrorMessage>{errors.phone?.message}</ErrorMessage>
                        </FormItem>
                     </div>
                  </div>

                  <div className='mt-4 grid grid-cols-1 xl:grid-cols-2 gap-4'>
                     <div>
                        <FormItem>
                           <FormLabel>العنوان</FormLabel>
                           <Input {...form.register('address')} placeholder='العنوان' type='text' defaultValue={directorate?.address} />
                           <ErrorMessage>{errors.address?.message}</ErrorMessage>
                        </FormItem>
                     </div>

                     <div>
                        <FormItem>
                           <FormLabel>الموقع الألكتروني :</FormLabel>
                           <Input
                              {...form.register('website')}
                              placeholder='الموقع الألكتروني'
                              type='text'
                              defaultValue={directorate?.website}
                           />
                           <ErrorMessage>{errors.website?.message}</ErrorMessage>
                        </FormItem>
                     </div>
                  </div>

                  <div className='col-span-4 mt-4'>
                     <FormItem>
                        <FormLabel>الوصف :</FormLabel>
                        <Textarea {...form.register('description')} placeholder='الوصف' defaultValue={directorate?.description} />
                        <ErrorMessage>{errors.description?.message}</ErrorMessage>
                     </FormItem>
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
      </div>
   );
};

export default DirectorateForm;
