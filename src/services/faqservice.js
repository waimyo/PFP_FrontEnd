import axios from "axios";
import authHeader from "./auth-header";
const API_URL =process.env.VUE_APP_API_ENDPOINT + '/FAQ';

class FAQService{
    GetAll(para){
        let config = {
            headers: authHeader(),
            params: {
                draw: 1,
                sortBy: para.sortBy,
                sortOrder: para.sortOrder,
                start: para.pageStart,
                length: para.pageStop,
                search: para.search,  
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
            question: data.question,
            answer:data.answer,
        }, { headers: authHeader() });
    }

    DeleteData(id) {
        return axios.delete(API_URL + "/" + id, { headers: authHeader() });
    }

    GetById(id) {
        return axios.get(API_URL + '/GetById?id=' + id, { headers: authHeader() });
    }

}
export default new FAQService();