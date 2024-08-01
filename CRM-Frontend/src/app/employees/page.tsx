import ProtectedPage from '@/components/ProtectedPage';

const EmployeeHomePage = () => {
   return (
      <ProtectedPage>
         <div>
            <h1>Employee Home Page</h1>
         </div>
      </ProtectedPage>
   );
};

export default EmployeeHomePage;
