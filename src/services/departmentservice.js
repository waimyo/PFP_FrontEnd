import axios from "axios";
import authHeader from './auth-header';
const API_URL = process.env.VUE_APP_API_ENDPOINT + '/Department';

class DepartmentService {
    GetAll(para,data) {
        let config = {
            headers: authHeader(),
            params: {
                draw: 1,
                sortBy: para.sortBy,
                sortOrder: para.sortOrder,
                start: para.pageStart,
                length: para.pageStop,
                search: para.search,
                ministry_id:data.ministry_id
            }
        }
        return axios.get(API_URL, config);
    }
    GetExcelData(para,data){
        let config={
            headers: authHeader(),
            params:{
                draw:1,
                sortBy:para.sortBy,
                sortOrder:para.sortOrder,
                start:para.pageStart,
                length:-1,
                search:para.search,
                ministry_id:data.ministry_id
            },
            responseType: "blob",
        }
        return axios.get(API_URL+'/ExcelExport',config);
    }


    InsertData(dept) {
        return axios.post(API_URL, {
            id: dept.id,
            name: dept.name,
            ministry_id: dept.ministry_Id
        }, { headers: authHeader() });
    }

    DeleteData(dept) {
        //alert("hay delete")
        return axios.delete(API_URL + "/" + dept.id, { headers: authHeader() });
    }

    GetById(id) {
        return axios.get(API_URL + '/GetById?id=' + id, { headers: authHeader() });
    }

    GetMinistry() {
        return axios.get(API_URL + '/GetMinistry', { headers: authHeader() });
    }
}

export default new DepartmentService();