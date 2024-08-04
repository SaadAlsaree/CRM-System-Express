import { z } from "zod";


const optionSchema = z.object({
    label: z.string(),
    value: z.string(),
    disable: z.boolean().optional(),
});


export const loginSchema = z.object({
    userLogin: z.string().min(3, 'هذا الحقل أجباري !'),
    password: z.string().min(6, 'كلمة المرور يجب ان لاتقل عن 6 أحرف !').max(255),
});


export const addEmployeeSchema = z.object({
    userLogin: z.string().min(3, 'هذا الحقل أجباري !'),
    password: z.string().min(6, 'كلمة المرور يجب ان لاتقل عن 6 أحرف !').max(255),
    avatarColor: z.string().optional(),
    username: z.string().min(3, 'هذا الحقل أجباري !').max(255),
    role: z.array(optionSchema).min(1, 'يجب تحديد صلاحيات المستخدم  !'),
    rank: z.string().min(3, 'هذا الحقل أجباري !').max(255),
    organizationId: z.string().min(3, 'هذا الحقل أجباري !').max(255),
    departmentId: z.string().optional(),
});


export const updateUserInfoSchema = z.object({
    displayName: z.string().min(3, 'هذا الحقل أجباري !').max(255),
    email: z.string().email('البريد الألكتروني غير صحيح !'),
    phone: z.string().min(7, 'هذا الحقل أجباري !').max(255),
    work: z.string().min(3, 'هذا الحقل أجباري !').max(255),
    address: z.string().min(3, 'هذا الحقل أجباري !').max(255),
});


export const updatePasswordSchema = z.object({
    currentPassword: z.string()
        .min(6, 'Current password must be at least 8 characters long')
        .max(50, 'Current password cannot be more than 50 characters long'),
    newPassword: z.string()
        .min(6, 'New password must be at least 8 characters long')
        .max(50, 'New password cannot be more than 50 characters long'),
    //   .regex(/[a-z]/, 'New password must contain at least one lowercase letter')
    //   .regex(/[A-Z]/, 'New password must contain at least one uppercase letter')
    //   .regex(/\d/, 'New password must contain at least one digit')
    //   .regex(/[@$!%*?&#]/, 'New password must contain at least one special character'),
    confirmPassword: z.string()
        .min(6, 'Confirm password must be at least 8 characters long')
        .max(50, 'Confirm password cannot be more than 50 characters long'),
}).refine(data => data.newPassword === data.confirmPassword, {
    message: 'New password and confirm password must match',
    path: ['confirmPassword'], // Specify which field should be highlighted if validation fails
});



export const updateAvatarSchema = z.object({
    avatarColor: z.string().optional(),
    avatar: z.string().optional(),
});

export const updateUserStingsSchema = z.object({
    cases: z.boolean().optional(),
    tasks: z.boolean().optional(),
    tickets: z.boolean().optional(),
    messages: z.boolean().optional(),
    follows: z.boolean().optional(),
    comments: z.boolean().optional()
});

