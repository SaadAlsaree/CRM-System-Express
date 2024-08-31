import { Badge } from '@/components/ui/badge';
import { BellRing } from 'lucide-react';
import React from 'react';

type Props = {
   title: string;
   description: string;
};

const NotificationCard = ({ title, description }: Props) => {
   return (
      <div className='rounded-lg border p-4 bg-white dark:bg-gray-900 flex-1 items-center gap-4 min-w-[150px]'>
         <div className='flex justify-between '>
            <div className='rounded-xl bg-zinc-500 p-3 text-white '>
               <BellRing className='w-6 h-6' />
            </div>

            <div className='grew'>
               <p className='text-[16px] font-bold ml-auto'>{title}</p>
            </div>
         </div>
         <div className='mt-1 text-left'>
            <Badge className='text-[12px] text-neutral-500' variant='outline'>
               {description}
            </Badge>
         </div>
      </div>
   );
};

export default NotificationCard;
