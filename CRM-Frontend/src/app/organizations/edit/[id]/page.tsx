import ProtectedPage from '@/components/ProtectedPage';
//services
import { orgService } from '@/services/organization/org.server.service';
import OrganizationForm from '../../_components/OrganizationForm';
import { Card } from '@/components/ui/card';
import { Building } from 'lucide-react';
import { Divider } from '@/components';

interface Props {
   params: { id: string };
}
const EditOrganization = async ({ params }: Props) => {
   const data = await orgService.getOrgById(params.id);

   return (
      <ProtectedPage>
         <Card className='mx-4 2xl:mx-44 xl:mx-32 md:mx-10 mt-10'>
            <div className='flex items-center justify-between'>
               <h1 className='text-xl font-semibold text-primary'>تعديل البيانات .</h1>
               <Building className='h-8 w-8 text-primary' />
            </div>
            <Divider title='' />
            <OrganizationForm organization={data.data.organization} />
         </Card>
      </ProtectedPage>
   );
};

export default EditOrganization;
