import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import ProtectedPage from '@/components/ProtectedPage';
import ProfileHeader from './_components/Header';
import GeneralInfo from './_components/GeneralInfo';
import JobInfo from './_components/JobInfo';
import AccountSettings from './_components/AccountSettings';
// services
import { userServerService } from '@/services/user/user.server.service';

const ProfilePage = async () => {
   const currentUser = await userServerService.getCurrentUser();

   return (
      <ProtectedPage>
         <div className='rounded-[3px] border '>
            <ProfileHeader userData={currentUser?.data?.UserProfile} />
            <div className='mt-4'>
               <Tabs defaultValue='GeneralInfo' className='w-full'>
                  <TabsList className='w-full overflow-scroll'>
                     <TabsTrigger value='GeneralInfo'>معلومات عامة</TabsTrigger>
                     <TabsTrigger value='JobInfo'>معلومات الوظيفة</TabsTrigger>
                     <TabsTrigger value='Settings'>إعدادت الحساب</TabsTrigger>
                     <TabsTrigger value='Projects'>المشاريع</TabsTrigger>
                     <TabsTrigger value='Tasks'>المهام</TabsTrigger>
                     <TabsTrigger value='Tickets'>التذاكر</TabsTrigger>
                     <TabsTrigger value='MyLeave'>إجازتي</TabsTrigger>
                     <TabsTrigger value='Files'>ملفاتي</TabsTrigger>

                     {/* <TabsTrigger value='JobInfo'></TabsTrigger> */}
                  </TabsList>
                  <TabsContent value='GeneralInfo'>
                     <GeneralInfo userInfo={currentUser?.data?.UserProfile} isCurrentUser={true} />
                  </TabsContent>
                  <TabsContent value='JobInfo'>
                     <JobInfo jobInfo={currentUser?.data?.UserProfile} />
                  </TabsContent>
                  <TabsContent value='Settings'>
                     <AccountSettings userStings={currentUser?.data?.UserProfile?.user} />
                  </TabsContent>
               </Tabs>
            </div>
         </div>
      </ProtectedPage>
   );
};

export default ProfilePage;
