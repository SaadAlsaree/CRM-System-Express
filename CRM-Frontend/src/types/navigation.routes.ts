export interface ISidebarItem {
   name: string;
   path: string;
   icon: any;
   items?: ISubItem[];
}

export interface ISubItem {
   name: string;
   path: string;
}
