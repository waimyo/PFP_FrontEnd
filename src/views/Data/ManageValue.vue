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
        <v-card-title>Manage Values</v-card-title>
        <v-divider class="mb-2"></v-divider>

        <v-expansion-panels v-model="panel" multiple :disabled="isDisabled">
          <v-expansion-panel>
            <v-expansion-panel-header> Service Management </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-data-table
            :headers="headers"
            :items="servicelist"
            :search="search"
            :options.sync="pagination"
            :server-items-length="totalservice"
            :footer-props="footerProps"
            :disable-sort="disableSort"
          >
            <template v-slot:item="row">
              <tr>
                
                <td>{{ row.item.name }}</td>
                <td>{{ row.item.department_name }}</td>
                <!-- <td>{{ row.item.ministry_name }}</td> -->
              </tr>
            </template>
          </v-data-table>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header> Department Management </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-data-table
            :headers="headers1"
            :items="itemlist1"
            :search="search"
            :options.sync="pagination1"
            :server-items-length="total"
            :footer-props="footerProps"
            :disable-sort="disableSort"
          >
            <template v-slot:item="row">
              <tr>
                
                <td>{{ row.item.name }}</td>
                <td>{{ row.item.ministry_name }}</td>
              </tr>
            </template>
          </v-data-table>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </div>
    <router-view ref="rv"></router-view>
  </div>
</template>

<script>
import ServiceViewService from "../../services/serviceviewservice";
export default {
  data() {
    return {
      panel: [0, 1],
      isExactActive: true,
      loading: false,
      isDisabled: false,
      disableSort: false,
     
      itemlist1: [],
      servicelist: [],
      total: 0,
      totalservice: 0,
      //department: new Department(),
      pagination: {
        descending: true,
        page: 1,
        itemsPerPage: 10,
        pageStart: 1,
        pageStop: null,
        sortBy: ["id"]
      },
      pagination1: {
        descending: true,
        page: 1,
        itemsPerPage: 10,
        pageStart: 1,
        pageStop: null,
        sortBy: ["id"]
      },
      footerProps: {
        "items-per-page-options": [10, 20, 30, 40, 50]
      },

       headers: [
        { text: "SERVICE", value: "name", width: "100" },
        { text: "DEPARTMENT", value: "department_name", width: "150" },
      ],
      headers1: [
        { text: "DEPARTMENT", value: "deptname", width: "100" },
        { text: "MINISTRY", value: "ministry_name", width: "150" },
      ],

      sortByName: ["id"],
      sortByNM : "id",

      sortByName1: ["id"],
      sortByNM1 : "id",

    };
  },
  watch: {
    params: {
      handler() {
        this.GetAllDataService();
        //this.GetAllData();
      },
      deep: true,
    },
    params1: {
      handler() {
        this.GetAllData();
      },
      deep: true,
    },
  },
  
  computed: {
    params(nv) {
      console.log(nv);
      return {
        ...this.pagination,
      };
    },
    params1(nv) {
      console.log(nv);
      return {
        ...this.pagination1,
      };
    },
    messages() {
      return this.showMessages ? ["Active"] : undefined;
    },
  },
  created() {
    this.$emit("eventname", true);
    
  },
  methods:{
    GetAllData() {
      
      var vm = this;
      vm.loading = true;
      vm.isDisabled = true;
      vm.disableSort = true;
      let params = vm.params1;
      params.pageStop = params.itemsPerPage;
      params.pageStart = params.page == 1 ? 0 : params.itemsPerPage * (params.page - 1); //set offset
      //params.search = vm.search;
      params.draw = this.draw;
      params.descending = params.sortDesc[0];
      if (params.descending == true) {
        params.sortOrder = "desc";
      } else {
        params.sortOrder = "asc";
      }
      // if(params.sortBy[0] != undefined){
      //   vm.sortByName1 = params.sortBy[0];
      //   if((vm.sortByName1 != null || vm.sortByName1 != undefined || vm.sortByName1 != "")
      //   && vm.sortByName1.length > 1){
      //     params.sortBy = vm.sortByName1;
      //   }
      //   else{
      //     params.sortBy = vm.sortByNM1;
      //   }
      // }
      
      params.sortBy = params.sortBy[0];
      ServiceViewService.GetAll(params).then(
        (response) => {
          vm.itemlist1 = [];
          response.data.data.forEach(function (item) {
            vm.itemlist1.push(item);
          });
          window.console.log(vm.itemlist1);
          vm.total = response.data.recordsTotal;
          //vm.sortByNM = params.sortBy;
          vm.loading = false;
          vm.isDisabled = false;
          vm.disableSort = false;
        },
        (error) => {
          console.error(error);
        }
      );
    },


    GetAllDataService(){
      var vm=this;
      vm.loading = true;
      vm.isDisabled = true;
      vm.disableSort = true;          
      let params = vm.params;
      params.pageStop = params.itemsPerPage;
      params.pageStart = params.page == 1 ? 0 : params.itemsPerPage * (params.page - 1); //set offset
      //params.search = vm.search;
      params.draw = this.draw;
      params.descending = params.sortDesc[0];
      if (params.descending == true) {
        params.sortOrder = "desc";
      } else {
        params.sortOrder = "asc";
      }
      params.sortBy = params.sortBy[0];
      
      // if(params.sortBy[0] != undefined){
      //   vm.sortByName = params.sortBy[0];
      //   if((vm.sortByName != null || vm.sortByName != undefined || vm.sortByName != "")
      //   && vm.sortByName.length > 1){
      //     params.sortBy = vm.sortByName;
      //   }
      //   else{
      //     params.sortBy = vm.sortByNM;
      //   }
      // }

      ServiceViewService.GetAllService(params).then(     
          (response) => {                       
            vm.servicelist = [];
            response.data.data.forEach(function (item) {
              vm.servicelist.push(item);
            });
            vm.totalservice = response.data.recordsTotal;
            //vm.sortByNM = params.sortBy;
            if (response.data.success == false) {
              vm.snackbar = true;
              vm.color = "red";
              vm.text = response.data.messages[0];
            }
             vm.loading=false;
             vm.isDisabled = false;
          vm.disableSort = false;
          },
          (error) => {
            console.error(error);
          }
        );
    }, 


  },
  updated() {
    this.isExactActive = typeof this.$refs.rv === "undefined";
  },

  mounted() {
    this.isExactActive = typeof this.$refs.rv === "undefined";
  },
};
</script>
