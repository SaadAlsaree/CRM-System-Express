'use client';
//Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const EmployeeForm = () => {
   return (
      <Card>
         <CardHeader>
            <CardTitle className='text-primary'>الموظفين</CardTitle>
            <CardDescription>اضافة مظف جديد .</CardDescription>
         </CardHeader>
         <CardContent>
            <form>
               <Input placeholder='Store Name' />
            </form>
         </CardContent>
         <CardFooter className='border-t px-6 py-4'>
            <Button>Save</Button>
         </CardFooter>
      </Card>
   );
};

export default EmployeeForm;
