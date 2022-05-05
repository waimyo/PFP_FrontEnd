import axios from "axios";
import authHeader from './auth-header';
const API_URL = process.env.VUE_APP_API_ENDPOINT + '/AccessLog';

class AccessLogService {
    GetAll(para, fd, td) {
        let config = {
            headers: authHeader(),
            params: {
                draw: 1,
                sortBy: para.sortBy,
                sortOrder: para.sortOrder,
                start: para.pageStart,
                length: para.pageStop,
                search: para.search,
                fromdate: fd,
                todate: td
            }
        }
        return axios.get(API_URL, config);
    }

}

export default new AccessLogService();