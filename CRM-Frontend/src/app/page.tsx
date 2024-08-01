import ProtectedPage from '@/components/ProtectedPage';

import { Button } from '@/components/ui/button';

export default async function Home() {
   return (
      <ProtectedPage>
         <div className='flex flex-col justify-center items-center gap-4'>
            <h1 className='text-4xl font-bold'>Home</h1>
            <p className='text-lg text-gray-500'>Welcome to the home Inss</p>
            <div className='mt-12 w-full'></div>

            <Button>Logout</Button>
         </div>
      </ProtectedPage>
   );
}
