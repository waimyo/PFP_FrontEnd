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
            <v-card :disabled="isDisabled">
                <v-expansion-panels accordion v-model="panel" open>
                    <v-expansion-panel>
                        <v-expansion-panel-header>
                            Data Selection Filters
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-form autocomplete="off" @submit.prevent="Insert" ref="form" v-model="valid" lazy-validation>
                                <v-row dense>
                                    <v-col cols="12" md="12">
                                        <v-row dense>
                                            <v-col cols="12" md="3" v-if="issuperadmin">
                                                <v-autocomplete v-model="group.ministry_id" item-text="ministry.name" item-value="id" :items="ministrylist" outlined dense @change="OnChangeMinistry" placeholder="ဝန်ကြီးဌာနရွေးချယ်ပါ"></v-autocomplete>
                                            </v-col>
                                            <v-col cols="12" md="3" v-if="issuperadmin">
                                                <v-autocomplete v-model="group.sender_group_id" item-text="username" item-value="id" :items="cpulist" outlined dense placeholder="CPU ရွေးချယ်ပါ"></v-autocomplete>
                                            </v-col>
                                            <v-col cols="12" md="3">
                                                <date-picker v-model="group.fromdate" valueType="YYYY-MM-DD" format="DD/MM/YYYY" :editable="true" placeholder="Created Date (From)"></date-picker>
                                            </v-col>
                                            <v-col cols="12" md="3">
                                                <date-picker v-model="group.todate" valueType="YYYY-MM-DD" format="DD/MM/YYYY" :editable="true" placeholder="Created Date (To)"></date-picker>
                                            </v-col>

                                            <v-col cols="12" md="3">
                                                <v-text-field v-model="group.group_name" outlined dense placeholder="အုပ်စုအမည်"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" md="3">
                                                <v-text-field type="number" min="1" v-model="group.group_member" outlined dense placeholder="စုစုပေါင်းဦးရေ"></v-text-field>
                                            </v-col>

                                            <v-col cols="12" :md="colmd" class="text-right">
                                                <v-btn @click="Filter" small outlined color="primary" class="mr-2">ရှာမည်</v-btn>
                                                <v-btn @click="ResetFilter" small outlined color="error">ပြန်လည်ရွေးချယ်မည်</v-btn>
                                            </v-col>
                                        </v-row>

                                        <!-- <v-row dense>

                      </v-row> -->
                                    </v-col>

                                    <!-- <v-col cols="12" md="12">
                      <v-row dense>
                        <v-col cols="12" md="3">
                          <v-subheader>Select Account Details</v-subheader>
                        </v-col>
                        <v-col cols="12" md="3">

                          <v-autocomplete
                            v-model="group.ministry_id"
                            item-text="name"
                            item-value="id"
                            :items="ministrylist"
                            outlined
                            dense
                            @change="OnChangeMinistry"
                            clearable
                          ></v-autocomplete>
                          <v-subheader class="sub">ဝန်ကြီးဌာနကိုရွေးရန်</v-subheader>
                        </v-col>
                        <v-col cols="12" md="3">

                          <v-autocomplete
                            v-model="group.sender_group_id"
                            item-text="name"
                            item-value="id"
                            :items="cpulist"
                            outlined
                            dense
                            clearable
                          ></v-autocomplete>
                          <v-subheader class="sub">Select CPU</v-subheader>
                        </v-col>
                      </v-row>

                      <v-row dense>
                        <v-col cols="12" md="3">
                          <v-subheader>နေ့စွဲကိုရွေးရန် (Created Date)</v-subheader>
                        </v-col>
                        <v-col cols="12" md="3">
                          <date-picker
                            v-model="group.fromdate"
                            valueType="YYYY-MM-DD"
                            format="DD/MM/YYYY"
                            :editable="true"
                            placeholder="Select Start Date"
                          ></date-picker>
                        </v-col>
                        <v-col cols="12" md="3">
                          <date-picker
                            v-model="group.todate"
                            valueType="YYYY-MM-DD"
                            format="DD/MM/YYYY"
                            :editable="true"
                            placeholder="Select End Date"
                          ></date-picker>
                        </v-col>
                      </v-row>

                      <v-row dense class="mt-3">
                        <v-col cols="12" md="3"> </v-col>
                        <v-col cols="12" md="6">
                          <v-btn
                            @click="Filter"
                            small
                            outlined
                            color="primary"
                            class="mr-2"
                            >Apply Filter</v-btn
                          >
                          <v-btn @click="ResetFilter" small outlined color="error"
                            >Reset</v-btn
                          >
                        </v-col>
                      </v-row>
                    </v-col> -->
                                </v-row>
                            </v-form>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-card>
            <v-card class="mt-1" :disabled="isDisabled">
                <v-card-title>အုပ်စုအားလုံးကိုကြည့်ရန်</v-card-title>
                <v-divider></v-divider>
                <v-col cols="12" md="12">
                    <v-data-table :headers="headers" :items="itemlist" :search="search" :options.sync="pagination" :server-items-length="total" :footer-props="footerProps" :disable-sort="disableSort">
                        <template v-slot:item="row">
                            <tr>
                                <td>
                                    <router-link :to="{
                        name: 'GroupDetail',
                        query: { groupId: row.item.id },
                      }">
                                        <v-btn small outlined color="success">အသေးစိတ်ကြည့်ရှုမည်</v-btn>
                                    </router-link>
                                </td>
                                <td>{{ row.item.id }}</td>

                                <td>{{ row.item.username }}</td>
                                <td>{{ row.item.group_name }}</td>
                                <td>{{ row.item.group_member }}</td>
                                <td>{{ row.item.gdate }}</td>
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
import Group from "../../models/group";
import GroupService from "../../services/groupservice";
import DropdownService from "../../services/dropdownservice";
export default {
    data() {
        return {
            isExactActive: true,
            showMessages: true,
            loading: false,
            isDisabled: false,
            disableSort: false,
            //ministry: "['All Ministries','AAA']",
            cpu: "All CPUs",
            headers: [{
                    text: "အသေးစိတ်ကြည့်ရှုမည်",
                    value: "action",
                    sortable: false,
                    width: "150"
                },
                {
                    text: "အုပ်စုအမှတ်စဉ်",
                    value: "groupno",
                    width: "150"
                },
                {
                    text: "ပေးပို့သည့်အဖွဲ့",
                    value: "username",
                    width: "150"
                },
                {
                    text: "အုပ်စုအမည်",
                    value: "group_name",
                    width: "150"
                },
                {
                    text: "စုစုပေါင်းဦးရေ",
                    value: "group_member",
                    width: "150"
                },
                {
                    text: "အုပ်စုဖွဲ့သည့်နေ့",
                    value: "gdate",
                    width: "150"
                },
            ],
            itemlist: [],

            pagination: {
                descending: true,
                page: 1,
                itemsPerPage: 50,
                pageStart: 1,
                pageStop: null,
                sortBy: ["id"],
            },
            footerProps: {
                "items-per-page-options": [50,100,200,300,400,500],
            },

            group: new Group(),
            ministrylist: [],
            cpulist: [],
            issuperadmin: false,
        };
    },

    watch: {
        '$route'() {
            //to refresh list, when click back button in campaign detail page
            this.GetAllData();
        },

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
                ...this.pagination,
            };
        },
        messages() {
            return this.showMessages ? ["Active"] : undefined;
        },
    },
    created() {
        this.$emit("eventname", true);
        this.GetMinistry();
        this.OnChangeMinistry();
        // this.GetAllData();

        //if login user is superadmin,show ministry,cpu dropdowns and created date
        if (this.$store.state.auth.user.role_id == 1) {
            this.issuperadmin = true;
            this.colmd = 6;
        } else {
            this.issuperadmin = false;
            this.colmd = 12;
        }

        
    },

    methods: {
        GetMinistry() {
            var vm = this;
            DropdownService.GetMinistryAccount().then((result) => {
                vm.ministrylist = result.data;
                vm.ministrylist.splice(0, 0, {
                    "id": 0,
                    "ministry.name": "All Ministries",
                });

            });
        },
        OnChangeMinistry() {
            //alert("hello ser");
            var vm = this;
            DropdownService.GetAllCPUAccountByMinistry(vm.group.ministry_id).then((result) => {
                vm.cpulist = result.data;
                vm.cpulist.splice(0, 0, {
                    id: 0,
                    username: "All CPUS",
                });
                vm.group.sender_group_id = 0;
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
            //params.search = this.group;
            //alert("getall")
            params.draw = this.draw;
            if (params.sortDesc) {
                params.descending = params.sortDesc[0];
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
            GroupService.GetAllGroup(params,this.group).then(
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

        Filter() {
           (this.pagination = {
                descending: true, //sort order
                page: 1, //current
                itemsPerPage: 50,
                pageStart: 1, //skip
                pageStop: null, //length
                // pageCount: 0,
                sortBy: ["id"], //default sort column
            });

            this.GetAllData();
        },
        ResetFilter() {
            this.group = new Group(),
            this.OnChangeMinistry();
            this.pagination = {
                descending: true, //sort order
                page: 1, //current
                itemsPerPage: 50,
                pageStart: 1, //skip
                pageStop: null, //length
                // pageCount: 0,
                sortBy: ["id"], //default sort column
            };
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
