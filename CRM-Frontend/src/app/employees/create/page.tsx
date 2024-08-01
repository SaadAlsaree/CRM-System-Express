import ProtectedPage from '@/components/ProtectedPage';
import EmployeeForm from '../_components/EmployeeForm';

const EmployeeCreatePage = () => {
   return (
      <ProtectedPage>
         <div>
            <EmployeeForm />
         </div>
      </ProtectedPage>
   );
};

export default EmployeeCreatePage;
