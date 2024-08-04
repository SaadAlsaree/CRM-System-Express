import axios from '@/services/axios'

class OrgClientService {



    public async createOrgFromClient(organization: any): Promise<any> {
        try {
            const response = await axios.post('/organizations/new', organization, {
                withCredentials: true
            })
            return response;
        } catch (error) {
            return null;
        }
    }

    public async updateOrgFromClient(organization: any, id: string): Promise<any> {
        try {
            const response = await axios.put(`/organizations/${id}`, organization, {
                withCredentials: true
            })
            return response;
        } catch (error) {
            return null;
        }
    }

    public async createDepartment(department: any): Promise<any> {
        try {
            const response = await axios.post('/departments/new', department, {
                withCredentials: true
            })
            return response;
        } catch (error) {
            return null;
        }
    }

    public async updateDepartment(department: any, id: string): Promise<any> {
        try {
            const response = await axios.put(`/departments/${id}`, department, {
                withCredentials: true
            })
            return response;
        } catch (error) {
            return null;
        }
    }

    //get all departments in an organization
    public async getDepartmentsInOrg(id: string): Promise<any> {
        try {
            const response = await axios.get(`/departments/${id}`, {
                withCredentials: true
            })
            return response.data;
        } catch (error) {
            return null;
        }
    }
}

export const orgClientService: OrgClientService = new OrgClientService();