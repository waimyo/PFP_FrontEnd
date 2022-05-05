import axios from "axios";
import authHeader from "../services/auth-header";
const API_URL = process.env.VUE_APP_API_ENDPOINT;

export default new (class CampaignService {
  GetAll(para, vm) {
    let config = {
      headers: authHeader(),
      params: {
        draw: 1,
        sortBy: para.sortBy,
        sortOrder: para.sortOrder,
        start: para.pageStart,
        length: para.pageStop,
        Name: vm.Name,
        Status: vm.Status,
        SmsMessage: vm.SmsMessage,
        GroupNo: vm.GroupNo,
        MinistryId: vm.MinistryId,
        CreatedUserId: vm.CreatedUserId,
        CreatedDateFrom: vm.CreatedDateFrom,
        CreatedDateTo: vm.CreatedDateTo,
      },
    };
    return axios.get(API_URL + "/campaignslist", config);
  }

  GetCampaignByName(name) {
    return axios.get(
      API_URL + "/campaignsentry/GetCampaignByName?name=" + name,
      {
        headers: authHeader(),
      }
    );
  }

  GetCampaignDetail(id, para) {
    let config = {
      headers: authHeader(),
      params: {
        draw: 1,
        sortBy: para.sortBy,
        sortOrder: para.sortOrder,
        start: para.pageStart,
        length: para.pageStop,
        id: id,
        search: para.search,
      },
    };
    return axios.get(API_URL + "/campaignslist/Detail", config);
  }

  ExportToExcel(id, para) {
    let config = {
      headers: authHeader(),
      params: {
        draw: 1,
        sortBy: para.sortBy,
        sortOrder: para.sortOrder,
        start: para.pageStart,
        length: -1,
        id: id,
        search: para.search,
      },
      responseType: "blob",
    };
    return axios.get(
      API_URL + "/CampaignsList/ExcelExportForDetailList",
      config
    );
  }

  GetCampaignConfirmList(groupid) {
    return axios.get(
      API_URL + "/campaignsentry/GetCampaignConfirmList?groupid=" + groupid,
      { headers: authHeader() }
    );
  }

  InsertData(camp) {
    return axios.post(
      API_URL + "/campaignsentry/saveorupdate/",
      {
        Id: camp.Id,
        Name: camp.Name,
        // Status: camp.Status,
        SmsMessage: camp.SmsMessage,
        ClosingMessage: camp.ClosingMessage,
        SmsCodeId: camp.SmsCodeId,
        GroupId: camp.GroupId,
        SmsShortCodeText: camp.SmsShortCodeText,
      },
      {
        headers: authHeader(),
      }
    );
  }

  CloseCampaign(camp) {
    return axios.post(
      API_URL + "/campaignsentry/closecampaign",
      {
        Id: camp.Id,
      },
      {
        headers: authHeader(),
      }
    );
  }

  GetGroup() {
    return axios.get(API_URL + "/campaignsentry/getgroup", {
      headers: authHeader(),
    });
  }
})();
