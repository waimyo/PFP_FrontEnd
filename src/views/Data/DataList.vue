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
    <v-snackbar
      class="pt-0"
      :color="color"
      v-model="snackbar"
      :right="x"
      :timeout="timeout"
      :top="y"
    >
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
          <v-icon>mdi-close-circle</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <div v-show="isExactActive">
      <v-col cols="12" md="12">
        <v-card :disabled="isDisabled">
          <v-expansion-panels accordion v-model="panel" open>
            <v-expansion-panel>
              <v-expansion-panel-header>Data Selection Filters</v-expansion-panel-header>
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
                        <v-col cols="12" md="3">
                          <v-text-field
                            v-model="dataSearch.name"
                            outlined
                            dense
                            placeholder="ရှာဖွေရန်"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3">
                          <v-autocomplete
                            v-model="dataSearch.gender"
                            :items="gender"
                            item-text="Name"
                            item-value="Id"
                            autocomplete="off"
                            outlined
                            dense
                            clearable
                            placeholder="ကျား/မ ရွေးချယ်ပါ"
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" md="3">
                          <date-picker
                            v-model="dataSearch.fromdate"
                            valueType="YYYY-MM-DD"
                            format="DD/MM/YYYY"
                            :editable="true"
                            placeholder="Created Date(From)"
                            clearable
                          ></date-picker>
                        </v-col>
                        <v-col cols="12" md="3">
                          <date-picker
                            v-model="dataSearch.todate"
                            valueType="YYYY-MM-DD"
                            format="DD/MM/YYYY"
                            :editable="true"
                            placeholder="Created Date(To)"
                            clearable
                          ></date-picker>
                        </v-col>
                      </v-row>
                      <v-row dense>
                      <v-col cols="12" md="3">
                          <v-text-field
                            v-model="dataSearch.service"
                            outlined
                            dense
                            placeholder="ဝန်ဆောင်မှုအမျိုးအစား"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3" v-show="!showminandcpudd">
                          <v-autocomplete
                            v-model="dataSearch.user_id"
                            item-text="username"
                            item-value="id"
                            autocomplete="off"
                            :items="deolist"
                            outlined
                            dense
                            placeholder="Select DEO"
                            
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" md="3" v-show="showminandcpudd">
                          <v-autocomplete
                            v-model="dataSearch.ministry_id"
                            item-text="ministry.name"
                            item-value="id"
                            autocomplete="off"
                            :items="ministrylist"
                            outlined
                            dense
                            @change="OnChangeMinistry"
                            placeholder="ဝန်ကြီးဌာနရွေးချယ်ပါ"
                            
                          ></v-autocomplete>
                          <!--v-subheader class="sub">ဝန်ကြီးဌာနကိုရွေးရန်</v-subheader-->
                        </v-col>
                        <v-col cols="12" md="3" v-show="showminandcpudd">
                          <v-autocomplete
                            v-model="dataSearch.user_id"
                            :items="cpulist"
                            item-text="username"
                            item-value="id"
                            autocomplete="off"
                            outlined
                            dense
                            placeholder="Select CPU"
                            
                          ></v-autocomplete>
                          <!--v-subheader class="sub">Select CPU</v-subheader-->
                        </v-col>
                        <v-col cols="12" md="4" v-show="!showminandcpudd"></v-col>
                        <v-col cols="12" md="5" class="">
                          <v-btn @click="Filter" small outlined color="primary" class="mr-2">ရှာမည်</v-btn>
                          <v-btn
                            @click="ResetFilter"
                            small
                            outlined
                            color="error"
                            class="mr-2"
                          >ပြန်လည်ရွေးချယ်မည်</v-btn>
                          <!-- <v-btn @click="ExportExcel" small outlined color="green" class="mr-2"
                          ><v-icon left>mdi-export</v-icon>Excel Export</v-btn><a href="#" id="mylink"></a>-->

                          <v-btn
                            :loading="excelloading"
                            :disabled="excelloading"
                            small
                            outlined
                            color="success"
                            @click="ExportExcel"
                          >
                            <v-icon left>mdi-export</v-icon>Export Excel
                            <span slot="loader" class="custom-loader">
                              <v-icon light>mdi-cached</v-icon>
                            </span>
                          </v-btn>
                          <a href="#" id="mylink"></a>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-form>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>

        <v-card :disabled="isDisabled" class="mt-1">
          <v-card-title>Data Portal</v-card-title>
          <v-divider></v-divider>
          <v-col cols="12" md="12">
            <v-data-table
              :disable-sort="isDisabled"
              :headers="headers"
              :items="itemlist"
              :search="search"
              :options.sync="pagination"
              :server-items-length="total"
              :footer-props="footerProps"
            >
              <template v-slot:item="row">
                <tr>
                  <!--td>
                  <v-btn @click="editItem(row.item)" dense class="mr-2" small outlined color="warning">Edit</v-btn>
                  <v-btn @click="deleteItem(row.item)" dense class="mr-2" small outlined color="error" >Delete</v-btn>
                  </td-->
                  <td>{{ row.item.id }}</td>
                  <!-- v-bind:showButtons="false" -->
                  <td><quick-edit 
                  v-model="row.item.name"    
                  :buttonCancelText= 'buttonCancelText'
                  :buttonOkText= 'buttonOkText'
                  @input="SaveName($event,row.item.id)"
                  >{{ row.item.name }}</quick-edit></td>
                  <td>{{ row.item.mobile }}</td>
                  <td>{{ row.item.gender }}</td>
                  <td>{{ row.item.ministry }}</td>
                  <td>{{ row.item.department }}</td>
                  <td>{{ row.item.service }}</td>
                  <td>{{ row.item.statedivision }}</td>
                  <td>{{ row.item.district }}</td>
                  <td>{{ row.item.township }}</td>
                  <td>{{ row.item.date_of_application }}</td>
                  <td>{{ row.item.date_of_completion }}</td>
                  <td>{{ row.item.created_by }}</td>
                  <td>{{ row.item.created_date }}</td>
                  <!--td>{{ row.item.datadate }}</td-->
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
import DataService from "../../services/dataservice";
import DropDownService from "../../services/dropdownservice";
import DataSearch from "../../models/datasearch";
import $ from "jquery";
import QuickEdit from 'vue-quick-edit';
import Data from "../../models/data";

export default {
  components:{QuickEdit,},
  data() {
    return {
      buttonCancelText: '×',
      buttonOkText: '✔',
      text: "",
      snackbar: false,
      color: "warning",
      x: "right",
      y: "top",
      data:new Data(),
      excelloading: false,
      dataSearch: new DataSearch(),
      loading: true,
      isExactActive: true,
      isDisabled: false,
      ministrylist: [],
      showminandcpudd: true,
      cpulist: [],
      cpu: "All CPU",
      fromdate: "",
      todate: "",
      firstDay: "",
      lastDay: "",
      gender: [
        { Id: true, Name: "ကျား" },
        { Id: false, Name: "မ" }
      ],
      total: 0,
      panel: true,
      search: "",
      headers: [
        //{ text: "Actions", value: "action", sortable: false, width: 200 },
        { text: "ID", value: "dataid", width: "100" },
        { text: "အမည်", value: "name", width: "300" },
        { text: "ဖုန်းနံပါတ်", value: "mobile", width: "100" },
        { text: "ကျား/မ", value: "gender", width: "100" },
        { text: "ဝန်ကြီးဌာန", value: "ministry", width: "200" },
        { text: "ဦးစီးဌာန", value: "department", width: "200" },
        { text: "ဝန်ဆောင်မှုအမျိုးအစား", value: "service", width: "200" },
        { text: "ပြည်နယ်/တိုင်းဒေသကြီး", value: "statedivision", width: "200" },
        { text: "ခရိုင်", value: "district", width: "150" },
        { text: "မြို့နယ်", value: "township", width: "200" },
        {
          text: "ဝန်ဆောင်မှုရယူရန် ရုံးသို့လာရောက်သည့်နေ့",
          value: "date_of_application",
          width: "300"
        },
        {
          text: "ဝန်ဆောင်မှုရရှိခဲ့သည့်နေ့",
          value: "date_of_completion",
          width: "200"
        },
        { text: "ပေးပို့သူ", value: "created_by", width: "200" },
        //{ text: "UPLOADED DATE", value: "iron", width: "200" },
        {
          text: "အချက်အလက်များတင်သွင်းသည့်နေ့",
          value: "created_date",
          width: "250"
        }
      ],
      itemlist: [],
      pagination: {
        descending: true,
        page: 1,
        itemsPerPage: 50,
        pageStart: 1,
        pageStop: null,
        sortBy: ["id"]
      },
      footerProps: {
        "items-per-page-options": [50,100,200,300,400,500]
      },
      ministryRules: [v => !!v || "ဝန်ကြီးဌာနရွေးရန်လိုအပ်ပါသည်။"],

      deolist: [],
      deo_parent_id : 0,
    };
  },
  computed: {
    messages() {
      return this.showMessages ? ["Active"] : undefined;
    },
    params(nv) {
      console.log(nv);
      return {
        ...this.pagination
      };
    }
  },
  created() {
    this.$emit("eventname", true);
    let user = JSON.parse(localStorage.getItem("user"));
    this.deo_parent_id = user.id;
    if (user.role_id == 1) {
      this.showminandcpudd = true;
      this.GetMinistry();
      this.OnChangeMinistry();
    } else {
      this.showminandcpudd = false;
    }
    this.CurrentMonth();
    this.GetDEO();
  },

  updated() {
    this.isExactActive = typeof this.$refs.rv === "undefined";
  },

  mounted() {
    this.isExactActive = typeof this.$refs.rv === "undefined";
  },

  methods: {
    SaveName(newname, id) {
      var dt=this;
      if(newname==null || newname=="" || newname==" "){
        //alert("name is not null or empty");   
        //dt.color = "red";
        dt.snackbar = true;
        dt.text = "အမည်ထည့်ရန်လိုအပ်ပါသည်။";     
      }
      else{
        dt.data.id=id;
        dt.data.name=newname;
        const today = new Date();
        //const date = String(today. getDate()).padStart(2, '0') +'-'+ String(today. getMonth() + 1).padStart(2, '0') +'-'+ today.getFullYear();
        dt.data.date_of_application=today;
        dt.data.date_of_completion=today;
        DataService.InsertData(dt.data);
      }
      dt.GetAllData();
    },
    GetAllData() {
      var vm = this;
      vm.loading = true;
      vm.isDisabled = true;
      let params = vm.params;
      params.pageStop = params.itemsPerPage;
      params.pageStart =
        params.page == 1 ? 0 : params.itemsPerPage * (params.page - 1); //set offset
      params.search = vm.search;
      params.draw = this.draw;
      if (params.sortDesc) {
        params.descending = params.sortDesc[0];
        // params.descending =false;
        if (params.descending == true) {
          params.sortOrder = "desc";
        } else {
          params.sortOrder = "asc";
        }
      }
      if (params.sortBy) {
        params.sortBy = params.sortBy[0];
      }
      //params.sortBy = params.sortBy[0];
      DataService.GetAll(params, vm.dataSearch).then(
        response => {
          vm.itemlist = [];
          response.data.data.forEach(function(item) {
            vm.itemlist.push(item);
          });
          vm.total = response.data.recordsTotal;
          if (response.data.success == false) {
            vm.snackbar = true;
            vm.color = "red";
            vm.text = response.data.messages[0];
          }
          vm.loading = false;
          vm.isDisabled = false;
        },
        error => {
          console.error(error);
        }
      );
    },
    CurrentMonth() {
      var date = new Date();
      this.firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

      var y = this.firstDay.getFullYear();
      var m = this.firstDay.getMonth() + 1;
      var d = 1;
      if (m.toString().length === 1) {
        m = "0".concat(m);
      }
      if (d.toString().length === 1) {
        d = "0".concat(d);
      }
      this.dataSearch.fromdate = y + "-" + m + "-" + d;

      var endy = this.firstDay.getFullYear();
      var endm = this.firstDay.getMonth() + 1;
      var endd = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
      if (endm.toString().length === 1) {
        endm = "0".concat(endm);
      }
      this.dataSearch.todate = endy + "-" + endm + "-" + endd;
    },
    GetMinistry() {
      var vm = this;
      DropDownService.GetMinistryAccount().then(result => {
        vm.ministrylist = result.data;
        vm.ministrylist.splice(0, 0, {
          id: 0,
          "ministry.name": "All Ministries"
        });
      });
    },

    OnChangeMinistry() {
      var vm = this;
      DropDownService.GetAllCPUAccountByMinistry(
        vm.dataSearch.ministry_id
      ).then(result => {
        vm.cpulist = result.data;
        vm.cpulist.splice(0, 0, {
          id: 0,
          username: "All CPUS"
        });
        this.dataSearch.user_id=0;
      });
    },

    GetDEO() {
      var vm = this;
      DropDownService.GetDEOAccount().then(result => {
        vm.deolist = result.data;
      });
    },

    Filter() {
      (this.pagination = {
        descending: true,
        page: 1,
        itemsPerPage: 50,
        pageStart: 1,
        pageStop: null,
        sortBy: ["id"]
      }),
        this.GetAllData();
    },

    ResetFilter() {
      this.dataSearch = new DataSearch();
      (this.pagination = {
        descending: true,
        page: 1,
        itemsPerPage: 50,
        pageStart: 1,
        pageStop: null,
        sortBy: ["id"]
      }),
        (this.dataSearch.name = "");
      this.dataSearch.gender = "";
      this.dataSearch.service
      this.CurrentMonth();
      //this.cpulist=[];
      this.GetAllData();
    },

    ExportExcel() {
      var vm = this;
      vm.excelloading = true;
      DataService.GetExcelData(vm.dataSearch).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        $("#mylink").attr("href", url);
        $("#mylink").attr("download", "file.xls");
        $("#mylink")[0].click();
        vm.excelloading = false;
      });
    }
  },
  watch: {
    params: {
      handler() {
        this.GetAllData();
      },
      deep: true
    }
  }
};
</script>
