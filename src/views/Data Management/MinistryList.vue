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
        <v-card-title>View Existing Ministry</v-card-title>
        <v-divider></v-divider>
        <v-col cols="12" md="12">
          <v-row dense class="mb-n5">
            <v-col cols="12" md="2">
              <v-btn @click="newItem()" class="mt-1" small outlined color="indigo"
                ><v-icon left>mdi-plus-circle</v-icon>Create New
                <MinistryEntry v-on:getData="GetAllData"  ref="MinistryEntryModal"
              /></v-btn>
            </v-col>
            <v-col cols="12" md="2"></v-col>
              <!-- <v-row dense> -->
                <v-col cols="12" md="4">
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
                </v-col>
              <!-- </v-row> -->
            <!-- </v-col> -->
          </v-row>

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
                <td>
                <v-btn @click="editItem(row.item)" dense class="mr-2" small outlined color="warning">Edit</v-btn>
                <v-btn @click="deleteItem(row.item)" dense class="mr-2" small outlined color="error">Delete</v-btn>
                </td>
                <td>{{ row.item.name }}</td>
              </tr>
            </template>
          </v-data-table>
        </v-col>
      </v-card>
    </v-col>
  </div>
</template>

<script>
import MinistryEntry from "./MinistryEntry";
import MinistryService from "../../services/ministryservice"
export default {
  components: {
    MinistryEntry,
  },
  watch: {
        params: {
            handler() {
                this.GetAllData();
            },
            deep: true
        }
    },
  data() {
    return {
      isDisabled:false,
      loading: false,
      excelloading:false,
      snackbar: false,
      showMessages: true,
      dialog: false,
      search:"",
      x: "right",
      y: "top",
      total:0,
      headers: [{ text: "Action", value: "name",sortable: false, width: "200" },{ text: "ဝန်ကြီးဌာနအမည်", value: "name", width: "100" }],
      itemlist:[],
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
  created() {
  
    this.$emit("eventname", true);
    //this.GetAllData();
  },
  computed: {
    params() {
      return {
        ...this.pagination,
      };
    },
  },
  methods: {
    newItem() {
       this.$refs.MinistryEntryModal.ministry.id=0;
      // this.$refs.MinistryEntryModal.ministry.name="";
      // this.$refs.MinistryEntryModal.ministry.logo="";
      this.$refs.MinistryEntryModal.ministry.imagebyte=null;
      this.$refs.MinistryEntryModal.dialog = true;
    },

    GetAllData() {
      var vm = this;
      vm.loading = true;
      vm.isDisabled=true;
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
      params.sortBy = params.sortBy[0];
      MinistryService.GetAll(params).then(
          (response) => {
            vm.itemlist = [];
            response.data.data.forEach(function (item) {
              vm.itemlist.push(item);
            });
            vm.total = response.data.recordsTotal;
            if (response.data.success == false) {
              vm.snackbar = true;
              vm.color = "red";
              vm.text = response.data.messages[0];
            }
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
        MinistryService.GetExcelData(params).then(
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
      this.search = "";
      this.GetAllData();
    },

    deleteItem(item) {
      var vm = this;
      this.$confirm("Are you sure you want to delete this item?").then((result) => {
        if (result) {
          vm.loading = true;
          vm.isDisabled = true;
          MinistryService.DeleteData(item).then(
            (response) => {
              if(response.data.success){
                vm.color = "success";
                vm.data=[];
              }else {
                vm.color = "red";
              }
                vm.GetAllData();
                vm.snackbar = true;
                vm.loading = false;
                vm.isDisabled = false;
                vm.text = response.data.messages[0];
            },
            (error) => {
              console.error(error);
            }
          );
        }
      });
    },

    editItem(item) {
      this.loading = true;
      this.$refs.MinistryEntryModal.isDisabled = true;
      MinistryService.GetById(item.id).then((result) => {
        this.$refs.MinistryEntryModal.ministry = result.data;
        if(result.data.imagebyte==null || result.data.imagebyte=="")
        {
          this.$refs.MinistryEntryModal.ministry.imagebyte=null;
        }
        else{
          this.$refs.MinistryEntryModal.ministry.imagebyte = `data:image/x-icon;base64,${result.data.imagebyte}`;
        }
        this.loading = false;
        this.$refs.MinistryEntryModal.isDisabled = false;
      });
      this.$refs.MinistryEntryModal.dialog = true;
    },
  },
};
</script>
