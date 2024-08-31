'use client';
import * as React from 'react';
import { AlertCircle, Archive, Inbox, MessagesSquare, PenBox, Search, Send, Trash2 } from 'lucide-react';

import { AccountSwitcher } from './account-switcher';
import { MailDisplay } from './mail-display';
import { MailList } from './mail-list';
import { Nav } from './nav';
import { Mail } from '../data';
import { useMail } from '../use-mail';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

interface MailProps {
   accounts: {
      label: string;
      email: string;
      icon: React.ReactNode;
   }[];
   mails: Mail[];
   defaultLayout: number[] | undefined;
   defaultCollapsed?: boolean;
   navCollapsedSize: number;
}

export function MailComponent({ accounts, mails, defaultLayout = [265, 440, 655], defaultCollapsed = false, navCollapsedSize }: MailProps) {
   const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
   const [mail] = useMail();

   return (
      <TooltipProvider delayDuration={0}>
         <ResizablePanelGroup
            direction='horizontal'
            onLayout={(sizes: number[]) => {
               document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`;
            }}
            className='h-full  items-stretch'
         >
            <ResizablePanel
               defaultSize={defaultLayout[0]}
               collapsedSize={navCollapsedSize}
               collapsible={true}
               minSize={15}
               maxSize={20}
               onCollapse={() => {
                  setIsCollapsed(true);
                  document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(true)}`;
               }}
               onExpand={() => {
                  setIsCollapsed(false);
                  document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(false)}`;
               }}
               className={cn(isCollapsed && 'transition-all duration-300 ease-in-out')}
            >
               <div className='flex items-center p-2'>
                  <div
                     className='w-full'
                     // className={cn("w-full flex-1", isCollapsed ? "w-full" : "w-[80%]")}
                  >
                     <AccountSwitcher isCollapsed={isCollapsed} accounts={accounts} />
                  </div>
               </div>
               <Separator />
               <div className={cn(isCollapsed ? 'block' : 'hidden')}>
                  <Nav
                     isCollapsed={isCollapsed}
                     links={[
                        {
                           title: 'Compose',
                           label: '',
                           icon: PenBox,
                           variant: 'ghost'
                        }
                     ]}
                  />
               </div>
               <Nav
                  isCollapsed={isCollapsed}
                  links={[
                     {
                        title: 'البريد الوارد',
                        label: '128',
                        icon: Inbox,
                        variant: 'default'
                     },

                     {
                        title: 'المرسل',
                        label: '',
                        icon: Send,
                        variant: 'ghost'
                     },

                     {
                        title: 'السلة',
                        label: '',
                        icon: Trash2,
                        variant: 'ghost'
                     },
                     {
                        title: 'أرشيف',
                        label: '',
                        icon: Archive,
                        variant: 'ghost'
                     }
                  ]}
               />
               <Separator />
               <Nav
                  isCollapsed={isCollapsed}
                  links={[
                     {
                        title: 'التحديثات',
                        label: '342',
                        icon: AlertCircle,
                        variant: 'ghost'
                     },
                     {
                        title: 'فورمات',
                        label: '128',
                        icon: MessagesSquare,
                        variant: 'ghost'
                     }
                  ]}
               />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
               <Tabs defaultValue='all'>
                  <div className='flex items-center px-4 py-2'>
                     <h1 className='text-xl font-bold'>صندوق الوارد</h1>
                     <TabsList className='mr-auto'>
                        <TabsTrigger value='all' className='text-zinc-600 dark:text-zinc-200'>
                           جميع البريد
                        </TabsTrigger>
                        <TabsTrigger value='unread' className='text-zinc-600 dark:text-zinc-200'>
                           غير مقروء
                        </TabsTrigger>
                     </TabsList>
                  </div>
                  <Separator />
                  <div className='bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
                     <form>
                        <div className='relative'>
                           <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
                           <Input placeholder='بحث ...' className='pl-8' />
                        </div>
                     </form>
                  </div>
                  <TabsContent value='all' className='m-0'>
                     <MailList items={mails} />
                  </TabsContent>
                  <TabsContent value='unread' className='m-0'>
                     <MailList items={mails.filter((item) => !item.read)} />
                  </TabsContent>
               </Tabs>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={defaultLayout[2]}>
               <MailDisplay mail={mails.find((item) => item.id === mail.selected) || null} />
            </ResizablePanel>
         </ResizablePanelGroup>
      </TooltipProvider>
   );
}
