import ProtectedPage from '@/components/ProtectedPage';
import EmployeeForm from '../_components/EmployeeForm';
//services
import { roleServerService } from '@/services/role/role.server.service';
import { rankServerService } from '@/services/rank/rank.server.service';
import { orgService } from '@/services/organization/org.server.service';
import { directorateService } from '@/services/directorate/directorate.server.service';

const EmployeeCreatePage = async () => {
   const orgList = await orgService.getOrgs();
   const roleList = await roleServerService.getRoles();
   const rankList = await rankServerService.getRanks();
   const directorateList = await directorateService.getDirectorates();

   return (
      <ProtectedPage>
         <div>
            <EmployeeForm orgList={orgList} rankList={rankList} roleList={roleList} directorateList={directorateList} />
         </div>
      </ProtectedPage>
   );
};

export default EmployeeCreatePage;
