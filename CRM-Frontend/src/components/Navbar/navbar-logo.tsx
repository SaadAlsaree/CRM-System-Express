import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface LogoLinkProps {
   alwaysRender?: boolean;
   className?: string;
}

export const LogoLink = ({ alwaysRender, className }: LogoLinkProps) => {
   return (
      <Link className={cn('hidden gap-3 md:flex items-center', alwaysRender && 'flex', className)} href='/'>
         <Image alt='Logo' src='/logoINSS.png' width='40' height='40' />
         <span className='text-xl font-bold text-primary'>G36</span>
      </Link>
   );
};

const NavbarLogo = () => {
   return (
      <>
         <LogoLink />
      </>
   );
};

export default NavbarLogo;
