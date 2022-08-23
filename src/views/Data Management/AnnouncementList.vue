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
        <v-card-title>Announcements</v-card-title>
        <v-divider></v-divider>
        <v-col cols="12" md="12">
          <v-row dense class="mb-n5">
            <v-col cols="12" md="6" >
              <v-btn @click="newItem()" class="mt-1" small outlined color="indigo"
                ><v-icon left>mdi-plus-circle</v-icon>Create New
                <AnnouncementEntry v-on:getData="GetAllData" ref="AnnouncementEntryModal"
              /></v-btn>
            </v-col>
            <!--
            <v-col cols="12" md="2">
                          <date-picker
                          v-model="searchBy.fromdate"
                            valueType="YYYY-MM-DD"
                            format="DD/MM/YYYY"
                            :editable="true"
                            placeholder="Created Date(From)"
                            clearable
                          ></date-picker>
                        </v-col>
                        <v-col cols="12" md="2">
                          <date-picker
                          v-model="searchBy.todate"
                            valueType="YYYY-MM-DD"
                            format="DD/MM/YYYY"
                            :editable="true"
                            placeholder="Created Date(To)"
                            clearable
                          ></date-picker>
                        </v-col>
                        -->
            <v-col cols="12" md="6">
              <v-row dense>
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
                <v-col cols="12" md="5">
                  <v-btn class="mr-2" small outlined color="primary" @click="Filter">Search</v-btn>
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
                            ><v-icon left>mdi-export</v-icon> 
                            <span slot="loader" class="custom-loader">
                              <v-icon light>mdi-cached</v-icon>
                            </span></v-btn
                          >
                          <a href="#" id="mylink"></a>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-data-table
         :disable-sort="isDisabled"
            :headers="headers"
            :items="datalist"
            :search="search"
            :options.sync="pagination"
            :server-items-length="totalclass"
            :footer-props="footerProps"
          >
            <template v-slot:item="row">
              <tr >
                <td>
                <v-btn @click="editItem(row.item)" dense class="mr-2" small outlined color="warning">Edit</v-btn>
                <v-btn @click="deleteItem(row.item)" dense class="mr-2" small outlined color="error">Delete</v-btn>
                </td>
                <td><v-switch v-model="row.item.status" class="mt-0" color="green" hide-details v-on="on" inset @change="ChangeStatus(row.item)"></v-switch></td>
                <!--<td>{{ row.item.fromdate }}</td>    -->
                <td>{{ row.item.description }}</td> 
              </tr>
            </template>
          </v-data-table>
        </v-col>
      </v-card>
    </v-col>
  </div>
</template>

<script>
import AnnouncementEntry from "../Data Management/AnnouncementEntry";
import AnnouncementService from"../../services/announcementservice"
export default {
  components: {
    AnnouncementEntry,
  },
  data() {
    return {
      dialog: false,
      datalist:[],
      loading: false,
      isDisabled:false,
      snackbar: false,
      totalclass:0,
       x: "right",
       y: "top",
       search:"",
       searchBy:{
        fromdate:"",
        todate:"",
       },
       excelloading:false,
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

     headers: [
        { text: "Actions", value: "action", sortable: false, width: "50" },
        { text: "Announcement Status", value: "status", width: "50" },
        { text: "Announcements", value: "description", width: "300"}, 
      ],


    };
  },
  computed: {
        params() {
            return {
                ...this.pagination
            };
        }
    },
   watch: {
    params: {
      handler() {
        this.GetAllData();
      },
      deep: true,
    },
  },
  created() {
    this.$emit("eventname", true);
  },
  methods: {
    GetAllData(){
      var vm=this;
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
      AnnouncementService.GetAll(params,vm.searchBy).then(
          (response) => {
            vm.datalist = [];
            vm.datalist=response.data.data;
            vm.totalclass = response.data.recordsTotal;
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
    Filter(){
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
    ResetFilter(){
       this.pagination= {
        descending: true,
        page: 1,
        itemsPerPage: 10,
        pageStart: 1,
        pageStop: null,
        sortBy: ["id"],
      },
      this.search="";
      this.searchBy={
        fromdate:"",
        todate:"",
      }
      this.GetAllData();
    },
    newItem() {
      this.$refs.AnnouncementEntryModal.announce.id=0;
      this.$refs.AnnouncementEntryModal.dialog = true;

    },
    deleteItem(item) {
      var vm = this;
       vm.loading = true;
       vm.isDisabled = true;
      this.$confirm("Are you sure you want to delete this item?").then((result) => {
        if (result) {
          AnnouncementService.DeleteData(item.id).then(
            (response) => {
                vm.loading = false;
                vm.isDisabled = false;
                vm.snackbar=true;
                vm.color="red";
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

    editItem(item) {
      this.loading = true;
      this.$refs.AnnouncementEntryModal.isDisabled = true;
      AnnouncementService.GetById(item.id).then((result) => {
        this.$refs.AnnouncementEntryModal.announce = result.data;
         this.loading = false;
        this.$refs.AnnouncementEntryModal.isDisabled = false;
      });
      this.$refs.AnnouncementEntryModal.dialog = true;
    },
    ChangeStatus(item) {
            var vm = this;
            this.$confirm("Are you sure you want to change this status?", {
                title: "Status",
                color: "primary",
            }).then((res) => {
                if (res) {
                    AnnouncementService.ChangeStatus(item).then((result) => {
                        if (result.data.success) {
                            vm.GetAllData();
                        }
                    });
                } else {
                    item.status = true;
                }
            });
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
        AnnouncementService.GetExcelData(params,vm.announce).then(
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
  },
};

</script>
