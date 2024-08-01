import DepartmentForm from '@/app/organizations/_components/DepartmentForm';
import { Divider } from '@/components';
import ProtectedPage from '@/components/ProtectedPage';
import { Card } from '@/components/ui/card';

interface Props {
   params: { id: string };
}

const DepartmentCreatePage = ({ params }: Props) => {
   return (
      <ProtectedPage>
         <Card className='mx-4 2xl:mx-44 xl:mx-32 md:mx-10 mt-10'>
            <div className='flex items-center justify-between'>
               <h1 className='text-xl font-semibold text-primary'>إنشاء قسم جديد .</h1>
               {/* <Building className='h-8 w-8 text-primary' /> */}
            </div>
            <Divider title='' />
            <DepartmentForm orgId={params.id} />
         </Card>
      </ProtectedPage>
   );
};

export default DepartmentCreatePage;
