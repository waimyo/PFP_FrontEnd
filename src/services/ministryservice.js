import axios from "axios";
import authHeader from './auth-header';
const API_URL=process.env.VUE_APP_API_ENDPOINT;

class MinistryService{
    GetAll(para){
        //alert(API_URL+'/Ministry')
        let config={
            headers: authHeader(),
            params:{
                draw:1,
                sortBy:para.sortBy,
                sortOrder:para.sortOrder,
                start:para.pageStart,
                length:para.pageStop,
                search:para.search
            }
        }
        return axios.get(API_URL+'/Ministry',config);
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
                search:para.search
            },
            responseType: "blob",
        }
        return axios.get(API_URL+'/Ministry/ExcelExport',config);
    }

    InsertData(entity){
        let formData=new FormData();
      formData.append("id",entity.id)
      formData.append("name",entity.name);
      formData.append("logo",entity.logo);
      return axios.post(API_URL + '/Ministry/',formData,{headers: authHeader()});
        // return axios.post(API_URL+'/Ministry',{
        //     id:entity.id,
        //     name:entity.name
        // },{headers: authHeader()});
    }

    DeleteData(entity){
        return axios.delete(API_URL+'/Ministry/'+entity.id,{headers:authHeader()});
    }

    GetById(id){
        return axios.get(API_URL+'/Ministry/GetById?id='+id,{headers:authHeader()});
    }
}

export default  new MinistryService();