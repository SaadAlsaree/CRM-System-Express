const TextMessage = () => {
   return (
      <div>
         <div className='flex items-start gap-2.5  mb-4'>
            <img src='https://pagedone.io/asset/uploads/1710412177.png' alt='Shanay image' className='w-10 h-11' />
            <div className='flex flex-col gap-1 w-full max-w-[320px]'>
               <div className='flex items-center space-x-2 rtl:space-x-reverse'>
                  <span className='text-sm font-semibold text-gray-900 dark:text-white'>You</span>
                  <span className='text-sm font-normal text-gray-500 dark:text-gray-400'>11:46</span>
               </div>
               <div className='flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700'>
                  <p className='text-sm font-normal text-gray-900 dark:text-white'>
                     {' '}
                     That s awesome. I think our users will really appreciate the improvements.
                  </p>
               </div>
               <span className='text-sm font-normal text-gray-500 dark:text-gray-400'>Send</span>
            </div>
         </div>
         <div className='flex items-start justify-end gap-2.5'>
            <div className='flex flex-col gap-1 w-full max-w-[320px]'>
               <div className='flex items-end justify-end space-x-2 rtl:space-x-reverse'>
                  <span className='text-sm font-normal text-gray-500 dark:text-gray-400'>11:46</span>
                  <span className='text-sm font-semibold text-gray-900 dark:text-white '>Bonnie Green</span>
               </div>
               <div className='flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700'>
                  <p className='text-sm font-normal text-gray-900 dark:text-white'>
                     {' '}
                     That s awesome. I think our users will really appreciate the improvements.
                  </p>
               </div>
               <span className='text-sm font-normal text-gray-500 dark:text-gray-400'>Receiving</span>
            </div>
            <img src='https://pagedone.io/asset/uploads/1710412177.png' alt='Shanay image' className='w-10 h-11' />
         </div>
      </div>
   );
};

export default TextMessage;
