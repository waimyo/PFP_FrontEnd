<style scoped>
.sub {
  float: left;
  margin-top: -10px;
}
</style>
<template>
  <div>
    <v-progress-linear
      :active="loading"
      rounded
      indeterminate
      absolute
      top
      height="3"
      color="warning"
    ></v-progress-linear>
    <v-col cols="12" md="12">
      <v-card :disabled="isDisabled">
        <v-card-title
          >View Existing Locations
          <v-spacer>
            <v-btn
              style="float: right"
              :loading="excelloading"
              :disabled="excelloading"
              small
              outlined
              color="success"
              @click="ExportExcel"
              ><v-icon left>mdi-export</v-icon> Export Excel For All
              <span slot="loader" class="custom-loader">
                <v-icon light>mdi-cached</v-icon>
              </span></v-btn
            >
            <a href="#" id="mylink"></a>
          </v-spacer>
        </v-card-title>

        <v-divider></v-divider>
        <v-col cols="12" md="12">
          <v-row dense class="mb-n5">
            <v-col cols="12" md="5">
              <v-btn
                @click="ShowSateDivisionDialog()"
                class="mt-1 mr-2"
                small
                outlined
                color="indigo"
              >
                <v-icon left>mdi-plus-circle</v-icon>State/Division
                <LocationEntry v-on:getData="GetAllData" ref="LocationEntryModal" />
              </v-btn>
              <v-btn
                @click="ShowDistrictDialog()"
                class="mt-1 mr-2"
                small
                outlined
                color="indigo"
              >
                <v-icon left>mdi-plus-circle</v-icon>District
                <DistrictEntry v-on:getData="GetAllData" ref="DistrictEntryModal" />
              </v-btn>
              <v-btn
                @click="ShowTownshipDialog()"
                class="mt-1"
                small
                outlined
                color="indigo"
              >
                <v-icon left>mdi-plus-circle</v-icon>Township
                <TownshipEntry v-on:getData="GetAllData" ref="TownshipEntryModal" />
              </v-btn>
            </v-col>
            <v-col cols="12" md="7">
              <v-row dense>
                <v-col cols="12" md="3">
                  <v-autocomplete
                    v-model="locationtypeid"
                    :items="locationtypelist"
                    item-text="name"
                    item-value="id"
                    outlined
                    dense
                    placeholder="LocationTypeရွေးချယ်ပါ"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" md="5">
                  <v-text-field
                    v-model="search"
                    placeholder="ရှာဖွေရန်"
                    append-icon="mdi-magnify"
                    outlined
                    dense
                    autocomplete="off"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-btn class="mr-2" small outlined color="primary" @click="Filter"
                    >Search</v-btn
                  >
                  <v-btn class small outlined color="error" @click="ResetFilter"
                    >Reset</v-btn
                  >
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-data-table
            :disable-sort="isDisabled"
            :headers="headers"
            :items="locationlist"
            :search="search"
            :options.sync="pagination"
            :server-items-length="totallocation"
            :footer-props="footerProps"
          >
            <template v-slot:item="row">
              <tr>
                <td>
                  <v-btn
                    @click="Edit(row.item)"
                    dense
                    class="mr-2"
                    small
                    outlined
                    color="warning"
                    >Edit</v-btn
                  >
                  <v-btn
                    @click="Delete(row.item)"
                    dense
                    class="mr-2"
                    small
                    outlined
                    color="red"
                    >Delete</v-btn
                  >
                </td>
                <td>{{ row.item.stateDivisionName }}</td>
                <td>{{ row.item.stateDivisionCode }}</td>
                <td>{{ row.item.districtName }}</td>
                <td>{{ row.item.districtCode }}</td>
                <td>{{ row.item.townshipName }}</td>
                <td>{{ row.item.townshipCode }}</td>
              </tr>
            </template>
          </v-data-table>
        </v-col>
      </v-card>
    </v-col>
  </div>
</template>

<script>
/*eslint-disable*/
import LocationEntry from "./LocationEntry";
import DistrictEntry from "../../views/Data Management/DistrictEntry.vue";
import TownshipEntry from "../../views/Data Management/TownshipEntry.vue";
import LocationService from "../../services/locationservice";
import $ from "jquery";
export default {
  components: {
    LocationEntry,
    DistrictEntry,
    TownshipEntry,
  },
  watch: {
    params: {
      handler() {
        this.GetAllData();
      },
      deep: true,
    },
  },
  computed: {
    params(nv) {
      return {
        ...this.pagination,
      };
    },
  },
  data() {
    return {
        excelloading: false,
      isDisabled: false,
      locationtypeid: 0,
      locationtypelist: [
        {
          id: 1,
          name: "State/Division",
        },
        {
          id: 2,
          name: "District",
        },
        {
          id: 3,
          name: "Township",
        },
      ],
      search: "",
      dialog: false,
      loading: true,
      snackbar: false,
      text: "",
      color: "",
      headers: [
        {
          text: "Action",
          value: "action",
          width: "200",
        },
        {
          text: "STATE/DIVISION",
          value: "name",
          width: "200",
        },
        {
          text: "STATE/DIVISION CODE",
          value: "code",
          width: "200",
        },
        {
          text: "DISTRICT",
          value: "name",
          width: "150",
        },
        {
          text: "DISTRICT CODE",
          value: "code",
          width: "150",
        },
        {
          text: "TOWNSHIP",
          value: "name",
          width: "150",
        },
        {
          text: "TOWNSHIP CODE",
          value: "code",
          width: "150",
        },
      ],

      totallocation: 0,
      locationlist: [],
      pagination: {
        descending: true, //sort order
        page: 1, //current
        itemsPerPage: 10,
        pageStart: 1, //skip
        pageStop: null, //length
        // pageCount: 0,
        sortBy: ["id"], //default sort column
      },
      footerProps: {
        "items-per-page-options": [10, 20, 30, 40, 50],
      },
    };
  },

  created() {
    this.$emit("eventname", true);
  },
  methods: {
    ShowSateDivisionDialog() {
      this.$refs.LocationEntryModal.dialog = true;
    },
    ShowDistrictDialog() {
      this.$refs.DistrictEntryModal.GetStateDivision();
      this.$refs.DistrictEntryModal.dialog = true;
    },
    ShowTownshipDialog() {
      this.$refs.TownshipEntryModal.GetStateDivision();

      this.$refs.TownshipEntryModal.dialog = true;
    },
    GetAllData() {
      var vm = this;
      vm.loading = true;
      vm.isDisabled = true;

      let params = vm.params;
      params.pageStop = params.itemsPerPage;
      params.pageStart = params.page == 1 ? 0 : params.itemsPerPage * (params.page - 1);
      params.search = this.search;
      params.locationtype = this.locationtypeid;
      params.draw = this.draw;

      if (params.sortDesc) {
      params.descending = params.sortDesc[0];
      if (params.descending == true) {
        params.sortOrder = "desc";
      } else {
        params.sortOrder = "asc";
      }
      }
      params.sortBy = params.sortBy[0];

      LocationService.GetAll(params).then(
        (result) => {
          vm.draw++;
          vm.locationlist = [];
          result.data.data.forEach(function (item) {
            vm.locationlist.push(item);
          });
          vm.loading = false;
          vm.isDisabled = false;

          vm.totallocation = result.data.recordsTotal;
        },
        (error) => {
          console.error(error);
        }
      );
    },
    Delete(item) {
      var vm = this;
      this.$confirm("Are you sure you want to delete this item?").then((res) => {
        if (res) {
          LocationService.DeleteData(item).then(
            (response) => {
              vm.color = "red";
              vm.snackbar = true;
              vm.text = response.data.messages[0];
              vm.GetAllData();
            },
            (error) => {
              console.error(error);
            }
          );
        }
      });
    },
    Edit(item) {
      this.loading = true;

      LocationService.GetById(item.id).then((result) => {
        if (result.data.LocationType == 1) {
          this.$refs.LocationEntryModal.isDisabled = true;
          this.$refs.LocationEntryModal.loc = result.data;
          this.ShowSateDivisionDialog();
          this.$refs.LocationEntryModal.isDisabled = false;
        }
        if (result.data.LocationType == 2) {
          this.$refs.DistrictEntryModal.isDisabled = true;
          this.$refs.DistrictEntryModal.loc = result.data;
          this.ShowDistrictDialog();
          this.$refs.DistrictEntryModal.isDisabled = false;
        }
        if (result.data.LocationType == 3) {
          this.$refs.TownshipEntryModal.isDisabled = true;
          this.$refs.TownshipEntryModal.loc = result.data;
          if (result.data.StateDivisionId > 0) {
            this.$refs.TownshipEntryModal.GetDistrict();
          }

          this.ShowTownshipDialog();
          this.$refs.TownshipEntryModal.isDisabled = false;
        }
        this.loading = false;
      });
    },
    Filter() {
      this.pagination= {
        descending: true, //sort order
        page: 1, //current
        itemsPerPage: 10,
        pageStart: 1, //skip
        pageStop: null, //length
        // pageCount: 0,
        sortBy: ["id"], //default sort column
      },
      this.GetAllData();
    },

    ResetFilter() {
      this.pagination= {
        descending: true, //sort order
        page: 1, //current
        itemsPerPage: 10,
        pageStart: 1, //skip
        pageStop: null, //length
        // pageCount: 0,
        sortBy: ["id"], //default sort column
      },
      this.search = "";
      this.locationtypeid = 0;
      this.GetAllData();
    },

    ExportExcel() {
      var vm = this;
      vm.excelloading = true;
      LocationService.GetExcelData().then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        $("#mylink").attr("href", url);
        $("#mylink").attr("download", "Location.xls");
        $("#mylink")[0].click();
        vm.excelloading = false;
      });
    },
  },
};
</script>
