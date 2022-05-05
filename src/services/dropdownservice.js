import axios from 'axios'
import authHeader from '../services/auth-header'

const API_URL = process.env.VUE_APP_API_ENDPOINT;

class DropDownService {
    GetMinistry() {
        return axios.get(API_URL + '/DropDown/GetMinistry');
    }
    GetMinistryNoTraining() {
        return axios.get(API_URL + '/DropDown/GetMinistryAccountNoTraining');
    }
    GetMinistryAccount() {

        return axios.get(API_URL + '/DropDown/GetMinistryAccount');
    }
    GetDepartment(ministry_id) {
        return axios.get(API_URL + '/DropDown/GetDepartment?ministryid=' + ministry_id)
    }
    GetService(dept_id) {
        return axios.get(API_URL + '/DropDown/GetService?deptid=' + dept_id)
    }
    GetAllStateDivision() {
        return axios.get(API_URL + "/DropDown/GetAllStateDivision");
    }
    GetAllDistrict(statediv_id) {
        return axios.get(API_URL + "/DropDown/GetAllDistrict?statedivid=" + statediv_id);
    }

    GetAllTownship(district_id) {
        return axios.get(
            API_URL + "/DropDown/GetAllTownship?districtid=" + district_id);
    }

    GetAllTownshipByMinistry(ministry_id) {
        return axios.get(API_URL + "/DropDown/GetAllTownshipByMinistry?ministry_id=" + ministry_id);
    }

    GetCreatedDateList(ministry_id) {
        return axios.get(API_URL + '/DropDown/GetCreatedDateList?ministryid=' + ministry_id)
    }
    GetUserList(ministry_id) {
            return axios.get(API_URL + '/DropDown/GetUserList?ministryid=' + ministry_id)
        }
        // GetAllCPUAccount(minid) {
        //     return axios.get(API_URL + '/Dropdown/GetAllCPUAccount?ministry_id=' + minid);
        // }
    GetCategory() {
        return axios.get(API_URL + '/DropDown/GetCategory');
    }

    GetSmsShortCode() {
        return axios.get(API_URL + "/dropdown/GetSmsShortCode");
    }

    GetGroup() {
        return axios.get(API_URL + "/dropdown/GetGroup");
    }
    GetDataList() {
        return axios.get(API_URL + '/DropDown/GetDataList', { headers: authHeader() });
    }
    GetAllCPUAccountByMinistry(ministry_id) {
        return axios.get(API_URL + '/DropDown/GetAllCPUAccountByMinistry?ministryid=' + ministry_id);
    }
    GetRoleByNotDefault() {
        return axios.get(API_URL + "/DropDown/GetRoleByNotDefault");
    }
    GetDEOAccount() {
        return axios.get(API_URL + "/DropDown/GetAllDEOAccount", {
            headers: authHeader(),
        });
    }
    GetDEOAccountByChattingId(chatid) {
        return axios.get(API_URL + "/DropDown/GetDEOAccountByChatting?chat_id=" + chatid);
    }
    GetUserNameCPU(parent_id) {
        return axios.get(API_URL + "/DropDown/GetUserNameCPU?parent_id=" + parent_id);
    }
    GetUserNameDEO(parent_id) {
        return axios.get(API_URL + "/DropDown/GetUserNameDEO?parent_id=" + parent_id);
    }
}

export default new DropDownService();