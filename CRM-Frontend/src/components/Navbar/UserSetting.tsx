'use client';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import axios from 'axios';
import { useRouter } from 'next/navigation';

//services
//icons
import { CircleUser, LogOut, Settings } from 'lucide-react';

const UserSetting = () => {
   const router = useRouter();

   const logoutHandler = async () => {
      try {
         const response = await axios.post(
            'http://localhost:5000/api/v1/auth/logout',
            {},
            { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
         );
         if (response.status === 204) {
            router.push('/Login');
         }
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <CircleUser className='h-6 w-6 text-gray-500 dark:text-gray-300 cursor-pointer hover:text-primary duration-200 transition-colors' />
            {/* <Avatar>
               <AvatarImage src='/user_96px.png' />
               <AvatarFallback>Saad</AvatarFallback>
            </Avatar> */}
         </DropdownMenuTrigger>
         <DropdownMenuContent align='end'>
            <DropdownMenuLabel className='text-right text-gray-500 dark:text-slate-200'>حسابي</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className=' gap-2'>
               <Settings width='18' height='18' />
               الأعدادات
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='gap-2' onClick={logoutHandler}>
               <LogOut width='18' height='18' />
               تسجيل الخروج
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
};

export default UserSetting;
