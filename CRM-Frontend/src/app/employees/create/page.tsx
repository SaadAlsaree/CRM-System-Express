import ProtectedPage from '@/components/ProtectedPage';
import EmployeeForm from '../_components/EmployeeForm';
//services
import { roleServerService } from '@/services/role/role.server.service';
import { rankServerService } from '@/services/rank/rank.server.service';
import { orgService } from '@/services/organization/org.server.service';

const EmployeeCreatePage = async () => {
   const orgList = await orgService.getOrgs();
   const roleList = await roleServerService.getRoles();
   const rankList = await rankServerService.getRanks();

   return (
      <ProtectedPage>
         <div>
            <EmployeeForm orgList={orgList} rankList={rankList} roleList={roleList} />
         </div>
      </ProtectedPage>
   );
};

export default EmployeeCreatePage;
