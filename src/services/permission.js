import axios from 'axios';
import authHeader from './auth-header';
const API_URL = process.env.VUE_APP_API_ENDPOINT;
class MenuPermissionService {

    GeAllMenuPermission() {
        return axios.get(API_URL + '/Menu/getAllMenuPermission', { headers: authHeader() });
    }
}
export default new MenuPermissionService();