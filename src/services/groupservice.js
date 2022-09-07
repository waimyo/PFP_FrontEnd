import axios from "axios";
import authHeader from './auth-header';
const API_URL = process.env.VUE_APP_API_ENDPOINT + '/Group';
const API_URL1 = process.env.VUE_APP_API_ENDPOINT + '/GroupEntry';

class GroupService {

    GetAll(para) {
        let config = {
            headers: authHeader(),
            params: {
                draw: 1,
                sortBy: para.sortBy,
                sortOrder: para.sortOrder,
                start: para.pageStart,
                length: para.pageStop,
                //search: para.search
                name: para.search.name,
                department_id: para.search.department_id,
                service_id: para.search.service_id,
                fromdate: para.search.fromdate,
                todate: para.search.todate,
                uploadedby: para.search.uploadedby,
            }
        }

        return axios.get(API_URL1, config);
    }

    InsertData(gp) {
        return axios.post(API_URL1, {
            name: gp.name,
            //GList: itemlist,
            department: gp.department,
            department_id: gp.department_id,
            service: gp.service,
            service_id: gp.service_id,
            fromdate: gp.fromdate,
            todate: gp.todate,
            uploadedby: gp.uploadedby,
            uploadedbyname: gp.uploadedbyname
        }, { headers: authHeader() });

        //},{headers: authHeader()});
    }

    DeleteData(selectrows) {
        return axios.post(API_URL + '/DeleteSelectedRow', {
            selectrows: selectrows
        }, { headers: authHeader() });
    }

    // DeleteData(dept) {
    //     return axios.delete(API_URL + "/" + dept.id, { headers: authHeader() });
    // }



    GetMinistry() {
        return axios.get(API_URL + '/GetMinistry');
    }

    GetAllGroup(para, gp) {
        let config = {
            headers: authHeader(),
            params: {
                draw: 1,
                sortBy: para.sortBy,
                sortOrder: para.sortOrder,
                start: para.pageStart,
                length: para.pageStop,
                //search: para.search
                ministry_id: gp.ministry_id,
                sender_group_id: gp.sender_group_id,
                fromdate: gp.fromdate,
                todate: gp.todate,
                group_name: gp.group_name,
                group_member: gp.group_member,
            }
        }
        return axios.get(API_URL + '/GetAllGroup', config);
    }


    GetAllGroupMember(para, gid) {
        let config = {
            headers: authHeader(),
            params: {
                draw: 1,
                sortBy: para.sortBy,
                sortOrder: para.sortOrder,
                start: para.pageStart,
                length: para.pageStop,
                search: para.search,
                group_id: gid
            }
        }
        return axios.get(API_URL + '/GetAllGroupMember', config);
    }


    GetById(id) {
        return axios.get(API_URL + '/GetById?id=' + id, { headers: authHeader() });
    }


    InsertDataForDataList(gp) {
        return axios.post(API_URL + '/InsertDataForData', {
            group_id: gp.group_id,
            datainfo: gp.datainfo,
            //GMList: itemlist,
        }, { headers: authHeader() });
    }

    CreateGroupFromCampaign(gpname,selectrows){
        return axios.post(API_URL1+'/CreateGroup',{   
           gpname:gpname,
            selectrows:selectrows,
        },{headers: authHeader()});
    
    }
}

export default new GroupService();