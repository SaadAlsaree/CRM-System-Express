export interface ISidebarItem {
   name: string;
   path: string;
   icon: any;
   items?: ISubItem[];
   permission: string;
}

export interface ISubItem {
   name: string;
   path: string;
   permission: string;
}
