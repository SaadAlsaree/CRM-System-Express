import { Upload } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

type Props = {
   userData: any;
};
const ProfileHeader = ({ userData }: Props) => {
   return (
      <div className='rounded-md flex justify-between  bg-gradient-to-r from-cyan-500 from-10% via-sky-500 via-25% to-primary to-90% '>
         <div>
            <div className='flex flex-row items-center gap-4  w-full h-36'>
               <div className='border-4 rounded-full p-[2px] border-green-500 mr-4'>
                  <Avatar className='min-w-28 min-h-28'>
                     <AvatarImage src='https://github.com/shadcn.png' />
                     <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
               </div>
               <div className='flex flex-col text-gray-300  hover:text-gray-50 transition-colors duration-300 cursor-pointer'>
                  <Upload />
               </div>

               <div className='mr-4'>
                  {userData?.isActivated ? (
                     <Badge className='bg-green-500 text-white mb-2'>Active</Badge>
                  ) : (
                     <Badge className='bg-red-500 text-white mb-2'>Inactive</Badge>
                  )}
                  <Separator className='mb-7 bg-white' />
                  <p className='text-[16px] font-bold text-white'>{userData?.username}</p>

                  <p className='text-[12px] text-gray-100'>{userData?.user?.email}</p>
               </div>
            </div>
         </div>
         <div className='hidden lg:flex  items-center ml-6'>
            <div className='flex flex-col items-center'>
               <div className='items-center'>
                  <p className='text-xs font-bold text-white'>43</p>
                  <p className='text-[18px] text-gray-100'>القضايا</p>
               </div>
               <Separator className='my-4 bg-white' />
               <div>
                  <p className='text-xs font-bold text-white'>152</p>
                  <p className='text-[18px] text-gray-100'>المهام</p>
               </div>
            </div>
            <Separator orientation='vertical' className='mx-4 py-4 bg-white' />
            <div className=''>
               <div>
                  <p className='text-xs font-bold text-white'>12</p>
                  <p className='text-[18px] text-gray-100'>التذاكر</p>
               </div>
               <Separator className='my-4 bg-white' />
               <div>
                  <p className='text-xs font-bold text-white'>2</p>
                  <p className='text-[18px] text-gray-100 '>الأجازات هذا الشهر</p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ProfileHeader;
