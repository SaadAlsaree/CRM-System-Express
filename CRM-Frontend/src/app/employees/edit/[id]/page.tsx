import ProtectedPage from '@/components/ProtectedPage';
import EmployeeForm from '../../_components/EmployeeForm';

const EmployeeEditPage = () => {
   return (
      <ProtectedPage>
         <div>
            <EmployeeForm />
         </div>
      </ProtectedPage>
   );
};

export default EmployeeEditPage;
