import axios from "axios";
import authHeader from './auth-header';
const API_URL = process.env.VUE_APP_API_ENDPOINT + '/ServiceView';

class ServiceViewService {
    GetAll(para) {
        let config = {
            headers: authHeader(),
            params: {
                draw: 1,
                sortBy: para.sortBy,
                sortOrder: para.sortOrder,
                start: para.pageStart,
                length: para.pageStop,
                search: para.search
            }
        }
        return axios.get(API_URL, config);
    }

    GetAllService(para) {
        let config = {
            headers: authHeader(),
            params: {
                draw: 1,
                sortBy: para.sortBy,
                sortOrder: para.sortOrder,
                start: para.pageStart,
                length: para.pageStop,
                //search: para.search
            }
        }
        return axios.get(API_URL + '/GetAllService', config);
    }

}

export default new ServiceViewService();