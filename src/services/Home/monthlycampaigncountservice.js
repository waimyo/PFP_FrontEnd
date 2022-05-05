
import axios from "axios";
//import authHeader from './auth-header';
const API_URL=process.env.VUE_APP_API_ENDPOINT;

class MonthlyCampaignCountService{
    GetMonthlyCampainCounts(fromdate,todate){                 
        let config={          
           // headers: authHeader(),
            params:{
                draw:1,
                fromdate:fromdate.fromdate,
                todate:todate.todate

            }
          
        }  
        return axios.get(API_URL+'/MonthlyCampaignCount',config);
          
    }
    GetAllForTotalCampaign(fromdate,todate){
        let config={
            params:{
                fromdate:fromdate,
                todate:todate,
            }
        }
        return axios.get(API_URL+'/MonthlyCampaignCount/GetAllForTotalCampaignCounts',config);
    }
    GetAllForSentSms(fromdate,todate){
        let config={
            params:{
                fromdate:fromdate,
                todate:todate,
            }
        }
        return axios.get(API_URL+'/MonthlyCampaignCount/NumberOfPeopleSentSMS',config);
    }
    GetAllForReceivedSms(fromdate,todate){
        let config={
            params:{
                fromdate:fromdate,
                todate:todate,
            }
        }
        return axios.get(API_URL+'/MonthlyCampaignCount/NumberOfPeopleReceivedSMS',config);
    }
} 
export default  new MonthlyCampaignCountService();
