import React from 'react';
import { Label } from '@radix-ui/react-label';

//Components
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
//Icons
import { CornerDownLeft, Mic, Paperclip } from 'lucide-react';
import TextMessage from './TextMessage';

const ChatFormPage = () => {
   return (
      <div>
         <div className='relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2'>
            <div>
               <TextMessage />
            </div>
            <div className='flex-1' />
            <form className='relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring'>
               <Label htmlFor='message' className='sr-only'>
                  رسالة
               </Label>
               <Textarea
                  id='message'
                  placeholder='اكتب رسالتك هنا...'
                  className='min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0'
               />
               <div className='flex items-center p-3 pt-0'>
                  <TooltipProvider>
                     <Tooltip>
                        <TooltipTrigger asChild>
                           <Button variant='ghost' size='icon'>
                              <Paperclip className='size-4' />
                              <span className='sr-only'>أرفق ملف</span>
                           </Button>
                        </TooltipTrigger>
                        <TooltipContent side='top'>أرفق ملف</TooltipContent>
                     </Tooltip>
                     <Tooltip>
                        <TooltipTrigger asChild>
                           <Button variant='ghost' size='icon'>
                              <Mic className='size-4' />
                              <span className='sr-only'>استخدم الميكروفون</span>
                           </Button>
                        </TooltipTrigger>
                        <TooltipContent side='top'>استخدم الميكروفون</TooltipContent>
                     </Tooltip>
                  </TooltipProvider>
                  <Button type='submit' size='sm' className='mr-auto gap-1.5'>
                     إرسال رسالة
                     <CornerDownLeft className='size-3.5' />
                  </Button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default ChatFormPage;
