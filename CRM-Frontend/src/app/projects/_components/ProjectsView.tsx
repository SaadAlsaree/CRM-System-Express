import React from 'react';
import Link from 'next/link';

import NewTaskDialog from '../dialogs/NewTask';
import NewProjectDialog from '../dialogs/NewProject';

import { Button } from '@/components/ui/button';

import { ProjectsDataTable } from '../table-components/data-table';
import { columns } from '../table-components/columns';
import AiAssistant from './AiAssistant';

const ProjectsView = async () => {
   return (
      <>
         <div className='flex gap-2 py-10'>
            <NewProjectDialog />
            <NewTaskDialog users={[]} boards={[]} />
            <Button asChild>
               <Link href='/projects/tasks'>All Tasks</Link>
            </Button>
            <Button asChild>
               <Link href={`/projects/tasks/${3}`}>My Tasks</Link>
            </Button>
            <Button asChild>
               <Link href='/projects/dashboard'>Dashboard</Link>
            </Button>
            <AiAssistant session={null} />
         </div>
         <div className='pt-2 space-y-3'>
            <h2>Projects</h2>
            <ProjectsDataTable data={[]} columns={columns} />
         </div>
      </>
   );
};

export default ProjectsView;
