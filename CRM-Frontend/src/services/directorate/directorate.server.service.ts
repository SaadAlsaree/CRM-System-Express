import axios from '@/services/axios';
import { cookies } from 'next/headers';


axios.interceptors.request.use((config) => {
    // config.headers.set('Cookie', `ERM-Session=${cookies().get('ERM-Session')?.value}; ERM-Session.sig=${cookies().get('ERM-Session.sig')?.value}`);
    config.headers['Cookie'] = `ERM-Session=${cookies().get('ERM-Session')?.value}; ERM-Session.sig=${cookies().get('ERM-Session.sig')?.value}`
    return config;
}, (error) => {
    return Promise.reject(error);
});



class DirectorateService {

    // Get all directorates with pagination
    public async getDirectorates(page: number = 1): Promise<any> {
        try {
            const response = await axios.get(`/all/directorates/${page}`, {
                withCredentials: true
            })
            return response.data;
        } catch (error) {
            return null;
        }
    }

    // Get directorate by Id
    public async getDirectorateById(id: string, page: number): Promise<any> {
        try {
            const response = await axios.get(`/directorate/${id}/${page}`, {
                withCredentials: true
            })
            return response.data;
        } catch (error) {
            return null;
        }
    }
}


export const directorateService: DirectorateService = new DirectorateService();