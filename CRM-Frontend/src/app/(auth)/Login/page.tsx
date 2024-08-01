'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { loginSchema } from '@/schema/user.schema';
import { ErrorMessage, Spinner } from '@/components';

type LoginForm = z.infer<typeof loginSchema>;

const LoginPage = () => {
   const [isSubmitting, setSubmitting] = useState(false);
   const { toast } = useToast();

   const {
      register,
      handleSubmit,
      formState: { errors }
   } = useForm<LoginForm>({
      resolver: zodResolver(loginSchema)
   });

   const router = useRouter();

   const onSubmit = handleSubmit(async (data: LoginForm) => {
      setSubmitting(true);
      try {
         const response = await axios.post('http://localhost:5000/api/v1/auth/login', data, {
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            withCredentials: true
         });

         if (response.status === 200) {
            if (response.data.isActivated === false) {
               toast({
                  title: 'حدث خطأ',
                  description: 'الرجاء تفعيل حسابك',
                  duration: 5000
               });
               setSubmitting(false);
               return;
            }
            router.push('/');
            router.refresh();

            toast({
               title: 'تم تسجيل الدخول بنجاح',
               description: 'مرحبا بعودتك',
               duration: 5000
            });
         }
         setSubmitting(false);
      } catch (error) {
         console.log(error);
         setSubmitting(false);
         toast({
            title: 'حدث خطأ',
            description: 'الرجاء التحقق من البريد الإلكتروني وكلمة المرور',
            duration: 5000
         });
      }
   });

   return (
      <div className='w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]'>
         <div className='flex items-center justify-center py-12'>
            <div className='mx-auto grid w-[350px] gap-6'>
               <div className='grid gap-2 text-center'>
                  <h1 className='text-3xl font-bold'>تسجيل الدخول</h1>
                  <p className='text-balance text-muted-foreground'>أدخل بريدك الإلكتروني أدناه لتسجيل الدخول إلى حسابك</p>
               </div>
               <form onSubmit={onSubmit}>
                  <div className='grid gap-4'>
                     <div className='grid gap-2'>
                        <Input placeholder='أسم المستخدم' {...register('userLogin')} />
                        <ErrorMessage>{errors.userLogin?.message}</ErrorMessage>
                     </div>
                     <div className='grid gap-2'>
                        <div className='flex items-center'>
                           <Label htmlFor='password'>كلمة المرور</Label>
                           <Link href='/forgot-password' className='ml-auto inline-block text-sm underline'>
                              نسيت كلمة السر؟
                           </Link>
                        </div>
                        <Input type='password' placeholder='كلمة المرور' {...register('password')} />
                        <ErrorMessage>{errors.password?.message}</ErrorMessage>
                     </div>
                     <Button disabled={isSubmitting} type='submit'>
                        <h3 className='w-full font-bold'>تسجيل الدخول </h3>
                        {isSubmitting && <Spinner />}
                     </Button>
                  </div>
               </form>
            </div>
         </div>
         <div className='hidden bg-muted lg:block p-24'>
            <Image
               src='/logoINSS.png'
               alt='Image'
               width='1920'
               height='1080'
               className='h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
            />
         </div>
      </div>
   );
};

export default LoginPage;
