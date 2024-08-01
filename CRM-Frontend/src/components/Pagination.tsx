'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface Props {
   itemCount: number;
   pageSize: number;
   currentPage: number;
}
const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
   const router = useRouter();
   const searchParams = useSearchParams();

   const pageCount = Math.ceil(itemCount / pageSize);
   if (pageCount <= 1) return null;

   const changePage = (page: number) => {
      const params = new URLSearchParams(searchParams);
      params.set('page', page.toString());
      router.push(`?${params.toString()}`);
   };

   return (
      <div className='flex justify-between items-center gap-3 mt-3'>
         <div>
            <h1 className='text-gray-500 font-bold'>
               الصفحات {currentPage} من {pageCount}
            </h1>
         </div>
         <div className='flex flex-row gap-2'>
            <Button color='gray' variant='outline' disabled={currentPage === 1} onClick={() => changePage(1)}>
               <ChevronsRight />
            </Button>

            <Button color='gray' variant='outline' disabled={currentPage === 1} onClick={() => changePage(currentPage - 1)}>
               <ChevronRight />
            </Button>

            <Button color='gray' variant='outline' disabled={currentPage === pageCount} onClick={() => changePage(currentPage + 1)}>
               <ChevronLeft />
            </Button>

            <Button color='gray' variant='outline' disabled={currentPage === pageCount} onClick={() => changePage(pageCount)}>
               <ChevronsLeft />
            </Button>
         </div>
      </div>
   );
};

export default Pagination;
