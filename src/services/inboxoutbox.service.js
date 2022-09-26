import axios from "axios";
import authHeader from "../services/auth-header";
const API_URL = process.env.VUE_APP_API_ENDPOINT;

export default new (class InboxOutboxService {
    OutboundList(para, fromdate, todate) {
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
        return axios.get(API_URL + "/Chatting/OutboundList", config);
    }

    InboundList(para, fromdate, todate) {
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
        return axios.get(API_URL + "/Chatting/InboundList", config);
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
        console.log(entity)
        return axios.post(
            API_URL + '/Chatting', {
            id: entity.id,
            receiverarr: entity.receiver,
            description: entity.description,
            ismain: entity.ismaindescription,
            mainchatting_id: entity.mainchat_id,
        }, {
            headers: authHeader(),
        }
        );
    }

    InsertAttachFile(file, chatid) {
        let config = {
            headers: authHeader(),
            params: {
                chatid: chatid
            }
        }
        return axios.post(API_URL + '/Chatting/', file, config);
    }

    TestFileinsert(file) {
        return axios.post(API_URL + '/Chatting/SaveFiles', { file: file }, { headers: authHeader() });
    }

    UpdateStatus(chatid) {
        return axios.post(API_URL + '/Chatting/UpdateStatus', { chatid: chatid }, { headers: authHeader() });
    }
    GetCountUnread() {
        return axios.get(API_URL + '/Chatting/GetCountUnread', { headers: authHeader() });
    }
})();