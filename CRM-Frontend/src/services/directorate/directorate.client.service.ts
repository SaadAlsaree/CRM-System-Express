import axios from '@/services/axios';


class DirectorateClientService {
    // create directorate
    public async createDirectorate(data: any): Promise<any> {
        try {
            const response = await axios.post('/directorate/new', data, {
                withCredentials: true
            })
            return response;
        } catch (error) {
            return null;
        }
    }

    // update directorate
    public async updateDirectorate(data: any, id: string): Promise<any> {
        try {
            const response = await axios.put(`/directorate/update/${id}`, data, {
                withCredentials: true
            })
            return response;
        } catch (error) {
            return null;
        }
    }
}



export const directorateClientService: DirectorateClientService = new DirectorateClientService(); 