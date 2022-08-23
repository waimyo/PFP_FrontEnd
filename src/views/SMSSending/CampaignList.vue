<style scoped>
.theme--light.v-subheader.sub {
    float: left;
    margin-top: -35px;
}
</style>
<template>
<div>
    <div v-show="isExactActive">
        <v-progress-linear :active="loading" rounded indeterminate absolute top height="3" color="warning"></v-progress-linear>

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
                                            <v-col cols="12" md="4">
                                                <v-text-field v-model="campfilter.Name" outlined dense placeholder="ကမ်ပိန်းအမည်"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" md="4">
                                                <v-autocomplete v-model="campfilter.Status" :items="campaignstatuslist" item-text="name" item-value="value" outlined dense placeholder="ကမ်ပိန်းအခြေအနေရွေးချယ်ပါ" clearable></v-autocomplete>
                                            </v-col>
                                            <v-col cols="12" md="4">
                                                <v-text-field v-model="campfilter.SmsMessage" outlined dense placeholder="ပေးပို့ခဲ့သည့်မက်ဆေ့ချ်စာသား"></v-text-field>

                                            </v-col>
                                        </v-row>

                                        <v-row dense>
                                            <v-col cols="12" md="4">
                                                <v-text-field v-model="campfilter.GroupNo" outlined dense placeholder="အုပ်စုအမှတ်စဉ်"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" md="4">
                                                <date-picker v-model="campfilter.CreatedDateFrom" valueType="YYYY-MM-DD" format="DD/MM/YYYY" :editable="true" placeholder="Created Date(From)"></date-picker>
                                            </v-col>
                                            <v-col cols="12" md="4">
                                                <date-picker v-model="campfilter.CreatedDateTo" valueType="YYYY-MM-DD" format="DD/MM/YYYY" :editable="true" placeholder="Created Date(To)"></date-picker>
                                            </v-col>

                                        </v-row>

                                        <v-row dense>
                                            <v-col cols="12" md="4" v-if="issuperadmin">
                                                <v-autocomplete v-model="campfilter.MinistryId" :items="ministryacclist" item-text="ministry.name" item-value="id" outlined dense placeholder="ဝန်ကြီးဌာနကိုရွေးချယ်ပါ" @change="GetAllCPU()"></v-autocomplete>

                                            </v-col>
                                            <v-col cols="12" md="4" v-if="issuperadmin">
                                                <v-autocomplete v-model="campfilter.CreatedUserId" outlined dense :items="userlist" item-text="username" item-value="id" placeholder="Select CPU">
                                                </v-autocomplete>

                                            </v-col>
                                            <v-col align="right">
                                                <v-btn small outlined color="primary" class="mr-2" @click="Filter()">ရှာမည်</v-btn>
                                                <v-btn small outlined color="error" @click="ResetFilter()">ပြန်လည်ရွေးချယ်မည်</v-btn>
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
                <v-card-title>ကမ်ပိန်းအားလုံးကြည့်ရန်</v-card-title>
                <v-divider></v-divider>
                <v-col cols="12" md="12">
                    <v-data-table :disable-sort="isDisabled" :headers="headers" :items="campaignlist" :search="search" :options.sync="pagination" :server-items-length="totalcampaign" :footer-props="footerProps">
                        <template v-slot:item="row">
                            <tr>
                                <td>
                                    <router-link :to="{ path: '/CampaignList/CampaignDetail',query: {
                                    campaignid: row.item.Id} }">
                                        <v-btn small outlined dense color="success">အသေးစိတ်ကြည့်ရှုမည်</v-btn>
                                    </router-link>
                                </td>

                                <td>{{ row.item.Id }}</td>
                                <td>{{ row.item.CampaignCreatedBy }}</td>
                                <td>{{ row.item.CampaignName }}</td>
                                <td>{{ row.item.CampaignStatus }}</td>
                                <td>{{ row.item.SmsMessage }}</td>
                                <td>{{ row.item.ClosingMessage }}</td>
                                <td>{{ row.item.GroupName }}</td>
                                <td>{{ row.item.StartTimeEndTime }}</td>
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
/*eslint-disable*/
import CampaignService from '../../services/campaignservice';
import DropDownService from '../../services/dropdownservice';
import CampaignFilterModel from '../../models/campaignlistfilter';

export default {
    data() {
        return {
            issuperadmin: false,
            isDisabled: true,
            loading: true,
            isExactActive: true,
            showMessages: true,
            headers: [{
                    text: "အသေးစိတ်ကြည့်ရှုရန်",
                    value: "viewdetail",
                    width: "180",
                    sortable: false
                },
                {
                    text: "ကမ်းပိန်းအမှတ်စဉ်",
                    value: "campaignserialno",
                    width: "150"
                },
                {
                    text: "ကမ်ပိန်းပြုလုပ်ခဲ့သည့်အဖွဲ့",
                    value: "createdbyname",
                    width: "200"
                },
                {
                    text: "ကမ်ပိန်းအမည်",
                    value: "campaignname",
                    width: "150"
                },
                {
                    text: "ကမ်းပိန်းအခြေအနေ",
                    value: "status",
                    width: "150"
                },
                {
                    text: "ပေးပို့ခဲ့သည့်မက်ဆေ့ချ်စာသား",
                    value: "smsmessage",
                    width: "200"
                },
                {
                    text: "အပိတ်မက်ဆေ့ချ်",
                    value: "closingmessage",
                    width: "130"
                },
                {
                    text: "အုပ်စုအမှတ်စဉ်",
                    value: "groupname",
                    width: "150"
                },
                {
                    text: "ကမ်ပိန်းစတင်ချိန်/ပြီးဆုံးချိန်",
                    value: "starttimeendtime",
                    width: "200"
                },
            ],
            campfilter: new CampaignFilterModel(),
            totalcampaign: 0,
            campaignlist: [],
            ministryacclist: [],
            userlist: [],
            campaignstatuslist: [{
                name: "Open",
                value: "true"
            }, {
                name: "Closed",
                value: "false"
            }],

            pagination: {
                descending: true, //sort order
                page: 1, //current
                itemsPerPage: 50,
                pageStart: 1, //skip
                pageStop: null, //length
                // pageCount: 0,
                sortBy: ["id"] //default sort column
            },
            footerProps: {
                "items-per-page-options": [50,100,200,300,400,500],
            },
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
            deep: true
        }
    },
    computed: {
        params(nv) {
            return {
                ...this.pagination
            }
        },
        messages() {
            return this.showMessages ? ["Active"] : undefined;
        },
    },
    created() {
        this.$emit("eventname", true);
        this.GetAllMinistry();
        this.GetAllCPU();

        //if login user is superadmin,show ministry,cpu dropdowns and created date
        if (this.$store.state.auth.user.role_id == 1) {
            this.issuperadmin = true;
        } else {
            this.issuperadmin = false;
        }

    },
    updated() {
        this.isExactActive = typeof this.$refs.rv === "undefined";
    },

    mounted() {
        this.isExactActive = typeof this.$refs.rv === "undefined";
    },
    methods: {
        GetAllData() {
            var vm = this;
            vm.loading = true;
            vm.isDisabled = true;
            let params = vm.params;
            params.pageStop = params.itemsPerPage;
            params.pageStart = params.page == 1 ? 0 : params.itemsPerPage * (params.page - 1);
            //params.search = this.search;

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

            CampaignService.GetAll(params, vm.campfilter).then(
                result => {
                    vm.campaignlist = [];
                    result.data.data.forEach(function (item) {

                        vm.campaignlist.push(item);
                    });
                    vm.loading = false;
                    vm.isDisabled = false;
                    vm.totalcampaign = result.data.recordsTotal;

                },
                error => {
                    console.error(error);
                }
            );
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
                },
                this.GetAllData();
        },

        ResetFilter() {
            this.campfilter = new CampaignFilterModel(),
                this.pagination = {
                    descending: true, //sort order
                    page: 1, //current
                    itemsPerPage: 50,
                    pageStart: 1, //skip
                    pageStop: null, //length
                    // pageCount: 0,
                    sortBy: ["id"], //default sort column
                },
                this.GetAllData();
        },
        GetAllMinistry() {
            DropDownService.GetMinistryAccount().then(
                response => {
                    this.ministryacclist = response.data;
                    this.ministryacclist.splice(0, 0, {
                        'id': 0,
                        'ministry.name': "All Ministries"
                    });

                }
            );
        },
        GetAllCPU() {
            DropDownService.GetAllCPUAccountByMinistry(this.campfilter.MinistryId).then(
                response => {
                    this.userlist = response.data;
                    this.userlist.splice(0, 0, {
                        id: 0,
                        username: "All CPUS"
                    });
                    this.campfilter.CreatedUserId = 0;
                }
            );

        }

    }
};
</script>
