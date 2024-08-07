import ProtectedPage from '@/components/ProtectedPage';
import ExcelToTable from '../_components/ExcelToTable';

const ImportFromExcel = () => {
   return (
      <ProtectedPage>
         <ExcelToTable />
      </ProtectedPage>
   );
};

export default ImportFromExcel;
