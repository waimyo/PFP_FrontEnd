
import axios from "axios";
import authHeader from './auth-header';
const API_URL=process.env.VUE_APP_API_ENDPOINT;
class ServicesService{
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
                ministry_id:data.ministry_id
                             
            }
          
        }  
        return axios.get(API_URL+'/Service',config);
          
    }

    InsertData(serve){
        return axios.post(API_URL+'/service',{            
            id:serve.id,
            name:serve.name, 
            ministry_id:serve.ministry_id,                        
            deptid:serve.dept_id,          
        },{headers: authHeader()});
    
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
                ministry_id:data.ministry_id,
            },
            responseType: "blob",
        }
      
        return axios.get(API_URL+'/service/ExcelExport',config);
    }
    GetExcelDataForDownload() {
        let config={
            headers: authHeader(),
            params:{
                draw:1,
                sortBy:"id",
                sortOrder:"desc",
                start:1,
                length:-1,
            },
            responseType: "blob",
        }
      
        return axios.get(API_URL+'/service/ExcelExport',config);
    }
    DeleteData(cate){
        return axios.delete(API_URL+'/service/'+cate.id,{headers: authHeader()});
    }

    GetById(id){
        return axios.get(API_URL+'/service/GetById?id='+id,{headers: authHeader()});
    }
}


export default  new ServicesService();
