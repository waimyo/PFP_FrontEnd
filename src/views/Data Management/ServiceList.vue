<style scoped>
.sub {
    float: left;
    margin-top: -10px;
}
</style>
<template>
<div>
    <v-progress-linear :active="loading" rounded indeterminate absolute top height="3" color="warning"></v-progress-linear>
    <v-snackbar class="pt-0" :color="color" v-model="snackbar" :right="x" :timeout="timeout" :top="y">
        {{ text }}
        <template v-slot:action="{ attrs }">
            <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
                <v-icon>mdi-close-circle</v-icon>
            </v-btn>
        </template>
    </v-snackbar>
    <v-col cols="12" md="12">
        <v-card :disabled="isDisabled">
            <v-card-title>View Existing Services</v-card-title>
            <v-divider></v-divider>
            <v-col cols="12" md="12">
                <v-row dense class="mb-n5">
                    <v-col cols="12" md="2">
                        <v-btn @click="newItem()" class="mt-1" small outlined color="indigo">
                            <v-icon left>mdi-plus-circle</v-icon>Create New
                            <ServiceEntry v-on:getData="GetAllData" ref="ServiceEntryModal" />
                        </v-btn>
                    </v-col>
                    <!-- <v-col cols="12" md="6"> -->
                        <!-- <v-row dense> -->
                         <v-col cols="12" md="3">
                          <v-autocomplete
                            v-model="service.ministry_id"
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
                                <v-text-field v-model="search" placeholder="ရှာဖွေရန်" append-icon="mdi-magnify" outlined dense autocomplete="off"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-btn class="mr-1" small outlined color="primary" @click="Filter">Search</v-btn>
                                <v-btn class small outlined color="error" @click="ResetFilter">Reset</v-btn>
                                <v-btn class="ml-1"
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

                <v-data-table :disable-sort="isDisabled" :headers="headers" :items="servicelist" :search="search" :options.sync="pagination" :server-items-length="totalclass" :footer-props="footerProps">
                    <template v-slot:item="row">
                        <tr>
                            <td>
                                <v-btn @click="editItem(row.item)" dense class="mr-2" small outlined color="warning">Edit</v-btn>
                                <v-btn @click="deleteItem(row.item)" dense class="mr-2" small outlined color="error">Delete</v-btn>
                            </td>
                            <td>{{ row.item.name }}</td>
                            <td>{{ row.item.department_name }}</td>
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
import ServiceEntry from "./ServiceEntry.vue";
import ServicesService from "../../services/serviceservice";
import Service from "../../models/service";
import DropDownService from "../../services/dropdownservice"
//import $ from "jquery"
export default {
    components: {
        ServiceEntry
    },
    data() {
        return {
            dialog: false,
            service: new Service(),
            loading: false,
            isDisabled: false,
            snackbar: false,
            showMessages: true,
            excelloading:false,
            x: "right",
            y: "top",
            search: "",
            ministrylist:[],
            pagination: {
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

            headers: [{
                    text: "Action",
                    value: "action",
                    sortable:false,
                    width: "200"
                },
                {
                    text: "NAME",
                    value: "name",
                    width: "200"
                },
                {
                    text: "PARENT DEPARTMENT",
                    value: "department_name",
                    width: "150"
                },
                {
                    text: "PARENT MINISTRY",
                    value: "ministry_name",
                    width: "150"
                }
            ],
            servicelist: [],
            totalclass: 0
        };
    },

    created() {
        this.$emit("eventname", true);
        // this.GetAllData();
        this.GetMinistry();
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
            console.log(nv);
            return {
                ...this.pagination
            };
        }
    },
    methods: {
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
            //params.descending = params.sortDesc[0];
            if (params.descending == true) {
                params.sortOrder = "desc";

            } else {
                params.sortOrder = "asc";
            }
            params.sortBy = params.sortBy[0];
            ServicesService.GetAll(params,vm.service).then(
                response => {
                    vm.servicelist = [];
                    response.data.data.forEach(function (item) {
                        vm.servicelist.push(item);
                    });
                    vm.totalclass = response.data.recordsTotal;
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
    

    newItem() {

            this.$refs.ServiceEntryModal.dialog = true;

        },
        GetMinistry(){
            var vm=this;
            DropDownService.GetMinistry().then((result)=>
            {
                vm.ministrylist=result.data
            })
        },
        deleteItem(item) {
            var vm = this;
            vm.loading = true;
            vm.isDisabled = true;
            this.$confirm("Are you sure you want to delete this item?").then(
                result => {
                    if (result) {
                        ServicesService.DeleteData(item).then(
                            response => {
                                vm.loading = false;
                                vm.isDisabled = false;
                                vm.snackbar = true;
                                vm.color = "red";
                                vm.text = response.data.messages[0];
                                vm.GetAllData();
                            },
                            error => {
                                console.error(error);
                            }
                        );
                    }
                }
            );
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
             this.pagination={
                descending: true,
                page: 1,
                itemsPerPage: 10,
                pageStart: 1,
                pageStop: null,
                sortBy: ["id"]
            },
            this.search = "";
            this.service=[];
            this.GetAllData();
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
           
        ServicesService.GetExcelData(params, vm.service).then(
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
        editItem(item) {
            var vm = this;
            vm.loading = true;
            this.$refs.ServiceEntryModal.isDisabled = true;
            ServicesService.GetById(item.id).then(result => {
                this.$refs.ServiceEntryModal.service = result.data;
                this.$refs.ServiceEntryModal.GetDepartment();
                this.$refs.ServiceEntryModal.service.dept_id = result.data.deptid;
                vm.loading = false;
                this.$refs.ServiceEntryModal.isDisabled = false;
            });
            this.$refs.ServiceEntryModal.dialog = true;
        }
    }
};
</script>
