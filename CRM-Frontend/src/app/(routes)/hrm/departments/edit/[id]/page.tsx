import DepartmentForm from '@/app/(routes)/organizations/_components/DepartmentForm';
import { Divider } from '@/components';
import { Card } from '@/components/ui/card';
//services
import { orgService } from '@/services/organization/org.server.service';

interface Props {
   params: { id: string };
}

const DepartmentEditPage = async ({ params }: Props) => {
   const { data } = await orgService.getDepartmentById(params.id);

   return (
      <div>
         <Card className='mx-4 2xl:mx-44 xl:mx-32 md:mx-10 mt-10'>
            <div className='flex items-center justify-between'>
               <h1 className='text-xl font-semibold text-primary'>إنشاء قسم جديد .</h1>
               {/* <Building className='h-8 w-8 text-primary' /> */}
            </div>
            <Divider title='' />
            <DepartmentForm department={data?.department} />
         </Card>
      </div>
   );
};

export default DepartmentEditPage;
