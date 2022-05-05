import axios from "axios";
import authHeader from '../auth-header';

const API_URL = process.env.VUE_APP_API_ENDPOINT;

class HomeService {
    
 MonthlyPhNoCount(fromdate,todate,ministry_id,user_id) {
   
        return axios.get(API_URL+'/monthlyphnocount/GetMonthlyPhNoCount?fromdate='+fromdate+'&todate='+todate+'&ministry_id='+ministry_id+'&user_id='+user_id,
        {headers:authHeader()});
      }

      GetSmsByOperator(fromdate,todate,ministry_acc_id,userid) {
   
        return axios.get(API_URL+'/smscountbyoperator/GetSmsCount?fromdate='+fromdate+'&todate='+todate+'&ministry_acc_id='+ministry_acc_id+'&user_id='+userid,
        {headers:authHeader()});
      }
       GetMonthlyCampainCounts(fromdate,todate,ministry_id,user_id){   
        return axios.get(API_URL+'/Home/MonthlyCampaignCounts?fromdate='+fromdate+'&todate='+todate+'&ministry_id='+ministry_id+'&user_id='+user_id,{headers:authHeader()})
      
    }
    GetAllForTotalCampaign(fromdate,todate,ministry_id,user_id){

        return axios.get(API_URL+'/Home/GetAllForTotalCampaignCounts?fromdate='+fromdate+'&todate='+todate+'&ministry_id='+ministry_id+'&user_id='+user_id,{headers:authHeader()})
      
    }
    GetAllForSentAndReceivedSms(fromdate,todate,ministry_id,user_id){

        return axios.get(API_URL+'/Home/NumberOfPeopleSentAndReceivedSMS?fromdate='+fromdate+'&todate='+todate+'&ministry_id='+ministry_id+'&user_id='+user_id,{headers:authHeader()})
      
    }
    GetAllForCorruptionSms(fromdate,todate,ministry_id,user_id){
        return axios.get(API_URL+'/Home/TotalCorruptionCounts?fromdate='+fromdate+'&todate='+todate+'&ministry_id='+ministry_id+'&user_id='+user_id,{headers:authHeader()})
      
    }
    GetAllForSentAndReceivedCount(fromdate,todate,ministry_id,user_id){
        return axios.get(API_URL+'/Home/MonthlyNumberOfPeopleSentAndReceivedSMSCount?fromdate='+fromdate+'&todate='+todate+'&ministry_id='+ministry_id+'&user_id='+user_id,{headers:authHeader()})
        
    }
    GetAllForMonthlyCorruptionReceived(fromdate,todate,ministry_id,user_id){
        return axios.get(API_URL+'/Home/MonthlyCorruptionReceivedCounts?fromdate='+fromdate+'&todate='+todate+'&ministry_id='+ministry_id+'&user_id='+user_id,{headers:authHeader()})
    }
      
    
      GetExcelData(fromdate,todate,ministry_acc_id,userid) {
   
        return axios.get(API_URL+'/smscountbyoperator/ExcelExport?fromdate='+fromdate+'&todate='+todate+'&ministry_id='+ministry_acc_id+'&user_id='+userid,
        {headers:authHeader(),responseType: 'blob'});
      }
      
}

export default new HomeService();
