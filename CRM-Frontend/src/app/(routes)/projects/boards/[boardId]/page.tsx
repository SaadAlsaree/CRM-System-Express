import React, { Suspense } from 'react';

// import Container from "@/app/[locale]/(routes)/components/ui/Container";
import NewSectionDialog from './dialogs/NewSection';

import NewTaskInProjectDialog from './dialogs/NewTaskInProject';
// import { getActiveUsers } from "@/actions/get-users";
// import { getBoardSections } from "@/actions/projects/get-board-sections";
import DeleteProjectDialog from './dialogs/DeleteProject';
// import { getKanbanData } from "@/actions/projects/get-kanban-data";
import Kanban from './components/Kanban';
// import { getBoards } from "@/actions/projects/get-boards";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import { Users } from "@prisma/client";
import AiAssistantProject from './components/AiAssistantProject';
import { Lock } from 'lucide-react';
import ProtectedPage from '@/components/ProtectedPage';

interface BoardDetailProps {
   params: { boardId: string };
}

export const maxDuration = 300;

const BoardPage = async ({ params }: BoardDetailProps) => {
   const { boardId } = params;
   const board: any;
   const boards: any;
   const users: Users[] = await getActiveUsers();
   const sections: any = await getBoardSections(boardId);
   const kanbanData = await getKanbanData(boardId);

   //console.log(board, "board");
   return (
      <ProtectedPage>
         <div className='flex justify-between py-5 w-full'>
            <div className='space-x-2'>
               <NewSectionDialog boardId={boardId} />
               <NewTaskInProjectDialog boardId={boardId} users={users} sections={sections} />
               <AiAssistantProject session={session} boardId={boardId} />
            </div>
            <div>
               <DeleteProjectDialog boardId={boardId} boardName={board.board.title} />
            </div>
         </div>
         <Kanban data={kanbanData.sections} boardId={boardId} boards={boards} users={users} />
      </ProtectedPage>
   );
};

export default BoardPage;
