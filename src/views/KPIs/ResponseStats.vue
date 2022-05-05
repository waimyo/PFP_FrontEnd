<style scoped>
.theme--light.v-subheader.sub {
  float: left;
  margin-top: -35px;
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
    <div v-show="isExactActive">
      <v-col cols="12" md="12">
        <v-card :disabled="isDisabled">
          <v-expansion-panels accordion v-model="panel" open>
            <v-expansion-panel>
              <v-expansion-panel-header>
                Data Selection Filters
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-form
                  autocomplete="off"
                  @submit.prevent="Insert"
                  ref="form"
                  v-model="valid"
                  lazy-validation
                >
                  <v-row dense>
                    <v-col cols="12" md="12">
                      <v-row dense>
                        <v-col cols="12" md="4">
                          <v-subheader>Ministry Name</v-subheader>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-autocomplete
                            v-model="dataSearch.ministry_id"
                            item-text="name"
                            item-value="id"
                            :items="ministrylist"
                            outlined
                            dense
                            clearable
                          ></v-autocomplete>
                        </v-col>
                      </v-row>

                      <v-row dense>
                        <v-col cols="12" md="4">
                          <v-subheader>Select the period (SMS Incoming Date)</v-subheader>
                        </v-col>
                        <v-col cols="12" md="3">
                          <date-picker
                            v-model="dataSearch.fromdate"
                            valueType="YYYY-MM-DD"
                            format="DD/MM/YYYY"
                            :editable="true"
                            placeholder="Select Start Date"
                          ></date-picker>
                        </v-col>
                        <v-col cols="12" md="3">
                          <date-picker
                            v-model="dataSearch.todate"
                            valueType="YYYY-MM-DD"
                            format="DD/MM/YYYY"
                            :editable="true"
                            placeholder="Select End Date"
                          ></date-picker>
                        </v-col>
                      </v-row>

                      <v-row dense class="mt-3">
                        <v-col cols="12" md="4"> </v-col>
                        <v-col cols="12" md="6">
                          <v-btn small outlined color="primary" class="mr-2" @click="Filter"
                            >ရှာမည်</v-btn
                          >
                          <v-btn small outlined color="error" @click="ResetFilter">ပြန်လည်ရွေးချယ်မည်</v-btn>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-form>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
        <v-card class="mt-1" :disabled="isDisabled">
          <v-card-title>Response Stats</v-card-title>
          <v-divider></v-divider>
          <v-col cols="12" md="12">
            <v-row dense class="mt-3">
              <v-col cols="12" md="6">
                <!-- <v-btn class="mt-1" small outlined color="success"  @click="ExportExcel"
                  ><v-icon left>mdi-export</v-icon>Export Excel</v-btn
                > -->

                <v-btn
                            :loading="excelloading"
                            :disabled="excelloading"
                            small
                            outlined
                            color="success"
                            @click="ExportExcel"
                            ><v-icon left>mdi-export</v-icon> Export Excel
                            <span slot="loader" class="custom-loader">
                              <v-icon light>mdi-cached</v-icon>
                            </span></v-btn
                          >
                          <a href="#" id="mylink"></a>

              </v-col>
              <v-col cols="12" md="6"> </v-col>
            </v-row>

            <v-data-table
              :headers="headers"
              :items="itemlist"
              :search="search"
              :options.sync="pagination"
              :server-items-length="total"
              :footer-props="footerProps"
              :disable-sort="disableSort"
            >
              <template v-slot:item="row">
                <tr>
                  <td>{{ row.item.name }}</td>
                  <td>{{ row.item.username }}</td>
                  <td>{{ row.item.role_name }}</td>
                  <td>{{ row.item.sms_send_count }}</td>
                  <td>{{ row.item.sms_receive_count }}</td>
                  <td>{{ row.item.response_rate }}%</td>
                </tr>
              </template>
               <template slot="body.append">
                <tr class="font-weight-bold">
                  <th>Totals</th>
                  <th class="title"></th>
                  <th class="title"></th>
                  <th>{{ sumField("sms_send_count") }}</th>
                  <th>{{ sumField("sms_receive_count") }}</th>
                  <th>{{ Math.round(( sumField("sms_receive_count")  / sumField("sms_send_count") * 100))    }} %</th>
                 
                  
                </tr>
              </template>
            </v-data-table>
          </v-col>
        </v-card>
      </v-col>
    </div>
    <router-view ref="rv"></router-view>
  </div>
</template>

<script>
import StatusSearch from "../../models/response_status_search";
import StatusService from "../../services/response_status.service";
import DropDownService from "../../services/dropdownservice";
export default {
  data() {
    return {
      excelloading: false,
      isDisabled: false,
      disableSort: false,
      dataSearch:new StatusSearch(),
      loading: true,
      fromdate: null,
      todate: null,
      isExactActive: true,
      showMessages: true,
      total:0,
      search:"",
      ministrylist:[],
      headers: [
        { text: "ACCOUNT", value: "name", width: "200" },
        { text: "NAME", value: "username", width: "150" },
        { text: "ROLE", value: "role_name", width: "150" },
        { text: "SEND", value: "send", width: "150" },
        { text: "RECEIVED", value: "received", width: "150" },
        { text: "RESPONSE RATE", value: "response_rate", width: "150" },
      ],
      itemlist: [
        // {
        //   account: "acc",
        //   name: "Anti-corruption Commission",
        //   role: "ministry",
        //   send: "15",
        //   received: "11",
        //   responserate: "73%",
        // }
       
      ],
      pagination: {
        descending: true,
        page: 1,
        itemsPerPage: 10,
        pageStart: 1,
        pageStop: null,
        sortBy: ["id"],
      },
      footerProps: {
                "items-per-page-options": [10, 20, 30, 40, 50],
            },

    };
  },
  computed: {
    messages() {
      return this.showMessages ? ["Active"] : undefined;
    },
    params(nv) {
      console.log(nv);
      return {
        ...this.pagination,
      };
    },
  },
  created() {
    this.$emit("eventname", true);
    this.GetMinistry();
    //  this.GetAllData();
  },
  updated() {
    this.isExactActive = typeof this.$refs.rv === "undefined";
  },

  mounted() {
    this.isExactActive = typeof this.$refs.rv === "undefined";
  },

  methods:{
     GetMinistry() {
      var vm = this;
      DropDownService.GetMinistry().then((result) => {
        vm.ministrylist = result.data;
         vm.ministrylist.splice(0, 0, {
          id: 0,
          "name": "All Ministries",
        });
      });
    },

     GetAllData() {
      var vm = this;
      vm.loading = true;
     vm.isDisabled = true;
      vm.disableSort = true;
      let params = vm.params;
      params.pageStop = params.itemsPerPage;
      params.pageStart = params.page == 1 ? 0 : params.itemsPerPage * (params.page - 1); //set offset
      params.search = vm.search;
      params.draw = this.draw;
      //params.descending = params.sortDesc[0];
      if (params.descending == true) {
        params.sortOrder = "desc";
      } else {
        params.sortOrder = "asc";
      }
      if (params.sortBy) {
          params.sortBy = params.sortBy[0];
      }
      //params.sortBy = params.sortBy[0];        
      StatusService.GetAll(params,vm.dataSearch).then(
          (response) => {
            vm.itemlist = [];
            response.data.data.forEach(function (item) {
              vm.itemlist.push(item);
            });
            vm.total = response.data.recordsTotal;
           
            vm.loading = false;
           vm.isDisabled = false;
          vm.disableSort = false;
          },
          (error) => {
            console.error(error);
          }
        );
    },

      sumField(key) {
      // sum data in give key (property)
      return this.itemlist.reduce((a, b) => a + (b[key] || 0), 0);
    },
  
     Filter() {
      this.pagination= {
        descending: true,
        page: 1,
        itemsPerPage: 10,
        pageStart: 1,
        pageStop: null,
        sortBy: ["id"],
      },
      this.GetAllData();
    },

    ResetFilter() {
      this.pagination= {
        descending: true,
        page: 1,
        itemsPerPage: 10,
        pageStart: 1,
        pageStop: null,
        sortBy: ["id"],
      },
       this.ministrylist.splice(0, 0, {
          id: 0,
          "name": "All Ministries",
        });
      this.dataSearch.ministry_id=0;
      this.dataSearch.fromdate = '';
      this.dataSearch.todate = '';
      this.GetAllData();
    },
   ExportExcel() {
      var vm = this;
      vm.excelloading = true;
      // return new Promise((resolve, reject) => {
      //   vm.resolve = resolve;
      //   vm.reject = reject;
      //   let params = vm.params;
      //   params.pageStop = params.itemsPerPage;
      //   params.pageStart =
      //     params.page == 1 ? 0 : params.itemsPerPage * (params.page - 1); //set offset
      //   params.search = vm.search;
      //   params.draw = this.draw;
        // params.descending = params.sortDesc[0];
        // if (params.descending == true) {
        //   params.sortOrder = "desc";
        // } else {
        //   params.sortOrder = "asc";
        // }
        // params.sortBy = params.sortBy[0];
        StatusService.GetExcelData(vm.dataSearch).then(
          (response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          var fileLink = document.createElement("a");
          fileLink.href = url;
          fileLink.setAttribute("download", "file.xls");
          document.body.appendChild(fileLink);
          fileLink.click();
         vm.excelloading = false;
          },
          (error) => {
            console.error(error);
          }
        );
     // });
    },
    
  },
  watch: {
        params: {
            handler() {
                this.GetAllData();
            },
            deep: true,

        },
  }
};
</script>
