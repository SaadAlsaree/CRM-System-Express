import React from 'react';
import DepartmentCard from './DepartmentCard';

type Props = {
   departments: any;
};

const DepartmentList = ({ departments }: Props) => {
   return (
      <div className='grid grid-cols-1 xl:grid-cols-3 gap-2 mt-4 overflow-auto h-80'>
         {departments.length == 0 ? (
            <h1 className='text-blue-600 text-center text-xl'>لا توجد أقسام مضافة .</h1>
         ) : (
            departments.map((department: any) => <DepartmentCard departmentInfo={department} key={department._id} />)
         )}
      </div>
   );
};

export default DepartmentList;
