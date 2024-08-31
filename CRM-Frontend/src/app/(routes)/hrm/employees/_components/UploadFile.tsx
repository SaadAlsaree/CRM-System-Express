import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import _ from 'lodash';
//Icons
import { SiMicrosoftexcel } from 'react-icons/si';
import { FileArchive } from 'lucide-react';

interface FilePreviewProps {
   file: File;
   onRemove: () => void;
}

const FilePreview: React.FC<FilePreviewProps> = ({ file, onRemove }) => {
   const [progress, setProgress] = useState(0);

   // Placeholder function to simulate progress
   const simulateUpload = () => {
      const interval = setInterval(() => {
         setProgress((oldProgress) => {
            if (oldProgress === 100) {
               clearInterval(interval);
               return 100;
            }
            return Math.min(oldProgress + 10, 100);
         });
      }, 500);
   };

   React.useEffect(() => {
      simulateUpload();
   }, []);

   // Determine file type
   const fileType = file.type;
   let fileIcon;

   if (fileType.includes('application/zip')) {
      fileIcon = <FileArchive className='text-gray-500' size={40} />;
   } else if (
      fileType.includes('application/vnd.ms-excel') ||
      fileType.includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
   ) {
      fileIcon = <SiMicrosoftexcel className='text-gray-500' size={40} />;
   } else {
      fileIcon = <img className='rounded-lg' src={URL.createObjectURL(file)} alt={file.name} />;
   }

   return (
      <div className='p-3  bg-white border border-solid border-gray-300 rounded-xl dark:bg-gray-900 dark:border-neutral-600'>
         <div className='mb-1 flex justify-between items-center'>
            <div className='flex items-center gap-x-3'>
               <span className='size-10 flex justify-center items-center  border-gray-200 text-gray-500 rounded-lg dark:border-neutral-700 dark:text-neutral-500'>
                  {fileIcon}
               </span>
               <div>
                  <p className='text-sm font-medium text-gray-800 dark:text-white'>
                     <span className='truncate inline-block max-w-[300px] align-bottom'>{file.name}</span>
                  </p>
                  <p className='text-xs text-gray-500 dark:text-neutral-500'>{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
               </div>
            </div>
            <div className='flex items-center gap-x-2'>
               <button
                  type='button'
                  className='text-gray-500 hover:text-gray-800 focus:outline-none focus:text-gray-800 dark:text-neutral-500 dark:hover:text-neutral-200 dark:focus:text-neutral-200'
                  onClick={onRemove}
               >
                  <svg
                     className='shrink-0 size-4'
                     xmlns='http://www.w3.org/2000/svg'
                     width='24'
                     height='24'
                     viewBox='0 0 24 24'
                     fill='none'
                     stroke='currentColor'
                     strokeWidth='2'
                     strokeLinecap='round'
                     strokeLinejoin='round'
                  >
                     <path d='M3 6h18'></path>
                     <path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6'></path>
                     <path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2'></path>
                     <line x1='10' x2='10' y1='11' y2='17'></line>
                     <line x1='14' x2='14' y1='11' y2='17'></line>
                  </svg>
               </button>
            </div>
         </div>
         <div className='flex items-center gap-x-3 whitespace-nowrap'>
            <div
               className='flex w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700'
               role='progressbar'
               aria-valuenow={progress}
            >
               <div
                  className='flex flex-col justify-center rounded-full overflow-hidden bg-blue-600 text-xs text-white text-center whitespace-nowrap transition-all duration-500 hs-file-upload-complete:bg-green-500'
                  style={{ width: `${progress}%` }}
               ></div>
            </div>
            <div className='w-10 text-end'>
               <span className='text-sm text-gray-800 dark:text-white'>
                  <span>{progress}</span>%
               </span>
            </div>
         </div>
      </div>
   );
};

type Props = {
   onFileUpload: (file: File) => void;
};
const FileUploader: React.FC<Props> = ({ onFileUpload }) => {
   const [files, setFiles] = useState<File[]>([]);

   const onDrop = useCallback(
      (acceptedFiles: File[]) => {
         setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
         onFileUpload(acceptedFiles[0]);
      },
      [onFileUpload]
   );

   const onRemoveFile = useCallback((fileToRemove: File) => {
      setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToRemove));
   }, []);

   const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      accept: {
         'application/vnd.ms-excel': ['.xls', '.xlsx'],
         // image files
         'image/png': ['.png'],
         'image/jpeg': ['.jpeg', '.jpg'],
         'image/gif': ['.gif'],
         'image/bmp': ['.bmp'],
         'image/webp': ['.webp'],
         'application/zip': ['.zip'],
         'text/csv': ['.csv']
      }
   });

   return (
      <div>
         <div
            className='cursor-pointer p-12 flex justify-center bg-white border border-dashed border-gray-300 rounded-xl dark:bg-gray-900 dark:border-neutral-600'
            {...getRootProps()}
         >
            <input {...getInputProps()} />
            <div className='text-center'>
               <span className='inline-flex justify-center items-center size-16 bg-gray-100 text-gray-800 rounded-full dark:bg-gray-500 dark:text-neutral-200'>
                  <svg
                     className='shrink-0 size-6'
                     xmlns='http://www.w3.org/2000/svg'
                     width='24'
                     height='24'
                     viewBox='0 0 24 24'
                     fill='none'
                     stroke='currentColor'
                     strokeWidth='2'
                     strokeLinecap='round'
                     strokeLinejoin='round'
                  >
                     <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'></path>
                     <polyline points='17 8 12 3 7 8'></polyline>
                     <line x1='12' x2='12' y1='3' y2='15'></line>
                  </svg>
               </span>
               <div className='mt-4 flex flex-wrap justify-center text-sm leading-6 text-gray-600'>
                  <span className='pe-1 font-medium text-gray-800 dark:text-neutral-200'>قم بإسقاط ملفك هنا أو تصفح</span>
                  <span className='bg-white font-semibold text-blue-600 hover:text-blue-700 rounded-lg decoration-2 hover:underline focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 dark:bg-neutral-800 dark:text-blue-500 dark:hover:text-blue-600'>
                     تصفح
                  </span>
               </div>
               <p className='mt-1 text-xs text-gray-400 dark:text-neutral-400'>اختر ملفًا يصل حجمه إلى 2 ميجا بايت.</p>
            </div>
         </div>
         <div className='mt-4 space-y-2 empty:mt-0'>
            {files.map((file) => (
               <FilePreview key={file.name} file={file} onRemove={() => onRemoveFile(file)} />
            ))}
         </div>
      </div>
   );
};

export default FileUploader;
