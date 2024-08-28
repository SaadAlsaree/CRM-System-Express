'use client';
import React, { useState } from 'react';
import { any, set, z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

//components
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import MultipleSelector, { Option } from '@/components/ui/multiple-selector';
import { ErrorMessage, Skeleton, Spinner } from '@/components';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
//toast
import { useToast } from '@/components/ui/use-toast';
// schema
import { addEmployeeSchema } from '@/schema/user.schema';
// icons
import { TriangleAlert } from 'lucide-react';
// service
import { orgClientService } from '@/services/organization/org.client.service';
import { userClientService } from '@/services/user/user.client.service';
// utils
import { UtilsService } from '@/utils/utils.service';

type addEmployeeData = z.infer<typeof addEmployeeSchema>;

type Props = {
   employee?: any;
   rankList?: any;
   roleList?: any;
   orgList?: any;
   directorateList?: any;
};

const EmployeeForm = ({ employee, rankList, roleList, orgList, directorateList }: Props) => {
   const [error, setError] = useState('');
   const [isSubmitting, setSubmitting] = useState(false);
   const [orgId, setOrgId] = useState<string>('');
   const [department, setDepartment] = useState<boolean>(true);
   const [departmentOptions, setDepartmentOptions] = useState<[]>([]);
   const router = useRouter();
   const { toast } = useToast();

   const roleOptions: Option[] = roleList?.data?.map((role: Record<string, string>) => ({
      label: role.roleName,
      value: role._id
   })) as Option[];
   const rankOptions: [] = rankList?.map((rank: Record<string, string>) => ({ label: rank.rankName, value: rank._id }));
   const orgOptions: [] = orgList?.organizations?.map((org: Record<string, string>) => ({ label: org.name, value: org._id }));
   const directorateOptions: [] = directorateList?.Data?.map((directorate: Record<string, string>) => ({
      label: directorate.name,
      value: directorate._id
   }));

   const form = useForm<addEmployeeData>({
      resolver: zodResolver(addEmployeeSchema),
      defaultValues: employee
         ? {
              userLogin: employee.userLogin,
              password: employee.password,
              avatarColor: employee.avatarColor,
              username: employee.username,
              role: employee?.role.map((r: any) => ({ label: r.roleName, value: r._id })),
              rank: employee.rank._id,
              organizationId: employee.organization._id,
              departmentId: employee.department._id
           }
         : {}
   });

   const { errors } = form.formState;

   const onSubmit = form.handleSubmit(async (employeeData) => {
      setSubmitting(true);
      try {
         if (employee) {
            //update
            console.log(employeeData);
         } else {
            //create
            employeeData.avatarColor = UtilsService.avatarColor();
            employeeData.role = employeeData.role.map((r: any) => r.value);
            const response = await userClientService.createUser(employeeData);

            if (response.status === 201) {
               // router.push('/employees/list');
               toast({
                  title: 'تم الإضافة',
                  description: 'تم إضافة الموظف بنجاح.',
                  variant: 'default'
               });
            }
         }
      } catch (error) {
         setSubmitting(false);
         console.log(error);
         setError('حدث خطأ غير متوقع.');
         toast({
            title: 'خطأ',
            description: 'حدث خطأ غير متوقع.',
            variant: 'destructive'
         });
      }
      setSubmitting(false);
   });

   const handleClear = () => {
      form.reset();
      setError('');
      form.clearErrors();
   };

   const handleOrgChange = async (selectedOrgId: string) => {
      setOrgId(selectedOrgId);
      setDepartment(false);

      const departmentList = await orgClientService.getDepartmentsInOrg(selectedOrgId);

      const departments: [] = departmentList.departments?.map((department: Record<string, string>) => ({
         label: department.name,
         value: department._id
      }));
      setDepartmentOptions(departments);
   };

   return (
      <div className='my-6'>
         {error && (
            <Alert variant='destructive'>
               <TriangleAlert className='h-4 w-4' />
               <AlertTitle>خطأ</AlertTitle>
               <AlertDescription>{error}</AlertDescription>
            </Alert>
         )}
         <div className='flex items-center'>
            <Form {...form}>
               <form onSubmit={onSubmit} className='w-full' autoComplete='off'>
                  <div className='grid grid-cols-1 xl:grid-cols-2 gap-4 '>
                     <div>
                        <FormItem>
                           <FormLabel>ترمز الموظف :</FormLabel>
                           <Input {...form.register('userLogin')} type='text' />
                           <FormMessage>{errors.userLogin?.message}</FormMessage>
                        </FormItem>
                     </div>
                     <div>
                        <FormItem>
                           <FormLabel>كلمة المرور :</FormLabel>
                           <Input {...form.register('password')} type='password' />
                           <FormMessage>{errors.password?.message}</FormMessage>
                        </FormItem>
                     </div>
                     <div>
                        <FormItem>
                           <FormLabel>الأسم :</FormLabel>
                           <Input {...form.register('username')} type='text' />
                           <FormMessage>{errors.username?.message}</FormMessage>
                        </FormItem>
                     </div>

                     <div>
                        <FormField
                           control={form.control}
                           name='rank'
                           defaultValue={employee?.rank._id}
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>الرتبة :</FormLabel>
                                 <Select onValueChange={field.onChange} name='rank' defaultValue={employee?.rank._id}>
                                    <SelectTrigger>
                                       <SelectValue placeholder='الرتبة' />
                                    </SelectTrigger>
                                    <SelectContent>
                                       {rankOptions?.map((rank: any) => (
                                          <SelectItem key={rank.value} value={rank.value}>
                                             {rank.label}
                                          </SelectItem>
                                       ))}
                                    </SelectContent>
                                 </Select>

                                 <FormMessage />
                              </FormItem>
                           )}
                        ></FormField>
                     </div>

                     <div className='col-span-2'>
                        {roleList?.data && (
                           <FormField
                              control={form.control}
                              name='role'
                              // defaultValue={user?.role}
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>الصلاحيات</FormLabel>
                                    <FormControl>
                                       <MultipleSelector
                                          options={roleOptions}
                                          value={field.value}
                                          onChange={field.onChange}
                                          // defaultOptions={roleDefault}
                                          placeholder='حدد صلاحيات المستخدم...'
                                          emptyIndicator={
                                             <p className='text-center text-lg leading-10 text-gray-600 dark:text-gray-400'>
                                                لم يتم العثور على نتائج.
                                             </p>
                                          }
                                       />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                        )}
                     </div>

                     <div className='w-full'>
                        <FormField
                           control={form.control}
                           name='organizationId'
                           defaultValue={employee?.organization._id}
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>الدائرة :</FormLabel>
                                 <Select
                                    onValueChange={(selectedOrgId) => {
                                       field.onChange(selectedOrgId);
                                       handleOrgChange(selectedOrgId);
                                    }}
                                    name='organizationId'
                                    defaultValue={employee?.organization._id}
                                 >
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

                     <div className='w-full'>
                        <FormField
                           control={form.control}
                           name='directorateId'
                           defaultValue={employee?.organization._id}
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>المديرية :</FormLabel>
                                 <Select onValueChange={field.onChange} name='directorateId' defaultValue={employee?.directorate._id}>
                                    <SelectTrigger>
                                       <SelectValue placeholder='المديرية' />
                                    </SelectTrigger>
                                    <SelectContent>
                                       {directorateOptions?.map((directorate: any) => (
                                          <SelectItem key={directorate.value} value={directorate.value}>
                                             {directorate.label}
                                          </SelectItem>
                                       ))}
                                    </SelectContent>
                                 </Select>

                                 <FormMessage />
                              </FormItem>
                           )}
                        ></FormField>
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
      </div>
   );
};

export default EmployeeForm;
