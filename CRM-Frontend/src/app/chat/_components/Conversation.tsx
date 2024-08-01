import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';

const Conversation = () => {
   return (
      <div className='border rounded-md cursor-pointer hover:shadow-md duration-150 transition-all active:shadow-none p-4 my-2'>
         <div className='flex items-center gap-4'>
            <Avatar className='hidden h-9 w-9 sm:flex'>
               <AvatarImage src='/avatars/01.png' alt='Avatar' />
               <AvatarFallback>S.A</AvatarFallback>
            </Avatar>
            <div className='grid gap-1'>
               <p className='text-sm font-medium leading-none'>Saad Alsaree</p>
               <p className='text-sm text-muted-foreground truncate'>olivia.martin@email.com</p>
            </div>
         </div>
      </div>
   );
};

export default Conversation;
