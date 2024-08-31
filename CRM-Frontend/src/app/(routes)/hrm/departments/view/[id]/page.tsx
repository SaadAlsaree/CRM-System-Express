import { Divider } from '@/components';
import { Card } from '@/components/ui/card';
//service
import { orgService } from '@/services/organization/org.server.service';

interface Props {
   params: { id: string };
}

const DepartmentViewPage = async ({ params }: Props) => {
   const { data } = await orgService.getDepartmentById(params.id);

   return (
      <div>
         <Card className='mx-10 xl:mx-32 2xl:mx-40 mt-16'>
            <h1 className='text-2xl font-bold text-primary'>تفاصيل القسم .</h1>
            <Divider title='' />
            <div className='flow-root mt-12 p-4'>
               <dl className='-my-3 divide-y divide-gray-100 text-sm '>
                  <div className='grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4'>
                     <dt className='font-medium '>الأسم :</dt>
                     <dd className=' sm:col-span-2'>{data?.department.name}</dd>
                  </div>

                  <div className='grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4 dark:bg-gray-900'>
                     <dt className='font-medium '>الترميز :</dt>
                     <dd className=' sm:col-span-2'>{data?.department.code}</dd>
                  </div>

                  <div className='grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4'>
                     <dt className='font-medium '>البريد الألكتروني :</dt>
                     <dd className=' sm:col-span-2'>{data?.department.email}</dd>
                  </div>

                  <div className='grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4 dark:bg-gray-900'>
                     <dt className='font-medium '>رقم الهاتف :</dt>
                     <dd className=' sm:col-span-2'>{data?.department.phone}</dd>
                  </div>

                  <div className='grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4'>
                     <dt className='font-medium '>الوصف :</dt>
                     <dd className=' sm:col-span-2'>{data?.department.description}</dd>
                  </div>

                  <div className='grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4 dark:bg-gray-900'>
                     <dt className='font-medium '> تاريخ الأنشاء :</dt>
                     <dd className=' sm:col-span-2'> {data?.department.createdAt.split('T', 1)}</dd>
                  </div>
               </dl>
            </div>
         </Card>
      </div>
   );
};

export default DepartmentViewPage;
