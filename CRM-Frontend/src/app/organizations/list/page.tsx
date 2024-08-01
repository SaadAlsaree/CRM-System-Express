//service
import { orgService } from '@/services/organization/org.server.service';
import ProtectedPage from '@/components/ProtectedPage';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Building2, Plus } from 'lucide-react';

import OrganizationTable from '../_components/OrganizationTable';
import Link from 'next/link';

const columns: { label: string; value: any; className?: string }[] = [
   { label: 'الأسم', value: 'name', className: 'font-bold' },
   { label: 'الترميز', value: 'code', className: 'hidden md:table-cell font-bold' },
   { label: 'النوع', value: 'type', className: 'hidden md:table-cell font-bold' },
   { label: 'عدد الموظفين', value: 'employees', className: 'hidden md:table-cell font-bold' },
   { label: 'العنوان', value: 'address', className: 'hidden md:table-cell font-bold' },
   { label: 'الهاتف', value: 'phone', className: 'hidden md:table-cell font-bold' },
   { label: 'البريد الإلكتروني', value: 'email', className: 'hidden md:table-cell font-bold' },
   // { label: 'الموقع الإلكتروني', value: 'website', className: 'hidden md:table-cell font-bold' },
   { label: 'الإجراءات', value: 'actions', className: 'font-bold' }
];

enum OrganizationType {
   A = 'A',
   B = 'B',
   Other = 'Other'
}
type Props = {
   type: OrganizationType;
   searchParams: any;
};
const OrganizationList = async ({ searchParams }: Props) => {
   const OrgData = await orgService.getOrgs();
   return (
      <ProtectedPage>
         <div>
            <Card>
               <div className='flex justify-between items-center mt-2 mb-6'>
                  <div className='flex flex-row gap-2'>
                     <Building2 className='text-primary' />
                     <h1 className='text-2xl font-bold text-primary'>قائمة الدوائر و المديريات .</h1>
                  </div>

                  <div className='flex flex-row items-center gap-2'>
                     {/* <Button variant='outline'>فلتر</Button> */}

                     <Button variant='outline'>
                        <Link href='/organizations/create' className='ml-4'>
                           إضافة جديدة
                        </Link>

                        <Plus className='h-10 text-primary' />
                     </Button>
                  </div>
               </div>
               <OrganizationTable columns={columns} searchParams={searchParams} OrgData={OrgData} />
            </Card>
         </div>
      </ProtectedPage>
   );
};

export default OrganizationList;
