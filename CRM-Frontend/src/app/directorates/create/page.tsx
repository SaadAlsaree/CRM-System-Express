import ProtectedPage from '@/components/ProtectedPage';
import { Card } from '@/components/ui/card';
import { Building } from 'lucide-react';
import { Divider } from '@/components';
import DirectorateForm from '../_components/DirectorateForm';
import { orgService } from '@/services/organization/org.server.service';

const AddDirectoratePage = async () => {
   const orgList = await orgService.getOrgs();
   return (
      <ProtectedPage>
         <Card className='mx-4 2xl:mx-44 xl:mx-32 md:mx-10 mt-10'>
            <div className='flex items-center justify-between'>
               <h1 className='text-xl font-semibold text-primary'>إنشاء مديرية جديدة .</h1>
               <Building className='h-8 w-8 text-primary' />
            </div>
            <Divider title='' />
            <DirectorateForm orgList={orgList} />
         </Card>
      </ProtectedPage>
   );
};

export default AddDirectoratePage;
