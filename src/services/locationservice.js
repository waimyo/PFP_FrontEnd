import axios from "axios";
import authHeader from "../services/auth-header";
const API_URL = process.env.VUE_APP_API_ENDPOINT;

class LocationService {
    GetAll(para) {
        let config = {
            headers: authHeader(),
            params: {
                draw: 1,
                sortBy: para.sortBy,
                sortOrder: para.sortOrder,
                start: para.pageStart,
                length: para.pageStop,
                search: para.search,
                locationtype: para.locationtype,
            },
        };
        return axios.get(API_URL + "/location", config);
    }

    // GetAllStateDivision() {
    //   return axios.get(API_URL + "/location/GetAllStateDivision");
    // }

    // GetAllDistrict(statediv_id) {
    //   return axios.get(
    //     API_URL + "/location/GetAllDistrict?statedivid=" + statediv_id
    //   );
    // }

    InsertData(loc) {
        return axios.post(
            API_URL + "/location", {
                Id: loc.Id,
                LocationType: loc.LocationType,
                StateDivisionId: loc.StateDivisionId,
                StateDivisionName: loc.StateDivisionName,
                StateDivisionCode: loc.StateDivisionCode,
                DistrictId: loc.DistrictId,
                DistrictName: loc.DistrictName,
                DistrictCode: loc.DistrictCode,
                TownshipId: loc.TownshipId,
                TownshipName: loc.TownshipName,
                TownshipCode: loc.TownshipCode,
            }, { headers: authHeader() }
        );
    }

    GetById(id) {
        return axios.get(API_URL + "/location/GetById?id=" + id, {
            headers: authHeader(),
        });
    }
    DeleteData(loc) {
        return axios.delete(API_URL + "/location/" + loc.id, {
            headers: authHeader(),
        });
    }

    GetExcelData() {
        let config = {
            headers: authHeader(),
            params: {

            },
            responseType: "blob",
        }
        return axios.get(API_URL + '/Location/ExcelExportForLocation', config);
    }
}
export default new LocationService();