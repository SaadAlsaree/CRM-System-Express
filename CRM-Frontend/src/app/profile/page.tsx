import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Layout } from '@/components';
import ProfileHeader from './_components/Header';
import GeneralInfo from './_components/GeneralInfo';
import JobInfo from './_components/JobInfo';
import AccountSettings from './_components/AccountSettings';

const ProfilePage = () => {
   return (
      <Layout>
         <div className='rounded-[3px] border '>
            <ProfileHeader />
            <div className='mt-4'>
               <Tabs defaultValue='GeneralInfo' className='w-full'>
                  <TabsList className='w-full'>
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
                     <GeneralInfo />
                  </TabsContent>
                  <TabsContent value='JobInfo'>
                     <JobInfo />
                  </TabsContent>
                  <TabsContent value='Settings'>
                     <AccountSettings />
                  </TabsContent>
               </Tabs>
            </div>
         </div>
      </Layout>
   );
};

export default ProfilePage;
