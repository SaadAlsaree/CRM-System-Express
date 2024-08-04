import axios from '@/services/axios';

class UserClientService {
    // create user
    public async createUser(data: any): Promise<any> {
        try {
            const response = await axios.post('/auth/new', data, {
                withCredentials: true
            })
            return response;
        } catch (error) {
            return null;
        }
    }

    //update user activation status
    public async updateUserActivationStatus(userId: string, isActivated: boolean): Promise<any> {
        try {
            const response = await axios.put(`/users/update/active/${userId}`, { isActivated }, {
                withCredentials: true
            })
            return response;
        } catch (error) {
            return null;
        }
    }
}


export const userClientService: UserClientService = new UserClientService();