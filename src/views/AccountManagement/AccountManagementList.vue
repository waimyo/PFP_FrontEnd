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
                                            <v-col cols="12" md="4" v-if="ishide">
                                                <v-autocomplete v-model="account.ministry_id" item-text="ministry.name" item-value="id" :items="ministrylist" outlined dense @change="OnChangeMinistry" clearable placeholder="ဝန်ကြီးဌာနရွေးချယ်ပါ"></v-autocomplete>
                                            </v-col>
                                            <v-col cols="12" md="4">
                                                <date-picker v-model="account.fromdate" valueType="YYYY-MM-DD" format="DD/MM/YYYY" :editable="true" placeholder="Created Date(From)"></date-picker>
                                            </v-col>
                                            <v-col cols="12" md="4">
                                                <date-picker v-model="account.todate" valueType="YYYY-MM-DD" format="DD/MM/YYYY" :editable="true" placeholder="Created Date(To)"></date-picker>
                                            </v-col>
                                        </v-row>
                                        <v-row dense>
                                            <v-col  cols="12" md="4" v-if="ishide">
                                                <v-autocomplete v-model="account.role_id" :items="rolelist" item-text="name" item-value="id" clearable outlined dense placeholder="Account Type ရွေးချယ်ပါ"></v-autocomplete>
                                            </v-col>
                                            <v-col cols="12" md="4">
                                                <v-text-field v-model="account.search" placeholder="ရှာဖွေရန်" append-icon="mdi-magnify" outlined dense autocomplete="off"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" md="4">
                                                <v-btn class="mr-2" small outlined color="primary" @click="Filter">ရှာမည်</v-btn>
                                                <v-btn class small outlined color="error" @click="ResetFilter">ပြန်လည်ရွေးချယ်မည်</v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-card>
            <v-card :disabled="isDisabled">
                <v-card-title>View Existing Account</v-card-title>
                <v-divider></v-divider>
                <v-col cols="12" md="12">
                    <v-row dense class="mb-n5">
                        <v-col cols="12" md="5">
                            <v-btn v-if="ishide" @click="NewMinistryAccount()" class="mt-1 mr-2" small outlined color="indigo">
                                <v-icon left>mdi-plus-circle</v-icon>Ministry Acc
                                <MinistryAccountEntry v-on:getData="GetAllData" ref="MinistryAccountEntryModal" />
                            </v-btn>
                            <v-btn v-if="ishide" @click="NewCpuAccount()" class="mt-1 mr-2" small outlined color="indigo">
                                <v-icon left>mdi-plus-circle</v-icon>CPU Acc
                                <CPUAccountEntry v-on:getData="GetAllData" ref="CPUAccountEntryModal" />
                            </v-btn>
                            <v-btn v-if="!deodisable" @click="NewDeoAccount()" class="mt-1 mr-2" small outlined color="indigo">
                                <v-icon left>mdi-plus-circle</v-icon>DEO Acc
                                <DEOAccountEntry v-on:getData="GetAllData" ref="DEOAccountEntryModal" />
                            </v-btn>
                        </v-col>
                        <v-col cols="12" md="7">
                            <v-row dense>
                                <v-col cols="12" md="4">
                                    <v-card style="background: #03a9f4 !important">
                                        <v-col cols="12" md="12" class="white--text" v-if="ishide">
                                            <h5>
                                                Ministry Account <span style="float: right">{{ mcount }}</span>
                                            </h5>
                                        </v-col>
                                    </v-card>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-card style="background: #03a9f4 !important">
                                        <v-col  cols="12" md="12" class="white--text" v-if="ishide">
                                            <h5>
                                                CPU Account <span style="float: right">{{ ccount }}</span>
                                            </h5>
                                        </v-col>
                                    </v-card>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-card style="background: #03a9f4 !important">
                                        <v-col cols="12" md="12" class="white--text">
                                            <h5>
                                                DEO Account <span style="float: right">{{ dcount }}</span>
                                            </h5>
                                        </v-col>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row><br />

                    <ChangePasswordEntry ref="ChangePasswordModal" />
                    <v-data-table :disable-sort="isDisabled" :headers="headers" :items="itemlist" :search="search" :options.sync="pagination" :server-items-length="totalclass" :footer-props="footerProps">
                        <template v-slot:item="row">
                            <tr>
                                <td>
                                    <v-btn v-if="ishide" @click="Edit(row.item)" dense class="mr-2" small outlined color="warning">Edit</v-btn>
                                    <v-btn @click="ShowChangePasswordDialog(row.item)" class="mt-1 mr-2" small outlined color="primary">Change Password
                                        
                                    </v-btn>
                                </td>
                                <td v-if="ishidestatus">
                                    <v-row>
                                        <v-col cols="12" md="3">
                                            <v-switch v-model="row.item.status" class="mt-0" color="green" hide-details v-on="on" inset @change="ChangeStatus(row.item)"></v-switch>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-input style="font-size: 35px" persistent-hint :messages="row.item.message">
                                            </v-input>
                                        </v-col>
                                    </v-row>
                                </td>
                                <td>{{ row.item.name }}</td>
                                <td>{{ row.item.username }}</td>
                                <td>{{ row.item.email }}</td>
                                <td>{{ row.item.parent_ministry }}</td>
                                <td>{{ row.item.parent_cpu }}</td>
                                <td>{{ row.item.created_date }}</td>
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
import MinistryAccountEntry from "../../views/AccountManagement/MinistryAccountEntry";
import CPUAccountEntry from "../../views/AccountManagement/CPUAccountEntry";
import DEOAccountEntry from "../../views/AccountManagement/DEOAccountEntry";
import ChangePasswordEntry from "../../views/ChangePassword/ChangePassword";
import AccountService from "../../services/accountservice";
import DropDownService from "../../services/dropdownservice";
import Account from "../../models/account";

export default {
    components: {
        MinistryAccountEntry,
        CPUAccountEntry,
        DEOAccountEntry,
        ChangePasswordEntry,
    },
    data() {
        return {
            collapseOnScroll: true,
            isDisabled: true,
            account: new Account(),
            isExactActive: true,
            ishide: true,
            ishidestatus: false,
            showMessages: true,
            rolelist: [],
            headers: [],
            search: "",
            totalclass: 0,
            headerone: [{
                    text: "ACTION",
                    align: "start",
                    sortable: false,
                    value: "iron",
                    width: "250"
                },
                {
                    text: "NAME",
                    value: "name",
                    width: "150"
                },
                {
                    text: "USERNAME",
                    value: "username",
                    width: "200"
                },
                {
                    text: "EMAIL",
                    value: "email",
                    width: "200"
                },
                {
                    text: "PARENT MINISTRY",
                    value: "parent_ministry",
                    width: "200"
                },
                {
                    text: "PARENT ACCOUNT (NAME/ACCOUNT)",
                    value: "parent_cpu",
                    width: "200"
                },
                {
                    text: "CREATED DATE",
                    value: "created_date",
                    width: "200"
                },
            ],
            headertwo: [{
                    text: "ACTION",
                    align: "start",
                    sortable: false,
                    value: "iron",
                    width: "250"
                },
                {
                    text: "CURRENT ACCOUNT STATUS",
                    value: "status",
                    width: "250"
                },
                {
                    text: "NAME",
                    value: "name",
                    width: "150"
                },
                {
                    text: "USERNAME",
                    value: "username",
                    width: "200"
                },
                {
                    text: "EMAIL",
                    value: "email",
                    width: "200"
                },
                {
                    text: "PARENT MINISTRY",
                    value: "parent_ministry",
                    width: "200"
                },
                {
                    text: "PARENT ACCOUNT (NAME/ACCOUNT)",
                    value: "parent_cpu",
                    width: "200"
                },
                {
                    text: "CREATED DATE",
                    value: "created_date",
                    width: "200"
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
                "items-per-page-options": [50, 100, 200, 300, 400, 500],
            },

            mcount: 0,
            ccount: 0,
            dcount: 0,
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
        let user = JSON.parse(localStorage.getItem("user"));
        // For CPU role
        if (user.role_id == 3 || user.role_id == 2) {
            this.deodisable = true;
        }

        if (user.role_id == 3 || user.role_id == 2) {
            this.ishide = false;
        }
        if (user.role_id == 1) {
            this.ishidestatus = true;
            this.headers = this.headertwo;
        } else {
            this.headers = this.headerone;
        }
        this.GetRoleList();
        this.GetMinistryAccount();
    },
    methods: {
        ChangeStatus(item) {
            var vm = this;
            this.$confirm("Are you sure you want to change this status?", {
                title: "Status",
                color: "primary",
            }).then((res) => {
                if (res) {
                    AccountService.SuspendUserAccount(item).then((result) => {
                        if (result.data.success) {
                            vm.GetAllData();
                        }
                    });
                } else {
                    item.status = true;
                }
            });
        },

        GetRoleList() {
            var vm = this;
            DropDownService.GetRoleByNotDefault().then((result) => {
                vm.rolelist = result.data;
            });
        },
        GetMinistryAccount() {
            var vm = this;
            DropDownService.GetMinistryAccount().then((result) => {
                vm.ministrylist = result.data;
            });
        },
        ShowMinistryAccountDialog() {
            this.$refs.MinistryAccountEntryModal.GetMinistry();
            this.$refs.MinistryAccountEntryModal.dialog = true;
        },
        ShowCPUAccountDialog() {
            this.$refs.CPUAccountEntryModal.GetMinistryAccount();
            this.$refs.CPUAccountEntryModal.dialog = true;
        },
        ShowDEOAccountDialog() {
            this.$refs.DEOAccountEntryModal.GetStateDivision();
            this.$refs.DEOAccountEntryModal.GetMinistry();
            this.$refs.DEOAccountEntryModal.dialog = true;
        },
        NewMinistryAccount() {
            this.$refs.MinistryAccountEntryModal.disableReset = false;
            this.ShowMinistryAccountDialog();
        },
        NewCpuAccount() {
            this.$refs.CPUAccountEntryModal.disableReset = false;
            this.ShowCPUAccountDialog();
        },
        NewDeoAccount() {
            this.$refs.DEOAccountEntryModal.disableministryandcpu = false;
            let user = JSON.parse(localStorage.getItem("user"));
            if (user.role_id == 3) {
                this.$refs.DEOAccountEntryModal.disableministryandcpu = true;
                this.$refs.DEOAccountEntryModal.account.parent_minid = user.parent_id;
                this.$refs.DEOAccountEntryModal.GetCPUAccount(user.parent_id);
                this.$refs.DEOAccountEntryModal.account.parent_id = user.id;
                this.$refs.DEOAccountEntryModal.GetUserName(user.id);
            }
            this.$refs.DEOAccountEntryModal.districtlist = [];
            this.$refs.DEOAccountEntryModal.townshiplist = [];
            this.$refs.DEOAccountEntryModal.cpuaccountlist = [];
            this.$refs.DEOAccountEntryModal.disableReset = false;
            this.ShowDEOAccountDialog();
        },
        ShowChangePasswordDialog(item) {
            AccountService.GetById(item.id).then((result) => {
                this.$refs.ChangePasswordModal.account = result.data;
                this.$refs.ChangePasswordModal.isshowcurrentpassword = false;
                this.$refs.ChangePasswordModal.dialog = true;
            });
        },
        GetAllData() {
            var vm = this;
            vm.loading = true;
            vm.isDisabled = true;
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

            if (params.sortBy) {
                params.sortBy = params.sortBy[0];
            }
            //params.sortBy = params.sortBy[0];
            AccountService.GetAll(params, vm.account).then(
                (response) => {
                    vm.itemlist = [];
                    response.data.models.data.forEach(function (item) {
                        vm.itemlist.push(item);
                    });
                    // response.data.models.data.forEach(function (item) {
                    //   vm.itemlist.push(item);
                    // });
                    vm.mcount = response.data.mcount;
                    vm.ccount = response.data.ccount;
                    vm.dcount = response.data.dcount;
                    vm.totalclass = response.data.models.recordsTotal;
                    if (response.data.success == false) {
                        vm.snackbar = true;
                        vm.color = "red";
                        vm.text = response.data.messages[0];
                    }
                    vm.loading = false;
                    vm.isDisabled = false;
                },
                (error) => {
                    console.error(error);
                }
            );
        },
        Edit(item) {
            AccountService.GetById(item.id).then((result) => {
                //  Ministry Account
                if (result.data.role_id == 2) {
                    this.$refs.MinistryAccountEntryModal.account = result.data;
                    this.$refs.MinistryAccountEntryModal.disableDropdown = true;
                    this.$refs.MinistryAccountEntryModal.disableReset = true;
                    this.ShowMinistryAccountDialog();
                }
                //  CPU Account
                if (result.data.role_id == 3) {
                    this.$refs.CPUAccountEntryModal.account = result.data;
                    this.$refs.CPUAccountEntryModal.disableDropdown = true;
                    this.$refs.CPUAccountEntryModal.disableReset = true;
                    this.ShowCPUAccountDialog();
                }
                //  DEO Account
                if (result.data.role_id == 4) {
                    this.$refs.DEOAccountEntryModal.account = result.data;
                    if (result.data.location_state > 0) {
                        this.$refs.DEOAccountEntryModal.GetDistrict();
                    }
                    if (result.data.location_district > 0) {
                        this.$refs.DEOAccountEntryModal.GetTownship();
                    }
                    if (result.data.parent_id > 0) {
                        this.$refs.DEOAccountEntryModal.GetCPUAccount(result.data.parent_minid);
                    }
                    this.$refs.DEOAccountEntryModal.disableDropdown = true;
                    this.$refs.DEOAccountEntryModal.disableministryandcpu = true;
                    this.$refs.DEOAccountEntryModal.disableReset = true;
                    this.ShowDEOAccountDialog();
                }
            });
        },
        ResetFilter() {

            // this.account.role_id=0;
            // this.account.search="";
            // this.account.fromdate="";
            // this.account.todate="";
            // this.account.ministry_id;
            this.pagination = {
                descending: true, //sort order
                page: 1, //current
                itemsPerPage: 50,
                pageStart: 1, //skip
                pageStop: null, //length
                // pageCount: 0,
                sortBy: ["id"], //default sort column
            };

            this.account = [];
            this.GetAllData();

        },
        Filter() {
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
