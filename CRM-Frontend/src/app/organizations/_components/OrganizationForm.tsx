'use client';
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

//services
import { orgClientService } from '@/services/organization/org.client.service';
// Components
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { addOrganizationSchema } from '@/schema/organization.schema';
import { useToast } from '@/components/ui/use-toast';
import { TriangleAlert } from 'lucide-react';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { ErrorMessage, Spinner } from '@/components';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type addOrganizationData = z.infer<typeof addOrganizationSchema>;

const OrganizationType = [
   { label: 'دائرة', value: 'A' },
   { label: 'مديرية', value: 'B' },
   { label: 'أخرى', value: 'Other' }
];

type Props = {
   organization?: any;
};
const OrganizationForm = ({ organization }: Props) => {
   const [error, setError] = useState('');
   const [isSubmitting, setSubmitting] = useState(false);
   const router = useRouter();
   const { toast } = useToast();

   const form = useForm<addOrganizationData>({
      resolver: zodResolver(addOrganizationSchema),
      defaultValues: organization
         ? {
              name: organization.name,
              code: organization.code,
              type: organization.type,
              email: organization.email,
              phone: organization.phone,
              address: organization.address,
              website: organization.website,
              description: organization.description
           }
         : {}
   });

   const { errors } = form.formState;

   const onSubmit = form.handleSubmit(async (OrgData) => {
      setSubmitting(true);
      try {
         if (organization) {
            // update organization
            const response = await orgClientService.updateOrgFromClient(JSON.stringify(OrgData), organization._id);

            if (response.status === 200) {
               router.push('/organizations/list');

               toast({
                  title: 'تم التحديث',
                  description: 'تم تحديث البيانات بنجاح.',
                  variant: 'default'
               });
            }
         } else {
            // create organization
            const response = await orgClientService.createOrgFromClient(JSON.stringify(OrgData));

            if (response.status === 201) {
               router.push('/organizations/list');
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
                           <Input {...form.register('name')} placeholder='الأسم' type='text' defaultValue={organization?.name} />
                           <ErrorMessage>{errors.name?.message}</ErrorMessage>
                        </FormItem>
                     </div>
                     <div>
                        <FormItem>
                           <FormLabel>ترميز الدائرة أو المديرية :</FormLabel>
                           <Input {...form.register('code')} placeholder='الترميز' type='text' defaultValue={organization?.code} />
                           <ErrorMessage>{errors.code?.message}</ErrorMessage>
                        </FormItem>
                     </div>
                  </div>
                  <div className='mt-4'>
                     <FormField
                        control={form.control}
                        name='type'
                        defaultValue={organization?.type}
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>النوع دائرة أو مديرية :</FormLabel>
                              <Select onValueChange={field.onChange} name='priorityBook' defaultValue={organization?.type}>
                                 <SelectTrigger>
                                    <SelectValue placeholder='النوع' />
                                 </SelectTrigger>
                                 <SelectContent>
                                    {OrganizationType?.map((option) => (
                                       <SelectItem key={option.value} value={option.value}>
                                          {option.label}
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
                              type='email'
                              defaultValue={organization?.email}
                           />
                           <ErrorMessage>{errors.email?.message}</ErrorMessage>
                        </FormItem>
                     </div>

                     <div>
                        <FormItem>
                           <FormLabel>الهاتف</FormLabel>
                           <Input {...form.register('phone')} placeholder='الهاتف' type='text' defaultValue={organization?.phone} />
                           <ErrorMessage>{errors.phone?.message}</ErrorMessage>
                        </FormItem>
                     </div>
                  </div>

                  <div className='mt-4 grid grid-cols-1 xl:grid-cols-2 gap-4'>
                     <div>
                        <FormItem>
                           <FormLabel>العنوان</FormLabel>
                           <Input {...form.register('address')} placeholder='العنوان' type='text' defaultValue={organization?.address} />
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
                              defaultValue={organization?.website}
                           />
                           <ErrorMessage>{errors.website?.message}</ErrorMessage>
                        </FormItem>
                     </div>
                  </div>

                  <div className='col-span-4 mt-4'>
                     <FormItem>
                        <FormLabel>الوصف :</FormLabel>
                        <Textarea {...form.register('description')} placeholder='الوصف' defaultValue={organization?.description} />
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

export default OrganizationForm;
