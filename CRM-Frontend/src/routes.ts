import { Home, Building2, Users, MessageCircleMore, CircleCheckBig, CalendarDays, Ticket, Mail } from 'lucide-react';
import { PiSuitcaseSimpleBold } from "react-icons/pi";
import { PiMegaphoneSimpleBold } from "react-icons/pi";
import { ISidebarItem } from './types/navigation.routes';



const items: ISidebarItem[] = [
   {
      name: 'الرئيسية',
      path: '/',
      icon: Home as any,
      permission: 'employee'
   },
   {
      name: 'القضايا',
      path: '/cases',
      icon: PiSuitcaseSimpleBold as any,
      permission: 'employee'
   },
   {
      name: 'المهام',
      path: '/tasks',
      icon: CircleCheckBig as any,
      permission: 'employee'
   },
   {
      name: 'الأحداث',
      path: '/events',
      icon: CalendarDays as any,
      permission: 'employee'
   },
   {
      name: 'الأعمامات',
      path: '/announcements',
      icon: PiMegaphoneSimpleBold as any,
      permission: 'employee'
   },
   {
      name: 'التذاكر',
      path: '/tickets',
      icon: Ticket as any,
      permission: 'employee'
   },
   {
      name: 'البريد الألكتروني',
      path: '/emails',
      icon: Mail as any,
      permission: 'employee'
   },
   {
      name: 'الموارد البشرية',
      path: '/hrm',
      icon: Building2 as any,
      permission: 'admin',
      items: [
         {
            name: 'الدوائر',
            path: '/hrm/organizations',
            permission: 'admin'
         },
         {
            name: 'المديريات',
            path: '/hrm/directorates',
            permission: 'admin'
         },
         {
            name: 'قائمة الموظفين',
            path: '/hrm/employees',
            permission: 'admin'
         },
      ]
   },

   {
      name: 'التذاكر',
      path: '/tickets',
      icon: Ticket as any,
      permission: 'employee'
   },


   {
      name: 'المحادثات',
      path: '/chat',
      icon: MessageCircleMore as any,
      permission: 'employee'
   }

];

export default items;
