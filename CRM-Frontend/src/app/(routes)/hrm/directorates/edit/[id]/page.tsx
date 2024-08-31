import { Divider } from '@/components';
import { Card } from '@/components/ui/card';
import { Building } from 'lucide-react';
import DirectorateForm from '../../_components/DirectorateForm';

//services
import { directorateService } from '@/services/directorate/directorate.server.service';
import { orgService } from '@/services/organization/org.server.service';

type Props = {
   params: { id: string };
};
const DirectorateEdit = async ({ params }: Props) => {
   const data = await directorateService.getDirectorateById(params.id, 1);
   const orgList = await orgService.getOrgs();
   return (
      <div>
         <Card className='mx-4 2xl:mx-44 xl:mx-32 md:mx-10 mt-10'>
            <div className='flex items-center justify-between'>
               <h1 className='text-xl font-semibold text-primary'>تعديل البيانات .</h1>
               <Building className='h-8 w-8 text-primary' />
            </div>
            <Divider title='' />
            <DirectorateForm directorate={data?.Data} orgList={orgList} />
         </Card>
      </div>
   );
};

export default DirectorateEdit;
