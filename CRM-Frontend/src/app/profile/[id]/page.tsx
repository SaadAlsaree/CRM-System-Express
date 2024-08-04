import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProtectedPage from '@/components/ProtectedPage';

// Services
import { userServerService } from '@/services/user/user.server.service';
// Profile components
import ProfileHeader from '../_components/Header';
import GeneralInfo from '../_components/GeneralInfo';
import JobInfo from '../_components/JobInfo';
import AccountSettings from '../_components/AccountSettings';

type Props = {
   params: { id: string };
};
const PRofileWithIdPage = async ({ params }: Props) => {
   const profile = await userServerService.getUserProfile(params.id);

   return (
      <ProtectedPage>
         <div className='rounded-[3px] border '>
            <ProfileHeader userData={profile?.data?.user} />
            <div className='mt-4'>
               <Tabs defaultValue='GeneralInfo' className='w-full'>
                  <TabsList className='w-full'>
                     <TabsTrigger value='GeneralInfo'>معلومات عامة</TabsTrigger>
                     <TabsTrigger value='JobInfo'>معلومات الوظيفة</TabsTrigger>
                     <TabsTrigger value='cases'>المشاريع</TabsTrigger>
                     <TabsTrigger value='Tasks'>المهام</TabsTrigger>
                     <TabsTrigger value='Tickets'>التذاكر</TabsTrigger>
                     <TabsTrigger value='MyLeave'>الأجازات</TabsTrigger>

                     {/* <TabsTrigger value='JobInfo'></TabsTrigger> */}
                  </TabsList>
                  <TabsContent value='GeneralInfo'>
                     <GeneralInfo userInfo={profile?.data?.user} isCurrentUser={false} />
                  </TabsContent>
                  <TabsContent value='JobInfo'>
                     <JobInfo jobInfo={profile?.data?.user} />
                  </TabsContent>
                  <TabsContent value='cases'>Cases</TabsContent>
                  <TabsContent value='Tasks'>Tasks</TabsContent>
                  <TabsContent value='Tickets'>Tickets</TabsContent>
                  <TabsContent value='MyLeave'>MyLeave</TabsContent>
               </Tabs>
            </div>
         </div>
      </ProtectedPage>
   );
};

export default PRofileWithIdPage;
