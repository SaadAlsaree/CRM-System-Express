const Divider = ({ title }: { title: string }) => {
   return (
      <span className='relative flex justify-center my-3 '>
         <div className='absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 dark:via-slate-300 to-transparent opacity-75'></div>

         <span className='relative z-50 bg-white dark:bg-zinc-900 px-6'>{title}</span>
      </span>
   );
};

export default Divider;
