import React, { Suspense } from 'react';
import { cookies } from 'next/headers';
import { MailComponent } from './components/mail';
import { accounts, mails } from './data';

import SuspenseLoading from '@/components/loadings/suspense';

import ProtectedPage from '@/components/ProtectedPage';

const EmailRoute = async () => {
   const layout = cookies().get('react-resizable-panels:layout');
   const collapsed = cookies().get('react-resizable-panels:collapsed');
   //console.log(layout, collapsed, "layout, collapsed");

   const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
   const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;

   return (
      <ProtectedPage>
         <Suspense fallback={<SuspenseLoading />}>
            <MailComponent
               accounts={accounts}
               mails={mails}
               defaultLayout={defaultLayout}
               defaultCollapsed={defaultCollapsed}
               navCollapsedSize={4}
            />
         </Suspense>
      </ProtectedPage>
   );
};

export default EmailRoute;
