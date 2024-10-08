import EmployeeForm from '../../_components/EmployeeForm';
//services
import { userServerService } from '@/services/user/user.server.service';

type Props = {
   params: { id: string };
};
const EmployeeEditPage = async ({ params }: Props) => {
   const data = await userServerService.getUserById(params.id);

   return (
      <div>
         <div>
            <EmployeeForm employee={data?.data?.user} />
         </div>
      </div>
   );
};

export default EmployeeEditPage;
