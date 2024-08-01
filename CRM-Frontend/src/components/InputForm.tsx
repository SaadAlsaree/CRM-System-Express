import React from 'react';
import ErrorMessage from './ErrorMessage';

type InputFormProps = {
   name?: string;
   type?: string;
   placeholder?: string;
   icon?: React.ReactNode;
   onChange: any;
};

const TextField = ({ placeholder, name, type, icon, onChange, ...props }: InputFormProps) => {
   return (
      <div className='relative mb-6 w-full'>
         <div className='absolute inset-y-0 start-0 flex items-center ps-2.5 pointer-events-none text-zinc-500'>{icon}</div>
         <input
            onChange={onChange}
            autoComplete='off'
            name={name}
            {...props}
            className='block  ps-10 p-2.5 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
            placeholder={placeholder}
         />
      </div>
   );
};

export default TextField;
