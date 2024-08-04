import axios from '@/services/axios';
import { cookies } from 'next/headers';


axios.interceptors.request.use((config) => {
    // config.headers.set('Cookie', `ERM-Session=${cookies().get('ERM-Session')?.value}; ERM-Session.sig=${cookies().get('ERM-Session.sig')?.value}`);
    config.headers['Cookie'] = `ERM-Session=${cookies().get('ERM-Session')?.value}; ERM-Session.sig=${cookies().get('ERM-Session.sig')?.value}`
    return config;
}, (error) => {
    return Promise.reject(error);
});

class RoleServerServices {

    //Get all roles
    public async getRoles(): Promise<any> {
        try {
            const response = await axios.get('/auth/roles', {
                withCredentials: true
            })
            return response.data;
        } catch (error) {
            return null;
        }
    }

    //Get role by id
    public async getRoleById(id: string): Promise<any> {
        try {
            const response = await axios.get(`/auth/roles/${id}`, {
                withCredentials: true
            })
            return response.data;
        } catch (error) {
            return null;
        }
    }
}


export const roleServerService: RoleServerServices = new RoleServerServices();