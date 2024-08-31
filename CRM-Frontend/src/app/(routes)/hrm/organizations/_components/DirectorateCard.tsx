import React from 'react';
import Link from 'next/link';
import { CiViewList } from 'react-icons/ci';

type Props = {
   directorateInfo?: any;
};

const DirectorateCard = ({ directorateInfo }: Props) => {
   return (
      <div className='rounded-md odd:bg-cyan-50 even:bg-lime-50 p-4  hover:shadow-sm active:shadow-none'>
         <div className='flex items-start justify-between '>
            <div className='rounded-2xl bg-white  p-2'>
               <h1 className='text-gray-600 '>{directorateInfo.name}</h1>
            </div>
            <div>
               <Link href={`/directorates/view/${directorateInfo._id}`}>
                  <CiViewList size={32} className='text-gray-400 hover:text-gray-600 cursor-pointer' />
               </Link>
            </div>
         </div>
         <div className='my-4'>
            <h1 className='text-blue-500 font-bold underline'>{directorateInfo.code}</h1>
         </div>
         <div className='mt-6 text-sm text-gray-600'>
            <h1>{directorateInfo.description}</h1>
         </div>
      </div>
   );
};

export default DirectorateCard;
