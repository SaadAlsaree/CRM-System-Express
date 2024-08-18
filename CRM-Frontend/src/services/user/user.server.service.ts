import axios from '@/services/axios';
import { cookies } from 'next/headers';


axios.interceptors.request.use((config) => {
    // config.headers.set('Cookie', `ERM-Session=${cookies().get('ERM-Session')?.value}; ERM-Session.sig=${cookies().get('ERM-Session.sig')?.value}`);
    config.headers['Cookie'] = `ERM-Session=${cookies().get('ERM-Session')?.value}; ERM-Session.sig=${cookies().get('ERM-Session.sig')?.value}`
    return config;
}, (error) => {
    return Promise.reject(error);
});



class UserServerServices {

    // Get all Users
    public async getAllUsers(page: number = 1, userLogin?: string, organizationId?: string, departmentId?: string): Promise<any> {
        try {
            const response = await axios.get(`/users/all/${page}/query?userLogin=${userLogin}&organizationId=${organizationId}&departmentId=${departmentId}`);
            return response;
        } catch (error) {
            console.log(error);
            return null;
        }
    }


    // get current user
    public async getCurrentUser(): Promise<any> {
        try {
            const response = await axios.get(`/currentuser`);
            return response;
        } catch (error) {
            // console.log(error);
            return null;
        }
    }

    // Get User Profile
    public async getUserProfile(id: string): Promise<any> {
        try {
            const response = await axios.get(`/users/profile/${id}`);
            return response;
        } catch (error) {
            // console.log(error);
            return null;
        }
    }

    // get user by id
    public async getUserById(id: string): Promise<any> {
        try {
            const response = await axios.get(`/users/${id}`);
            return response;
        } catch (error) {
            // console.log(error);
            return null;
        }
    }
}


export const userServerService: UserServerServices = new UserServerServices();