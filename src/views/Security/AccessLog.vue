<style scoped>
.theme--light.v-subheader.sub {
    float: left;
    margin-top: -35px;
}
</style>
<template>
<div>
    <v-progress-linear :active="loading" rounded indeterminate absolute top height="3" color="warning"></v-progress-linear>
    <div v-show="isExactActive">
        <v-col cols="12" md="12">
            <v-card class="" :disabled="isDisabled">
                <v-card-title>View Access Logs</v-card-title>
                <v-divider></v-divider>
                <v-col cols="12" md="12">
                    <v-row dense class="mb-n5">
                        <!-- <v-col cols="12" md="5"> </v-col> -->
                        <v-col cols="12" md="12">
                            <v-row dense>
                                <v-col cols="12" md="3">
                                    <date-picker v-model="fromdate" valueType="YYYY-MM-DD" format="DD/MM/YYYY" :editable="false" placeholder="ရွေးချယ်ပါ" :clearable="false">
                                    </date-picker>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <date-picker v-model="todate" valueType="YYYY-MM-DD" format="DD/MM/YYYY" :editable="false" placeholder="ရွေးချယ်ပါ" :clearable="false">
                                    </date-picker>
                                </v-col>

                                <v-col cols="12" md="3">
                                    <v-text-field v-model="search" placeholder="ရှာဖွေရန်" append-icon="mdi-magnify" outlined dense autocomplete="off"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <v-btn class="mr-2" small outlined color="primary" @click="Filter">ရှာမည်</v-btn>
                                    <v-btn class small outlined color="error" @click="ResetFilter">ပြန်လည်ရွေးချယ်မည်</v-btn>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>

                    <!-- <v-data-table
              :headers="headers"
              :items="itemlist"
              :search="search"
              :options.sync="pagination"
              :server-items-length="totalclass"
              :footer-props="footerProps"
            >
              <template v-slot:item="row">
                <tr>
                  <td>{{ row.item.accesstime }}</td>
                  <td>{{ row.item.username }}</td>
                  <td>{{ row.item.role }}</td>
                  <td>{{ row.item.pageaccessed }}</td>
                  <td>{{ row.item.ipaddress }}</td>
                </tr>
              </template>
            </v-data-table> -->

                    <v-data-table :headers="headers" :items="itemlist" :search="search" :options.sync="pagination" :server-items-length="total" :footer-props="footerProps" :disable-sort="disableSort">
                        <template v-slot:item="row">
                            <tr>
                                <td>{{ row.item.access_time }}</td>
                                <td>{{ row.item.username }}</td>
                                <td>{{ row.item.role }}</td>
                                <td>{{ row.item.page_accessed }}</td>
                                <td>{{ row.item.action }}</td>
                                <td>{{ row.item.ip_address }}</td>
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
import AccessLogService from "../../services/accesslogservice";
export default {
    data() {
        return {
            isDisabled: false,
            disableSort: false,
            isExactActive: true,
            //c_index: -1,
            dialog: false,
            loading: false,

            showMessages: true,
            headers: [{
                    text: "ACCESS TIME",
                    value: "access_time",
                    width: "150"
                },
                {
                    text: "USERNAME",
                    value: "username",
                    width: "150"
                },
                {
                    text: "ROLE",
                    value: "role",
                    width: "100"
                },
                {
                    text: "PAGE ACCESSED",
                    value: "page_accessed",
                    width: "100"
                },
                {
                    text: "ACTION",
                    value: "action",
                    width: "100"
                },
                {
                    text: "IP ADDRESS",
                    value: "ip_address",
                    width: "150"
                },
            ],
            // itemlist: [
            //   {
            //     accesstime: "2021-07-03 14:42:45",
            //     username: "superadmin",
            //     role: "superadmin",
            //     pageaccessed: "dataportal",
            //     ipaddress: "103.83.189.206",
            //   },
            //   {
            //     accesstime: "2021-07-03 14:27:55",
            //     username: "superadmin",
            //     role: "superadmin",
            //     pageaccessed: "admin",
            //     ipaddress: "103.83.189.206",
            //   },
            // ],

            itemlist: [],
            total: 0,

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

            firstDay: "",
            lastDay: "",
            fromdate: "",
            todate: "",
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
        this.CurrentMonth();
    },

    methods: {
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
            if (params.sortDesc) {
                params.descending = params.sortDesc[0];
                if (params.descending == true) {
                    params.sortOrder = "desc";
                } else {
                    params.sortOrder = "asc";
                }

            }

            params.sortBy = params.sortBy[0];
            AccessLogService.GetAll(params, this.fromdate, this.todate).then(
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
            this.fromdate = y + "-" + m + "-" + d;

            var endy = this.firstDay.getFullYear();
            var endm = this.firstDay.getMonth() + 1;
            var endd = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
            if (endm.toString().length === 1) {
                endm = "0".concat(endm);
            }
            this.todate = endy + "-" + endm + "-" + endd;
        },

        Filter() {
            this.pagination = {
                descending: true, //sort order
                page: 1, //current
                itemsPerPage: 10,
                pageStart: 1, //skip
                pageStop: null, //length
                // pageCount: 0,
                sortBy: ["id"], //default sort column
            };
            this.GetAllData();
        },

        ResetFilter() {
            this.search = "";
            this.pagination = {
                descending: true, //sort order
                page: 1, //current
                itemsPerPage: 10,
                pageStart: 1, //skip
                pageStop: null, //length
                // pageCount: 0,
                sortBy: ["id"], //default sort column
            };
            this.CurrentMonth();
            this.GetAllData();
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
