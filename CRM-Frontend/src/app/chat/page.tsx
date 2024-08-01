import React from 'react';
//Components
import ProtectedPage from '@/components/ProtectedPage';
import { Card } from '@/components/ui/card';
import ChatFormPage from './_components/ChatForm';
import Conversation from './_components/Conversation';
import { Divider } from '@/components';
//Icons
import { MessageCircleMore } from 'lucide-react';

const ChatPage = () => {
   return (
      <ProtectedPage>
         <Card className='mx-36 mt-4'>
            <div className='flex justify-between'>
               <h1 className='text-2xl font-bold text-primary'>المحادثات .</h1>
               <MessageCircleMore className='text-primary w-6 h-6' />
            </div>
            <Divider title='' />
            <div className='grid grid-cols-1 xl:grid-cols-5 gap-4 m-4'>
               <div className='col-span-1'>
                  <Card className='overflow-auto h-[500px]'>
                     <Conversation />
                     <Conversation />
                     <Conversation />
                     <Conversation />
                     <Conversation />
                     <Conversation />
                  </Card>
               </div>

               <div className='col-span-4'>
                  <Card>
                     <ChatFormPage />
                  </Card>
               </div>
            </div>
         </Card>
      </ProtectedPage>
   );
};

export default ChatPage;
