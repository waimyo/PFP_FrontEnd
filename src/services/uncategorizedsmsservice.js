
import axios from "axios";
import authHeader from './auth-header';
const API_URL=process.env.VUE_APP_API_ENDPOINT;

class UncategorizedSMSService{
        GetAll(para){                 
        let config={          
            headers: authHeader(),
            params:{
                draw:1,
                sortBy:para.sortBy,
                sortOrder:para.sortOrder,
                start:para.pageStart,
                length:para.pageStop,
                search:para.search,  
                fromdate:para.fromdate,
                todate:para.todate,               
            }
          
        }  
        return axios.get(API_URL+'/Sms',config);
          
    } 
    GetAllForCategorized(para){             
        let config={          
            headers: authHeader(),
            params:{
                draw: 1,
                sortBy: para.sortBy,
                sortOrder: para.sortOrder,
                start: para.pageStart,
                length: para.pageStop,
                search:para.search,    
                fromdate:para.fromdate,
                todate:para.todate,            
            }
          
        }  
        return axios.get(API_URL+'/Sms/GetAllForCategorized',config);
          
    } 
    
    Insert(sms,selectrows){
        return axios.post(API_URL+'/Sms',{            
           // id:sms.id,   
           category_id:sms,
            selectrows:selectrows,
           // phono:sms.phono,    
           // smsid:smsselectedid,          
            
        },{headers: authHeader()});
    
    }
    ResetCategory(sms){
        return axios.post(API_URL+'/Sms',{            
            id:sms.id,   
            category_id:0,  
            campaign_id:sms.campaign_id,
            phono:sms.phono,                  
            
        },{headers: authHeader()});
   
    }
    

}
export default  new UncategorizedSMSService();
