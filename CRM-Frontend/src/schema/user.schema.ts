import { z } from "zod";



export const loginSchema = z.object({
    userLogin: z.string().min(3, 'هذا الحقل أجباري !'),
    password: z.string().min(6, 'كلمة المرور يجب ان لاتقل عن 6 أحرف !').max(255),
});

