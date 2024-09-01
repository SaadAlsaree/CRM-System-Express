import React, { Suspense } from 'react';
// import { getTasks } from '@/actions/projects/get-tasks';
import { TasksDataTable } from './components/data-table';
import { columns } from './components/columns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { KanbanBoard } from './components/KanbanBoard';
import SuspenseLoading from '@/components/loadings/suspense';

const TasksPage = async () => {
   //  const tasks: any = await getTasks();

   return (
      <div className='bg-white rounded-lg p-4 '>
         <Suspense fallback={<SuspenseLoading />}>
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
         </Suspense>
      </div>
   );
};

export default TasksPage;
