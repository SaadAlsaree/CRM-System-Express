import React from 'react';
import DirectorateCard from './DirectorateCard';

type Props = {
   directorates: any;
};
const DirectoratesList = ({ directorates }: Props) => {
   return (
      <div className='flex flex-col  gap-2 mt-4 overflow-scroll  max-h-96'>
         {directorates.length == 0 ? (
            <h1 className='text-blue-600 text-center text-xl'>لا توجد مديريات مضافة .</h1>
         ) : (
            directorates.map((directorate: any) => <DirectorateCard directorateInfo={directorate} key={directorate._id} />)
         )}
      </div>
   );
};

export default DirectoratesList;
