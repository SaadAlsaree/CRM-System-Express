import ProtectedPage from '@/components/ProtectedPage';
import OrganizationForm from '../_components/OrganizationForm';
import { Card } from '@/components/ui/card';
import { Building } from 'lucide-react';
import { Divider } from '@/components';

const CreateOrganization = () => {
   return (
      <ProtectedPage>
         <Card className='mx-4 2xl:mx-44 xl:mx-32 md:mx-10 mt-10'>
            <div className='flex items-center justify-between'>
               <h1 className='text-xl font-semibold text-primary'>إنشاء دائرة أو مديرية جديدة .</h1>
               <Building className='h-8 w-8 text-primary' />
            </div>
            <Divider title='' />
            <OrganizationForm />
         </Card>
      </ProtectedPage>
   );
};

export default CreateOrganization;
