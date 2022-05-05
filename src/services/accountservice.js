import axios from "axios";
import authHeader from './auth-header';
const API_URL = process.env.VUE_APP_API_ENDPOINT;

class AccountService {
    GetAll(para,data) {
        let config = {
            headers: authHeader(),
            params: {
                draw: 1,
                sortBy: para.sortBy,
                sortOrder: para.sortOrder,
                start: para.pageStart,
                length: para.pageStop,
                search: data.search,
                role_id: data.role_id,
                ministry_id:data.ministry_id,
                fromdate:data.fromdate,
                todate:data.todate,
            }
        }
        return axios.get(API_URL + '/User', config);
    }

    InsertData(entity) {
        return axios.post(API_URL + '/User', {
            id: entity.id,
            name: entity.name,
            username: entity.username,
            password: entity.password,
            email: entity.email,
            role_id: entity.role_id,
            ministry_id: entity.ministry_id,
            parent_id: entity.parent_id,
            location_state: entity.location_state,
            location_district: entity.location_district,
            location_township: entity.location_township,
        }, { headers: authHeader() });
    }

    DeleteData(auth) {
        return axios.delete(API_URL + '/User/' + auth.id, { headers: authHeader() });
    }

    GetById(id) {
        return axios.get(API_URL + '/User/GetById?userid=' + id, { headers: authHeader() });
    }

    ChangePassword(entity) {
        return axios.post(API_URL + '/User/resetpassword', {
            id: entity.id,
            password: entity.current_password,
            new_password: entity.new_password,
        }, { headers: authHeader() });
    }

    SuspendUserAccount(entity) {
        return axios.post(API_URL + '/User/suspendpassword', {
            id: entity.id,
            status: entity.status,
        }, { headers: authHeader() });
    }
}

export default new AccountService();