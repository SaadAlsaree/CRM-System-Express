import BigCalender from '@/components/BigCalender';
import { Button } from '@/components/ui/button';
import { CalendarDays } from 'lucide-react';
import { eventsData } from '@/lib/data';

const EventPage = () => {
   return (
      <div className=' bg-white rounded-md p-4 dark:bg-gray-900'>
         <div className='my-4 flex items-center justify-between gap-4'>
            <div className='flex items-center gap-2'>
               <div className='rounded-xl bg-amber-500 p-3 text-white '>
                  <CalendarDays className='w-6 h-6' />
               </div>
               <h1 className='text-2xl font-bold text-muted-foreground'>الأحداث</h1>
            </div>
            <div className=''>
               <Button variant='outline' className='btn btn-primary'>
                  إضافة حدث
                  <CalendarDays className='text-muted-foreground mr-2' />
               </Button>
            </div>
         </div>

         <div className='h-[800px]'>
            <BigCalender Events={eventsData} />
         </div>
      </div>
   );
};

export default EventPage;
