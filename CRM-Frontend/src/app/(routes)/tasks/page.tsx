import React from 'react';
// import { getTasks } from '@/actions/projects/get-tasks';
import { TasksDataTable } from './components/data-table';
import { columns } from './components/columns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { KanbanBoard } from './components/KanbanBoard';

const TasksPage = async () => {
   //  const tasks: any = await getTasks();

   return (
      <div>
         <Tabs defaultValue='tableTask'>
            <TabsList>
               <TabsTrigger value='tableTask'>مهامي</TabsTrigger>
               <TabsTrigger value='kanban'>Kanban</TabsTrigger>
            </TabsList>
            <TabsContent value='tableTask'>
               <TasksDataTable data={[]} columns={columns} />
            </TabsContent>
            <TabsContent value='kanban'>
               <KanbanBoard />
            </TabsContent>
         </Tabs>
         <div></div>
      </div>
   );
};

export default TasksPage;
