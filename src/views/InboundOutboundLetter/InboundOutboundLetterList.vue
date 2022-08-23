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
            <v-card :disabled="isDisabled" class="">
                <v-card-title>ဝင်စာ/ထွက်စာများ</v-card-title>
                <v-divider></v-divider>
                <v-col cols="12" md="12">
                    <v-row dense class="mb-n5">
                        <v-col cols="12" md="2">
                            <!-- <router-link :to="{ path: '/InboundOutboundLetterList/InboundOutboundLetterEntry' }">
                  <v-btn class="mt-1" small outlined color="primary" ><v-icon left>mdi-plus-circle</-icon> Create New</v-btn>
                </router-link> -->
                            <v-btn v-if="!ishidecreatebtn" @click="newItem()" class="mt-1" small outlined color="indigo">
                                <v-icon left>mdi-plus-circle</v-icon>Create New
                                <InboundOutboundLetterEntry v-on:getData="GetAllData" ref="InboundOutboundLetterEntryModal" />
                            </v-btn>
                        </v-col>
                        <v-col cols="12" md="10">
                            <v-row dense>
                                <v-col cols="12" md="3">
                          <date-picker
                          v-model="fromdate"
                            valueType="YYYY-MM-DD"
                            format="DD/MM/YYYY"
                            :editable="true"
                            placeholder="Created Date(From)"
                            clearable
                          ></date-picker>
                        </v-col>
                        <v-col cols="12" md="3">
                          <date-picker
                          v-model="todate"
                            valueType="YYYY-MM-DD"
                            format="DD/MM/YYYY"
                            :editable="true"
                            placeholder="Created Date(To)"
                            clearable
                          ></date-picker>
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

                    <v-data-table :disable-sort="isDisabled" :headers="headers" :items="itemlist" :options.sync="pagination" :server-items-length="total" :footer-props="footerProps">
                        <template v-slot:item="row">
                            <!-- <tr @mouseover="c_index = row.index" @mouseleave="c_index = -1"> -->
                            <tr>
                                <td>
                                    <!-- <v-icon color="success" right v-show="row.index == c_index"
                      >mdi-eye</v-icon
                    > -->
                                    <router-link :to="{
                        path: '/InboundOutboundLetterList/InboundOutboundLetterDetail',
                        query: {chatting_id: row.item.chat_id }
                      }">
                                        <!-- <v-icon class="mr-2 mt-n2" color="success">mdi-email-open</v-icon> -->
                                        <v-badge class="mt-3" color="warning darken-1" v-if="row.item.countfornunread>0" :content="row.item.countfornunread">
                                            <v-icon class="mt-n2" color="warning">mdi-email</v-icon>
                                        </v-badge>
                                        <v-icon v-if="row.item.countfornunread==0" class="mt-n2" color="warning">mdi-email</v-icon>
                                    </router-link>
                                </td>
                                <td v-if="!ishidecreatebtn">{{ row.item.receiver }}</td>
                                <td>{{ row.item.created_date }}</td>
                                <td>{{ row.item.description }}</td>
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
import InboundOutboundLetterEntry from "../InboundOutboundLetter/InboundOutboundLetterEntry.vue";
import InboxOutboxService from "../../services/inboxoutbox.service";
import DropDownService from "../../services/dropdownservice";

export default {
    components: {
        InboundOutboundLetterEntry,
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
    data() {
        return {
            isExactActive: true,
            //c_index: -1,
            isDisabled: true,
            loading: false,
            ishidecreatebtn: true,
            dialog: false,
            showMessages: true,
            disabletouserlist: false,
            touserlist: [],
            headers: [],
            search: "",
            fromdate:"",
            todate:"",
            headerforCpu: [{
                    text: "Unread Message",
                    align: "start",
                    sortable: false,
                    value: "iron",
                    width: "50",
                },
                {
                    text: "DEO ACCOUNTS",
                    sortable: false,
                    width: "100"
                },
                {
                    text: "Created Date",
                    sortable: false,
                    width: "150"
                },
                {
                    text: "DESCRIPTION",
                    value: "description",
                    width: "300"
                },
            ],
            headerforDeo: [{
                    text: "Unread Message",
                    align: "start",
                    sortable: false,
                    value: "iron",
                    width: "50",
                },
                {
                    text: "Created Date",
                    sortable: false,
                    width: "100"
                },
                {
                    text: "DESCRIPTION",
                    value: "description",
                    width: "300"
                },
            ],
            footerProps: {
                "items-per-page-options": [50,100,200,300,400,500],
            },
            itemlist: [],
            pagination: {
                descending: true,
                page: 1,
                itemsPerPage: 50,
                pageStart: 1,
                pageStop: null,
                sortBy: ["id"],
            },
        };
    },
    computed: {
        messages() {
            return this.showMessages ? ["Active"] : undefined;
        },
        params(nv) {
            console.log(nv);
            return {
                ...this.pagination,
            };
        },
    },
    created() {
        this.$emit("eventname", true);
        let user = JSON.parse(localStorage.getItem('user'));
        // For CPU role
        if (user.role_id == 3) {
            this.headers = this.headerforCpu;
            this.ishidecreatebtn = false;
            this.disabletouserlist = true;
            this.GetDEO();
        }
        if (user.role_id == 4) {
            this.headers = this.headerforDeo;
        }
        //this.GetAllData();
    },
    methods: {
        GetDEO() {
            var vm = this;
            DropDownService.GetDEOAccount().then((result) => {
                vm.touserlist = result.data;
                // vm.touserlist.splice(0, 0, {
                //     id: 0,
                //     username: "All DEO",
                // });
            })
        },
        newItem() {
            this.$refs.InboundOutboundLetterEntryModal.inboxoutbox.description = "";
            this.$refs.InboundOutboundLetterEntryModal.inboxoutbox.file = null;
            this.$refs.InboundOutboundLetterEntryModal.inboxoutbox.receiver = [];
            if (this.disabletouserlist == true) {
                this.$refs.InboundOutboundLetterEntryModal.touserlist = this.touserlist;
                this.$refs.InboundOutboundLetterEntryModal.inboxoutbox.ismaindescription = this.disabletouserlist;
                this.$refs.InboundOutboundLetterEntryModal.disabletouserlist = this.disabletouserlist
            }
            this.$refs.InboundOutboundLetterEntryModal.dialog = true;
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
            // params.descending = params.sortDesc[0];
            if (params.descending == true) {
                params.sortOrder = "desc";
            } else {
                params.sortOrder = "asc";
            }
            params.sortBy = params.sortBy[0];
            InboxOutboxService.GetAll(params,this.fromdate,this.todate).then(result => {
                vm.itemlist = result.data.data;
                vm.total = result.data.recordsTotal;

                vm.loading = false;
                vm.isDisabled = false;
            })
            vm.loading = false;
        },

        ResetFilter() {
            this.search = "";
            this.fromdate="";
            this.todate="";
            this.GetAllData();
        },
        Filter() {
            this.params.itemsPerPage = 10;
            this.params.page = 1;
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
