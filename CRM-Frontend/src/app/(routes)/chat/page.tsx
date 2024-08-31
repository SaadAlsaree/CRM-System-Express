import React from 'react';
//Components

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Divider } from '@/components';

import ChatFormPage from './_components/ChatForm';
import Conversation from './_components/Conversation';
//Icons
import { MessageCircleMore } from 'lucide-react';
import { Search } from 'lucide-react';

const ChatPage = () => {
   return (
      <div>
         <Card className='mx-1 mt-4 xl:mx-36 md:mx-10 sm:mx-0'>
            <div className='flex justify-between'>
               <h1 className='text-2xl font-bold text-primary'>المحادثات .</h1>
               <MessageCircleMore className='text-primary w-6 h-6' />
            </div>
            <Divider title='' />
            <div className='grid grid-cols-1 xl:grid-cols-6 gap-4 m-4'>
               <div className='hidden  xl:block col-span-2'>
                  <Card>
                     <div className='sticky'>
                        <Search className='absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
                        <Input type='search' placeholder='بحث عن موضف ...' className='pr-8 w-full' />
                     </div>
                     <div className='overflow-auto h-[500px] mt-2'>
                        <Conversation />
                        <Conversation />
                        <Conversation />
                        <Conversation />
                        <Conversation />
                        <Conversation />
                        <Conversation />
                        <Conversation />
                     </div>
                  </Card>
               </div>

               <div className='col-span-4'>
                  <Card>
                     <ChatFormPage />
                  </Card>
               </div>
            </div>
         </Card>
      </div>
   );
};

export default ChatPage;
