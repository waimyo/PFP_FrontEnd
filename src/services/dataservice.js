import axios from "axios";
import authHeader from './auth-header';
const API_URL=process.env.VUE_APP_API_ENDPOINT;

class DataService{
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
                user_id:data.user_id,
                gender:data.gender,
                fromdate:data.fromdate,
                todate:data.todate,
                name:data.name,
                service:data.service,
            }
        }
        return axios.get(API_URL+'/Data',config);
    }

    GetExcelData(data){
        let config={
            headers: authHeader(),
            params:{
                ministry_id:data.ministry_id,
                user_id:data.user_id,
                gender:data.gender,
                fromdate:data.fromdate,
                todate:data.todate,
                name:data.name,
            },
            responseType: "blob",
        }
        return axios.get(API_URL+'/Data/DataInfoExcelExport',config);
    }

    InsertData(entity){
        return axios.post(API_URL+'/Data',{
            id:entity.id,
            name:entity.name,
            mobile:entity.mobile,
            gender:entity.gender,
            service_id:entity.service_id,
            department_id:entity.department_id,
            ministry_id:entity.ministry_id,
            date_of_application:entity.date_of_application,
            date_of_completion:entity.date_of_completion,
            location_state:entity.location_state,
            location_district:entity.location_district,
            location_township:entity.location_township,  
        },{headers: authHeader()});
    }

    UploadFile(entity){
        let formData=new FormData()
        formData.append("ministry_id",entity.ministry_id);
        formData.append("department_id",entity.department_id);
        formData.append("uploadfile",entity.uploaded_file);
        return axios.post(API_URL+'/DataUploadExcel',formData,{headers: authHeader()});
    }

    DeleteData(auth){
        return axios.delete(API_URL+'/Data/'+auth.id,{headers: authHeader()});
    }

    GetById(id){
        return axios.get(API_URL+'/Data/GetById?id='+id,{headers: authHeader()});
    }
}

export default  new DataService();