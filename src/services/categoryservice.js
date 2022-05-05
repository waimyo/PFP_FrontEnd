import axios from "axios";
import authHeader from './auth-header';
const API_URL=process.env.VUE_APP_API_ENDPOINT;

class CategoryService{
    GetAll(para){        
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
        return axios.get(API_URL+'/Categories',config);
    }

    InsertData(cat){
        return axios.post(API_URL+'/categories',{            
            id:cat.id,
            name:cat.name,           
        },{headers: authHeader()});
    
    }

    DeleteData(cate){
        return axios.delete(API_URL+'/categories/'+cate.id,{headers: authHeader()});
    }

    GetById(id){
        return axios.get(API_URL+'/categories/GetById?id='+id,{headers: authHeader()});
    }
}

export default  new CategoryService();