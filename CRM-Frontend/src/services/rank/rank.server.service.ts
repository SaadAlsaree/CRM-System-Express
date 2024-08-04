import axios from '@/services/axios';
import { cookies } from 'next/headers';


axios.interceptors.request.use((config) => {
    // config.headers.set('Cookie', `ERM-Session=${cookies().get('ERM-Session')?.value}; ERM-Session.sig=${cookies().get('ERM-Session.sig')?.value}`);
    config.headers['Cookie'] = `ERM-Session=${cookies().get('ERM-Session')?.value}; ERM-Session.sig=${cookies().get('ERM-Session.sig')?.value}`
    return config;
}, (error) => {
    return Promise.reject(error);
});



class RankServerService {
    // Get all ranks

    public async getRanks(): Promise<any> {
        try {
            const response = await axios.get('/auth/ranks', {
                withCredentials: true
            })
            return response.data;
        } catch (error) {
            return null;
        }
    }

    // Get rank by id
    public async getRankById(id: string): Promise<any> {
        try {
            const response = await axios.get(`/auth/ranks/${id}`, {
                withCredentials: true
            })
            return response.data;
        } catch (error) {
            return null;
        }
    }
}


export const rankServerService: RankServerService = new RankServerService();