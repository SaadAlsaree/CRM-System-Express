'use client';
import React, { useState } from 'react';
import * as XLSX from 'xlsx';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Spinner } from '@/components/ui/spinner';
import UploadFile from './UploadFile';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';

type ExcelData = any[][];
type Props = {
   searchParams?: { page: string; search: string; organization: string; department: string };
};

const ExcelToTable = ({ searchParams }: Props) => {
   const [data, setData] = useState<ExcelData>([]);
   const [loading, setLoading] = useState<boolean>(false);

   const onFileUpload = (file: File) => {
      setLoading(true);

      const reader = new FileReader();
      reader.onload = (e) => {
         const binaryString = e.target?.result;
         if (typeof binaryString !== 'string') {
            setLoading(false);
            return;
         }

         const workbook = XLSX.read(binaryString, { type: 'binary' });
         const sheetName = workbook.SheetNames[0];
         const worksheet = workbook.Sheets[sheetName];
         const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as ExcelData;

         setData(jsonData);

         console.log(JSON.stringify(jsonData));
         setLoading(false);
      };

      reader.readAsBinaryString(file);
   };

   // Convert table data to JSON format
   const convertDataToJSON = () => {
      if (data.length === 0) return;

      const headers = data[0];
      const rows = data.slice(1);

      const jsonData = rows.map((row) => {
         let obj: { [key: string]: any } = {};
         row.forEach((cell, index) => {
            obj[headers[index]] = cell;
         });
         return obj;
      });

      // console.log(JSON.stringify(jsonData, null, 2));
      // Optionally, you can trigger a download of the JSON data
      const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
   };

   return (
      <div>
         <Card>
            <div className='grid grid-cols-1 xl:grid-cols-2'>
               <UploadFile onFileUpload={onFileUpload} />
               <div className='flex justify-between items-center mx-8'>
                  <h1 className='text-primary text-2xl'>الملف</h1>
                  <Button onClick={convertDataToJSON}>
                     <span>تحميل JSON</span>
                     <FileDown className='mr-2' />
                  </Button>
               </div>
            </div>
         </Card>

         {loading ? ( // Show loading indicator when loading
            <div className='flex justify-center items-center m-32'>
               <Spinner />
            </div>
         ) : (
            <div className='mt-6'>
               <Table>
                  <TableHeader>
                     <TableRow>
                        <TableHead>الترميز</TableHead>
                        <TableHead>كلمة المرور الأفتراضية</TableHead>
                        <TableHead>لون الصورة</TableHead>
                        <TableHead>الأسم الكامل</TableHead>
                        <TableHead>الصلاحيات</TableHead>
                        <TableHead>المنصب</TableHead>
                        <TableHead>المديرية</TableHead>
                        <TableHead>القسم</TableHead>
                     </TableRow>
                  </TableHeader>
                  <TableBody>
                     {data.slice(1).map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                           <TableCell>{row[0]}</TableCell>
                           <TableCell>{row[1]}</TableCell>
                           <TableCell>{row[2]}</TableCell>
                           <TableCell>{row[3]}</TableCell>
                           {/* <TableCell>{row[4]}</TableCell> */}
                           <TableCell></TableCell>
                           <TableCell>{row[5]}</TableCell>
                           <TableCell>{row[6]}</TableCell>
                           <TableCell>{row[7]}</TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
            </div>
         )}
      </div>
   );
};

export default ExcelToTable;
