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

    <v-col cols="12" md="12">
      <v-card :disabled="isDisabled">
        <v-card-title>View Existing Department</v-card-title>
        <v-divider></v-divider>
        <v-col cols="12" md="12">
          <v-row dense class="mb-n5">
            <v-col cols="12" md="2">
              <v-btn @click="newItem()" class="mt-1" small outlined color="indigo"
                ><v-icon left>mdi-plus-circle</v-icon>Create New
                <DeparmentEntry v-on:getData="GetAllData" ref="DeparmentEntryModal"
              /></v-btn>
            </v-col>
            <!-- <v-col cols="12" md="6"> -->
              <!-- <v-row dense> -->
               <v-col cols="12" md="3">
                          <v-autocomplete
                            v-model="department.ministry_id"
                             item-value="id"
                             item-text="name"
                            :items="ministrylist"
                            autocomplete="off"
                            outlined
                            dense
                            clearable
                            placeholder="ဝန်ကြီးဌာနရွေးချယ်ပါ"
                          ></v-autocomplete>
                        </v-col>
                <v-col cols="12" md="3">
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
                  <v-btn class="ml-2"
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
                <!-- </v-col> -->
              <!-- </v-row> -->
            </v-col>
          </v-row>

          <v-data-table
            :headers="headers"
            :items="itemlist"
            :search="search"
            :options.sync="pagination"
            :server-items-length="total"
            :footer-props="footerProps"
            :disable-sort="isDisabled"
          >
            <template v-slot:item="row">
              <tr>
                <td>
                  <v-btn
                    @click="editItem(row.item)"
                    dense
                    class="mr-2"
                    small
                    outlined
                    color="warning"
                    >Edit</v-btn
                  >
                  <v-btn
                    @click="deleteItem(row.item)"
                    dense
                    class="mr-2"
                    small
                    outlined
                    color="error"
                    >Delete</v-btn
                  >
                </td>
                <td>{{ row.item.name }}</td>
                <td>{{ row.item.ministry_name }}</td>
              </tr>
            </template>
          </v-data-table>
        </v-col>
      </v-card>
    </v-col>
  </div>
</template>

<script>
import DeparmentEntry from "../Data Management/DepartmentEntry";
import Department from "../../models/department";
import DepartmentService from "../../services/departmentservice";
import DropDownService from "../../services/dropdownservice"

export default {
  components: {
    DeparmentEntry,
  },
  data() {
    return {
      isDisabled:false,
      showMessages: true,
      dialog: false,

      text: "",
      snackbar: false,
      color: "",
      timeout: "5000",
      x: "right",
      y: "top",

      search: "",
      headers: [
        { text: "Actions", value: "action", sortable: false, width: 100 },
        { text: "NAME", value: "name", width: "100" },
        { text: "PARENT MINISTRY", value: "ministry_name", width: "150" },
      ],
      itemlist: [],
      total: 0,
      excelloading:false,
      department: new Department(),
      ministrylist:[],
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

      loading: true,
    };
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
    params() {
      return {
        ...this.pagination,
      };
    },
  },
  created() {
    this.$emit("eventname", true);
    this.GetMinistry();
  },
  methods: {
    GetAllData() {
      var vm = this;
      vm.loading = true;
      vm.isDisabled=true;
      let params = vm.params;
      params.pageStop = params.itemsPerPage;
      params.pageStart = params.page == 1 ? 0 : params.itemsPerPage * (params.page - 1); //set offset
      params.search = vm.search;
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
      DepartmentService.GetAll(params,vm.department).then(
        (response) => {
          vm.itemlist = [];
          response.data.data.forEach(function (item) {
            vm.itemlist.push(item);
          });
          vm.total = response.data.recordsTotal;
          vm.loading = false;
          vm.isDisabled=false;
        },
        (error) => {
          console.error(error);
        }
      );
    },
    ExportExcel() {
      var vm = this;
      vm.excelloading = true;
      return new Promise((resolve, reject) => {
        vm.resolve = resolve;
        vm.reject = reject;
        let params = vm.params;
        params.pageStop = params.itemsPerPage;
        params.pageStart =
        params.page == 1 ? 0 : params.itemsPerPage * (params.page - 1); //set offset
        params.search = vm.search;
        params.draw = this.draw;
        // params.descending = params.sortDesc[0];
        if (params.descending == true) {
          params.sortOrder = "desc";
        } else {
          params.sortOrder = "asc";
        }
        params.sortBy = params.sortBy[0];
        DepartmentService.GetExcelData(params,vm.department).then(
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
      });
    },
     GetMinistry(){
            var vm=this;
            DropDownService.GetMinistry().then((result)=>
            {
                vm.ministrylist=result.data
            })
        },

    Filter() {
      this.pagination={
                descending: true,
                page: 1,
                itemsPerPage: 10,
                pageStart: 1,
                pageStop: null,
                sortBy: ["id"]
            },
      this.GetAllData();
    },

    ResetFilter() {
      this.search = "";
      this.department=[];
      this.pagination={
                descending: true,
                page: 1,
                itemsPerPage: 10,
                pageStart: 1,
                pageStop: null,
                sortBy: ["id"]
            },
      this.GetAllData();
    },

    deleteItem(item) {
      var vm = this;
      this.$confirm("Are you sure you want to delete this item?").then((result) => {
        if (result) {
          DepartmentService.DeleteData(item).then(
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

    newItem() {
      this.$refs.DeparmentEntryModal.dialog = true;
      this.$refs.DeparmentEntryModal.department = [];
    },

    editItem(item) {
      this.loading = true;
      this.$refs.DeparmentEntryModal.isDisabled = true;
      DepartmentService.GetById(item.id).then((result) => {
        this.$refs.DeparmentEntryModal.department = result.data;
        this.loading = false;
        this.$refs.DeparmentEntryModal.isDisabled = false;
      });
      this.$refs.DeparmentEntryModal.dialog = true;
    },
  },
};
</script>
