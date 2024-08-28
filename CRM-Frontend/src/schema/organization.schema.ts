import { z } from "zod";


export const addOrganizationSchema = z.object({
    name: z.string().min(3, 'هذا الحقل أجباري !'),
    code: z.string().min(3, 'هذا الحقل أجباري !'),
    phone: z.string().optional(),
    address: z.string().optional(),
    email: z.string().optional(),
    website: z.string().optional(),
    description: z.string().optional(),
    avatar: z.string().optional(),
});

export const addDirectorateSchema = z.object({
    name: z.string().min(3, 'هذا الحقل أجباري !'),
    code: z.string().min(3, 'هذا الحقل أجباري !'),
    organizationId: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    email: z.string().optional(),
    website: z.string().optional(),
    description: z.string().optional(),
    avatar: z.string().optional(),
});



export const addDepartmentSchema = z.object({
    name: z.string().min(3, 'هذا الحقل أجباري !'),
    // slug: z.string().min(3, 'هذا الحقل أجباري !'),
    code: z.string().min(2, 'هذا الحقل أجباري !'),
    email: z.string().min(3, 'هذا الحقل أجباري !'),
    phone: z.string().min(3, 'هذا الحقل أجباري !'),
    description: z.string().min(3, 'هذا الحقل أجباري !'),
    organization: z.string().optional(),
});

export const addDepartmentInDirectorateSchema = z.object({
    name: z.string().min(3, 'هذا الحقل أجباري !'),
    code: z.string().min(3, 'هذا الحقل أجباري !'),
    email: z.string().optional(),
    phone: z.string().optional(),
    description: z.string().optional(),
    directorateId: z.string().optional(),
});