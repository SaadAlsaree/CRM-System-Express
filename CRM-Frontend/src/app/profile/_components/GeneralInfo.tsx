import React from 'react';

const GeneralInfo = () => {
   return (
      <div className='flow-root rounded-lg border-gray-100 py-3 m-4'>
         <div className=' my-4'>
            <h1 className='text-xl font-semibold text-gray-500'>معلومات عامة :</h1>
         </div>
         <dl className='-my-3 divide-y divide-gray-100 text-sm'>
            <div className='grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4'>
               <dt className='font-medium '>UserLogin</dt>
               <dd className=' sm:col-span-2'>101313</dd>
            </div>

            <div className='grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4 dark:bg-gray-900'>
               <dt className='font-medium '>Full Name</dt>
               <dd className=' sm:col-span-2'>Saad Alsaree</dd>
            </div>

            <div className='grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4'>
               <dt className='font-medium '>Email</dt>
               <dd className='sm:col-span-2'>saad@inss.com</dd>
            </div>

            <div className='grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4 dark:bg-gray-900'>
               <dt className='font-medium'>Phone</dt>
               <dd className=' sm:col-span-2'>07712310077</dd>
            </div>

            <div className='grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4'>
               <dt className='font-medium '>Org</dt>
               <dd className='sm:col-span-2'>G36</dd>
            </div>

            <div className='grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4 dark:bg-gray-900'>
               <dt className='font-medium '>Bio</dt>
               <dd className=' sm:col-span-2'>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et facilis debitis explicabo doloremque impedit nesciunt dolorem
                  facere, dolor quasi veritatis quia fugit aperiam aspernatur neque molestiae labore aliquam soluta architecto?
               </dd>
            </div>
         </dl>
      </div>
   );
};

export default GeneralInfo;
