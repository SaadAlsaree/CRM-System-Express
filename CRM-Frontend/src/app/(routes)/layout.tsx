import ProtectedPage from '@/components/ProtectedPage';
import React from 'react';

const MainLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
   return <ProtectedPage>{children}</ProtectedPage>;
};

export default MainLayout;
