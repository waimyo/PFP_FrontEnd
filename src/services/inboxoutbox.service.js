import axios from "axios";
import authHeader from "../services/auth-header";
const API_URL = process.env.VUE_APP_API_ENDPOINT;

export default new(class InboxOutboxService {
    GetAll(para, fromdate, todate) {
        let config = {
            headers: authHeader(),
            params: {
                draw: 1,
                sortBy: para.sortBy,
                sortOrder: para.sortOrder,
                start: para.pageStart,
                length: para.pageStop,
                search: para.search,
                fromdate: fromdate,
                todate: todate
            },
        };
        return axios.get(API_URL + "/Chatting", config);
    }

    GetDetailData(chat_id) {
        let config = {
            headers: authHeader(),
            params: {
                chat_id: chat_id,
            },
        };
        return axios.get(API_URL + "/Chatting/GetDetail", config);
    }

    InsertData(entity) {
        
            // let formData=new FormData();
            // //formData.append("id",entity.id);
            // formData.append("receiver",entity.receiver);
            // formData.append("description",entity.description);
            // formData.append("ismain",entity.ismaindescription);
            // //formData.append("attachfile",entity.file);
            // formData.append("mainchatting_id",entity.mainchat_id);
            // return axios.post(API_URL + '/Chatting',formData,{headers: authHeader()});
        return axios.post(
            API_URL + '/Chatting', {
                id: entity.id,
                receiverarr: entity.receiver,
                description: entity.description,
                ismain: entity.ismaindescription,
                mainchatting_id: entity.mainchat_id,
                //uploadfiles:files,
            }, {
                headers: authHeader(),
            }
        );
    }

    InsertAttachFile(file, chatid) {
        // alert("insert attach file");
        // let formData = new FormData();
        // formData.append("mainchatting_id", chatid)
        // formData.append("attachfile", file);
        let config={
            headers: authHeader(),
            params:{
                chatid:chatid
            }
        }            
        return axios.post(API_URL + '/Chatting/', file, config);
    }

    TestFileinsert(file){
        return axios.post(API_URL+'/Chatting/SaveFiles',{file:file},{headers:authHeader()});
    }
})();