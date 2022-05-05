import axios from "axios";
import authHeader from './auth-header';

const API_URL = process.env.VUE_APP_API_ENDPOINT;

class CategorizationService {
    // GetAll(ministry_id,fromdate,todate) {
   
    //     return axios.get(API_URL+'/categorizationstatus/GetCategorization?ministry_id='+ministry_id
    //     +'&fromdate='+fromdate+'&todate='+todate,
    //     {headers:authHeader()});
    //   }

      // GetExcelData(ministry_id,fromdate,todate){
      //   return axios.get(API_URL + '/categorizationstatus/ExcelExport?ministry_id='+ministry_id+'&fromdate=' + fromdate + '&todate=' + todate,
      //   {headers:authHeader(), responseType: 'blob'});
      // } 
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
      return axios.get(API_URL+'/categorizationstatus',config);
  }
  GetExcelData(data){
      let config={
          headers: authHeader(),
          params:{
            //   draw:1,
            //   sortBy:para.sortBy,
            //   sortOrder:para.sortOrder,
            //   start:para.pageStart,
            //   length:para.pageStop,
            //   search:para.search,
              ministry_id:data.ministry_id,
              fromdate:data.fromdate,
              todate:data.todate,
          },
          responseType: 'blob'
      }
      return axios.get(API_URL+'/categorizationstatus/ExcelExport',config);
  }

}

export default new CategorizationService();