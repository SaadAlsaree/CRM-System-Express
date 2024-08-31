'use client';
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { updateUserStingsSchema } from '@/schema/user.schema';
import { CustomSwitch } from '@/components';
import { Card } from '@/components/ui/card';
import NotificationsForm from './NotificationsForm';

type updateUserStingsData = z.infer<typeof updateUserStingsSchema>;

type Props = {
   userStings: any;
};

const AccountSettings = ({ userStings }: Props) => {
   return (
      <div className='p-4'>
         <h3 className='mb-4 text-xl text-primary font-semibold'>أدارة الحساب .</h3>
         <div className='grid grid-cols-1 xl:grid-cols-2 gap-4'>
            <div>
               <Card>
                  {' '}
                  <NotificationsForm userStings={userStings} />
               </Card>
            </div>
            <div>
               <Card>Password Change</Card>
            </div>
         </div>
      </div>
   );
};

export default AccountSettings;
