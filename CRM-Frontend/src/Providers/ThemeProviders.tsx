'use client';
import React from 'react';
import { ThemeProvider } from 'next-themes';
import { DirectionProvider } from '@radix-ui/react-direction';

const ThemeProviders = ({ children }: { children: React.ReactNode }) => {
   return (
      <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
         <DirectionProvider dir='rtl'>{children}</DirectionProvider>
      </ThemeProvider>
   );
};

export default ThemeProviders;
