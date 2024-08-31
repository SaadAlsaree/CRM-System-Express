import { Badge } from '@/components/ui/badge';
import React from 'react';
import { PiSuitcaseSimpleBold } from 'react-icons/pi';

type Props = {
   title: string;
   description: string;
};

const ProjectCard = ({ title, description }: Props) => {
   return (
      <div className='rounded-lg border p-4 bg-white dark:bg-gray-900 flex-1 items-center gap-4 min-w-[150px]'>
         <div className='flex justify-between '>
            <div className='rounded-xl bg-blue-500 p-3 text-white '>
               <PiSuitcaseSimpleBold className='w-6 h-6' />
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

export default ProjectCard;
