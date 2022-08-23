import axios from "axios";
import authHeader from "./auth-header";
const API_URL =process.env.VUE_APP_API_ENDPOINT + '/Announcement';

class AnnouncementService{
    GetAll(para,searchby){
        let config = {
            headers: authHeader(),
            params: {
                draw: 1,
                sortBy: para.sortBy,
                sortOrder: para.sortOrder,
                start: para.pageStart,
                length: para.pageStop,
                search: para.search,
                fromdate:searchby.fromdate,
                todate:searchby.todate,  
            }
        }
        return axios.get(API_URL, config);
    }

    GetExcelData(para){
        let config={
            headers: authHeader(),
            params:{
                draw:1,
                sortBy:para.sortBy,
                sortOrder:para.sortOrder,
                start:para.pageStart,
                length:-1,
                search:para.search,
            },
            responseType: "blob",
        }
        return axios.get(API_URL+'/ExcelExport',config);
    }


    InsertData(data) {
        return axios.post(API_URL, {
            id: data.id,
            description: data.description,
        }, { headers: authHeader() });
    }

    DeleteData(id) {
        return axios.delete(API_URL + "/" + id, { headers: authHeader() });
    }

    GetById(id) {
        return axios.get(API_URL + '/GetById?id=' + id, { headers: authHeader() });
    }

    GetAnnouncements() {
        return axios.get(API_URL + '/GetAllAnnouncementForViewer', { headers: authHeader() });
    }

    ChangeStatus(data){
        return axios.post(API_URL + '/ChangeStatus', {
            id: data.id,
            status: data.status,
        }, { headers: authHeader() });
    }

}
export default new AnnouncementService();