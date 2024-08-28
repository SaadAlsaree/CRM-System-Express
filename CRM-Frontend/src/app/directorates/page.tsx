import ProtectedPage from '@/components/ProtectedPage';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Building2, Plus } from 'lucide-react';
import Link from 'next/link';
import DirectorateTable from './_components/DirectorateTable';
//Service
import { directorateService } from '@/services/directorate/directorate.server.service';

const columns: { label: string; value: any; className?: string }[] = [
   { label: 'الأسم', value: 'name', className: 'font-bold' },
   { label: 'الترميز', value: 'code', className: 'hidden md:table-cell font-bold' },
   { label: 'الدائرة', value: 'organization', className: 'hidden md:table-cell font-bold' },
   { label: 'العنوان', value: 'address', className: 'hidden md:table-cell font-bold' },
   { label: 'الهاتف', value: 'phone', className: 'hidden md:table-cell font-bold' },
   { label: 'البريد الإلكتروني', value: 'email', className: 'hidden md:table-cell font-bold' },
   // { label: 'الموقع الإلكتروني', value: 'website', className: 'hidden md:table-cell font-bold' },
   { label: 'الإجراءات', value: 'actions', className: 'font-bold' }
];

type Props = {
   searchParams: any;
};

const DirectoratesPage = async ({ searchParams }: Props) => {
   const page = parseInt(searchParams.page) || 1;
   const pageSize = 12;

   const directorates: any = await directorateService.getDirectorates(page);

   // console.log(directorates.Data);
   return (
      <ProtectedPage>
         <div>
            <Card>
               <div className='flex justify-between items-center mt-2 mb-6'>
                  <div className='flex flex-row gap-2'>
                     <Building2 className='text-primary' />
                     <h1 className='text-2xl font-bold text-primary'>قائمة المديريات .</h1>
                  </div>

                  <div className='flex flex-row items-center gap-2'>
                     {/* <Button variant='outline'>فلتر</Button> */}

                     <Button variant='outline'>
                        <Link href='/directorates/create' className='ml-4'>
                           إضافة جديدة
                        </Link>

                        <Plus className='h-10 text-primary' />
                     </Button>
                  </div>
               </div>
               <DirectorateTable columns={columns} searchParams={searchParams} directorates={directorates.Data} />
            </Card>
         </div>
      </ProtectedPage>
   );
};

export default DirectoratesPage;
