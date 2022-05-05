import axios from "axios";
import authHeader from './auth-header';
const API_URL=process.env.VUE_APP_API_ENDPOINT;

class ResponseStatusService{
    GetAll(para,data){
        let config={
            headers: authHeader(),
            params:{
                draw:1,
                sortBy:para.sortBy,
                sortOrder:para.sortOrder,
                start:para.pageStart,
                length:para.pageStop,
                search:para.search,
                ministry_id:data.ministry_id,
                fromdate:data.fromdate,
                todate:data.todate,
            }
        }
        return axios.get(API_URL+'/responsestatus',config);
    }
    GetExcelData(data){
        let config={
            headers: authHeader(),
            params:{
                // draw:1,
                // sortBy:para.sortBy,
                // sortOrder:para.sortOrder,
                // start:para.pageStart,
                // length:para.pageStop,
                // search:para.search,
                ministry_id:data.ministry_id,
                fromdate:data.fromdate,
                todate:data.todate,
            },
            responseType: 'blob'
        }
        return axios.get(API_URL+'/responsestatus/ExcelExport',config);
    }
   
}

export default  new ResponseStatusService();