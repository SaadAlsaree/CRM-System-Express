import { Home, Building2, Users, MessageCircleMore } from 'lucide-react';
import { ISidebarItem } from './types/navigation.routes';


const items: ISidebarItem[] = [
   {
      name: 'الرئيسية',
      path: '/',
      icon: Home as any
   },
   {
      name: 'الدوائر و المديريات',
      path: '/organizations',
      icon: Building2 as any,
      items: [
         {
            name: 'الرئيسية',
            path: '/organizations'
         },
         {
            name: 'قائمة الدوائر و المديريات',
            path: '/organizations/list'
         },
      ]
   },
   {
      name: 'الموظفين',
      path: '/employees',
      icon: Users as any,
      items: [
         {
            name: 'الرئيسية',
            path: '/employees',
         }, {
            name: 'قائمة الموظفين',
            path: '/employees/list',
         },
         {
            name: 'إضافة موظف جديد',
            path: '/employees/create',
         }
      ]
   },

   {
      name: 'المحادثات',
      path: '/chat',
      icon: MessageCircleMore as any
   }

];

export default items;
