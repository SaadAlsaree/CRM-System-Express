import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import verifyToken from '@/utils/verifyToken';

import Layouts from '@/components/Layouts';

const ProtectedPage = ({ children }: { children: React.ReactNode }) => {
   const base64Token: string = cookies().get('ERM-Session')?.value as string;

   // console.log(`ERM-Session=${cookies().get('ERM-Session')?.value}; ERM-Session.sig=${cookies().get('ERM-Session.sig')?.value}`);
   if (base64Token) {
      const token = JSON.parse(Buffer.from(base64Token, 'base64').toString('utf-8')) as { jwt: string };

      if (!token.jwt) {
         redirect('/Login');
      }

      if (!verifyToken(token.jwt)) {
         redirect('/Login');
      }
   }

   if (!base64Token) {
      redirect('/Login');
   }

   return <Layouts>{children}</Layouts>;
};

export default ProtectedPage;
