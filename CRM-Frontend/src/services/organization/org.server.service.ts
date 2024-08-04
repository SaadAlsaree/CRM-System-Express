import axios from '@/services/axios';
import { cookies } from 'next/headers';


axios.interceptors.request.use((config) => {
    // config.headers.set('Cookie', `ERM-Session=${cookies().get('ERM-Session')?.value}; ERM-Session.sig=${cookies().get('ERM-Session.sig')?.value}`);
    config.headers['Cookie'] = `ERM-Session=${cookies().get('ERM-Session')?.value}; ERM-Session.sig=${cookies().get('ERM-Session.sig')?.value}`
    return config;
}, (error) => {
    return Promise.reject(error);
});


class OrgService {

    public async getOrgs(): Promise<any> {
        try {
            const response = await axios.get('/organizations', {
                withCredentials: true
            })
            return response.data;
        } catch (error) {
            return null;
        }
    }


    public async createOrg(data: any): Promise<any> {
        try {
            const response = await axios.post('/organizations/new', { data }, {
                withCredentials: true
            })
            return response;
        } catch (error) {
            return null;
        }
    }

    public async getOrgById(id: string): Promise<any> {
        try {
            const response = await axios.get(`/organizations/${id}`, {
                withCredentials: true
            })
            return response;
        } catch (error) {
            return null;
        }
    }

    public async getDepartmentById(id: string): Promise<any> {
        try {
            const response = await axios.get(`/department/${id}`, {
                withCredentials: true
            })
            return response;
        } catch (error) {
            return null;
        }
    }

    public async getUserCountInOrganization(id: string): Promise<any> {
        try {
            const response = await axios.get(`/organizations/user-count/${id}`, {
                withCredentials: true
            })
            return response.data?.Total;
        } catch (error) {
            return null;
        }
    }

    public async getUserCountInDepartment(id: string): Promise<any> {
        try {
            const response = await axios.get(`/departments/user-count/${id}`, {
                withCredentials: true
            })
            return response.data?.Total;
        } catch (error) {
            return null;
        }
    }
}

export const orgService: OrgService = new OrgService();