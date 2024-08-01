import React, { PropsWithChildren, ReactNode } from 'react';

const ErrorMessage = ({ children }: PropsWithChildren) => {
   if (!children) return null;

   return <p className='text-red-600 text-sm'>{children}</p>;
};

export default ErrorMessage;
