import ProtectedPage from '@/components/ProtectedPage';

import ProjectCard from './_components/ProjectCard';
import TaskCard from './_components/TaskCard';
import EventCard from './_components/EventCard';
import NotificationCard from './_components/NotificationCard';

export default async function Home() {
   return (
      <ProtectedPage>
         <div className='p-4 flex gap-4 flex-col md:flex-row'>
            {/* lift */}
            <div className='w-full lg:w-2/3 flex flex-col gap-6'>
               {/* User Card */}
               <div className='flex justify-between gap-4 flex-wrap'>
                  <ProjectCard title='كل القضايا' description='320' />

                  <TaskCard title='المهام المفتوحة' description='6' />
                  <EventCard title='الأحداث اليوم' description='0' />
                  <NotificationCard title='الإشعارات' description='4' />
               </div>
               {/* Middle Charts */}
               <div className=' flex gap-4 flex-col lg:flex-row'>
                  {/* Count Chart */}
                  <div className='w-full lg:w-1/3 h-'>{/* <CountChart /> */}</div>

                  {/* Attendance Chart */}
                  <div className='w-full lg:w-2/3 h-'>{/* <AttendanceChart /> */}</div>
               </div>
               {/* Bottom Charts */}
               <div className='w-full h-[500px]'>{/* <FinanceChart /> */}</div>
            </div>

            {/* right */}
            <div className='w-full lg:w-1/3 flex flex-col gap-8'>
               {/* <EventCalender />
            <Announcements /> */}
            </div>
         </div>
      </ProtectedPage>
   );
}
