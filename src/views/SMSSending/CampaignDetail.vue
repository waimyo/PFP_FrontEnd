<style scoped>
.sub {
    float: left;
    margin-top: -10px;
}
</style>
<template>
<div>
    <v-snackbar class="pt-0" :color="color" v-model="snackbar" :right="x" :timeout="timeout" :top="y">
        {{ text }}
        <template v-slot:action="{ attrs }">
            <v-btn color="white" text v-bind="attrs" @click="snackbar = false;">
                <v-icon>mdi-close-circle</v-icon>
            </v-btn>
        </template>
    </v-snackbar>
    <v-col cols="12" md="12">
        <v-progress-linear :active="loading" rounded indeterminate absolute top height="3" color="warning"></v-progress-linear>

        <v-row dense>
            <v-col cols="12" md="6">

                <router-link :to="{ name: 'CampaignList' }">
                    <v-icon color="primary" class="mt-n2">mdi-arrow-left-bold-box</v-icon>
                </router-link>

                <v-card :disabled="isDisabled" style="border-top: 3px solid #fbba00">
                    <v-card-title>အကျဉ်းချုပ်</v-card-title>
                    <v-divider></v-divider>
                    <v-col cols="12" md="12">
                        <v-simple-table style="overflow: auto; width: 100%">
                            <template v-slot:default>
                                <tbody>
                                    <tr>
                                        <th style="width: 50%" class="text-left">ကမ်ပိန်းအမှတ်စဉ်</th>
                                        <td style="width: 50%">{{ campdetail.Id }}</td>
                                    </tr>
                                    <tr>
                                        <th style="width: 50%" class="text-left">ကမ်ပိန်းအမည်</th>
                                        <td style="width: 50%">{{ campdetail.Name }}</td>
                                    </tr>

                                    <tr>
                                        <th style="width: 50%" class="text-left">ကမ်ပိန်းအခြေအနေ</th>
                                        <td style="width: 50%">{{campdetail.Status }}
                                            <v-btn v-if="issuperadmin===false && campaignstatus=='Open'" class small outlined color="error" @click="CloseCampaign()">Close</v-btn>
                                        </td>

                                    </tr>
                                    <tr>
                                        <th style="width: 50%" class="text-left">ပေးပို့ခဲ့သည့်မက်ဆေ့ချ်စာသား</th>
                                        <td style="width: 50%">{{campdetail.SmsMessage }}</td>
                                    </tr>
                                    <tr>
                                        <th style="width: 50%" class="text-left">အပိတ်မက်ဆေ့ချ်</th>
                                        <td style="width: 50%">{{ campdetail.ClosingMessage }}</td>
                                    </tr>
                                    <tr>
                                        <th style="width: 50%" class="text-left">ကမ်ပိန်းစတင်ချိန်</th>
                                        <td style="width: 50%">{{ campdetail.StartTime }}</td>
                                    </tr>
                                    <tr>
                                        <th style="width: 50%" class="text-left">ကမ်ပိန်းပြီးဆုံးချိန်</th>
                                        <td style="width: 50%">{{ campdetail.EndTime }}</td>
                                    </tr>
                                    <tr>
                                        <th style="width: 50%" class="text-left">အုပ်စုအမှတ်စဉ်</th>
                                        <td style="width: 50%">{{ campdetail.GroupNo }}</td>
                                    </tr>
                                    <tr>
                                        <th style="width: 50%" class="text-left">ကမ်ပိန်းပါအချက်အလက်များကိုအောက်ပါဇယားမှ ဒေါင်းလုပ်ရယူပါ။</th>
                                        <td style="width: 50%">Please download from the feedback table below.</td>
                                    </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </v-col>
                </v-card>
            </v-col>
            <v-col cols="12" md="6">
                <v-card class="mt-6" :disabled="isDisabled" style="border-top: 3px solid #fbba00">
                    <v-card-title>ကမ်ပိန်းဆိုင်ရာအချက်အလက်အကျဉ်းချုပ်</v-card-title>
                    <v-divider></v-divider>
                    <v-col cols="12" md="12">
                        <v-row dense>
                            <v-col cols="12" md="4">
                                <v-icon large>mdi-account-settings</v-icon>
                                <h4 class="mb-n5 mt-3">{{campdetail.TotalParticipantCount}}</h4>
                                <v-text-field dense disabled></v-text-field>
                                <h5 class="sub">ကမ်ပိန်းတွင်ပါဝင်သူစုစုပေါင်းဦးရေ</h5>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-icon large>mdi-message-text-outline</v-icon>
                                <h4 class="mb-n5 mt-3">{{campdetail.ResponseCount}}</h4>
                                <v-text-field dense disabled></v-text-field>
                                <h5 class="sub">တုန့်ပြန်မှုအရေအတွက်</h5>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-icon large>mdi-ticket-percent</v-icon>
                                <h4 class="mb-n5 mt-3">{{campdetail.ResponsePercent}}
                                </h4>
                                <v-text-field dense disabled></v-text-field>
                                <h5 class="sub">တုန့်ပြန်မှုရာခိုင်နှုန်း</h5>
                            </v-col>
                        </v-row>

                        <v-row dense class="mt-3">
                            <v-col cols="12" md="4">
                                <v-icon large>mdi-barcode</v-icon>
                                <h4 class="mb-n5 mt-3">{{campdetail.CategorizedResponseCount}}</h4>
                                <v-text-field dense disabled></v-text-field>
                                <h5 class="sub">အမျိုးအစားအလိုက်စုစည်းထားသည့် တုန့်ပြန်မှုများ</h5>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-icon large>mdi-signal-off</v-icon>
                                <h4 class="mb-n5 mt-3">{{campdetail.UncategorizedResponseCount}}</h4>
                                <v-text-field dense disabled></v-text-field>
                                <h5 class="sub">အမျိုးအစားအလိုက် မစုစည်းရသေးသည့် တုန့်ပြန်မှုများ</h5>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-icon large>mdi-microphone-off</v-icon>
                                <h4 class="mb-n5 mt-3">{{campdetail.NotReplyCount}}</h4>
                                <v-text-field dense disabled></v-text-field>
                                <h5 class="sub">ပြန်စာမပေးပို့သူများ</h5>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-card>
            </v-col>

            <v-col cols="12" md="6">
                <v-card :disabled="isDisabled" style="border-top: 3px solid #fbba00">
                    <v-card-title>Categorization Status</v-card-title>
                    <v-divider></v-divider>
                    <v-col cols="12" md="12">
                        <zingchart style="height:250px" :data="categorization_status_data" :series="categorization_status_series"></zingchart>
                    </v-col>
                </v-card>
            </v-col>
            <v-col cols="12" md="6">
                <v-card :disabled="isDisabled" style="border-top: 3px solid #fbba00">
                    <v-card-title>Categories Ratio</v-card-title>
                    <v-divider></v-divider>
                    <v-col cols="12" md="12">
                        <zingchart style="height:250px" :data="categorization_ratio_data" :series="categoryratio"></zingchart>

                    </v-col>
                </v-card>
            </v-col>
        </v-row>

        <v-card class="mt-1" :disabled="isDisabled">
            <v-card-title>အသေးစိတ်ကြည့်ရှုရန်</v-card-title>
            <v-divider></v-divider>
            <v-col cols="12" md="12">
                <v-row dense class="mb-n5">
                    <v-col cols="12" md="6">
                        <!-- <v-btn class="mt-1" small outlined color="success" @click="ExcelReport">
                            <v-icon left>mdi-export</v-icon>Excel Export
                        </v-btn>
                        <a href="#" id="mylink"></a> -->

                        <v-btn
                            class="mt-1"
                            :loading="excelloading"
                            :disabled="excelloading"
                            small
                            outlined
                            color="success"
                            @click="ExcelReport"
                            ><v-icon left>mdi-export</v-icon> Export Excel
                            <span slot="loader" class="custom-loader">
                              <v-icon light>mdi-cached</v-icon>
                            </span></v-btn
                          >
                          <a href="#" id="mylink"></a>

                          <v-btn
              v-show="udata.role_id != 1"
               :disabled="disab"
               @click="newItem()" 
                    small
                    outlined
                    dense
                    color="warning"
                    >ဖုန်းနံပါတ်အုပ်စုအသစ်ထည့်ရန် <GroupEntry ref="GroupEntryModal"
              /></v-btn
                  >

                    </v-col>
                    <v-col cols="12" md="6">
                        <v-row dense>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="search" placeholder="ရှာဖွေရန်" append-icon="mdi-magnify" outlined dense autocomplete="off"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-btn class="mr-2" small outlined color="primary" @click="Filter">ရှာမည်</v-btn>
                                <v-btn class small outlined color="error" @click="ResetFilter">ပြန်လည်ရွေးချယ်မည်</v-btn>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>

                <v-data-table  
                v-model="selected"
                item-key="datainfo_id"
                :show-select="udata.role_id == 1 ? false : true" 
                :disable-sort="isDisabled" 
                :headers="headers" 
                :items="detailist" 
                :options.sync="pagination" 
                :server-items-length="totaldetail" 
                :footer-props="footerProps">
                </v-data-table>
                
                    <template v-slot:item="row">
                        <tr>
                            <td>{{ row.item.status }}</td>
                            <td>{{ row.item.name }}</td>
                            <td>{{ row.item.mobile }}</td>
                            <td>{{ row.item.departmentname }}</td>
                            <td>{{ row.item.gender }}</td>
                            <td>{{ row.item.smsmessage }}</td>
                            <td>{{ row.item.responsemessage }}</td>
                            <td>{{ row.item.categorizedresponse }}</td>                            
                            <td>{{ row.item.responsemessagetime }}</td>
                            <td>{{ row.item.township }}</td>
                        </tr>
                    </template>
                    
            </v-col>
        </v-card>
    </v-col>
</div>
</template>

<script>
/*eslint-disable*/
import CampaignDetail from '../../models/campaigndetail';
import CampaignEntry from '../../models/campaignsentry';
import CampaignService from '../../services/campaignservice';
import GroupEntry from "../SMSSending/GroupFromCampaign.vue";
import $ from "jquery";
export default {
    components: {
        GroupEntry,
  },
    data() {
        return {
            excelloading: false,
            issuperadmin: false,
            categorization_status_series: [],
            categorization_status_data: {
                type: "pie",
                height: "250px",
                legend: {
                    adjustLayout: true,
                    x: "60%",
                    y: "25%",
                    "margin-top": "20%",
                    "margin-right": "20%",
                    "border-width": 0,
                    "border-color": "gray",
                    "border-radius": "5px",
                    icon: {
                        "line-color": "#9999ff",
                    },
                },
                plotarea: {
                    adjustLayout: true,
                    "margin-right": "25%",
                },
                plot: {
                    "value-box": {
                        text: "%v",
                        "font-size": 14,
                        "font-family": "Georgia",
                        "font-weight": "normal",
                        placement: "in",
                        "font-color": "white",
                    },
                    tooltip: {
                        text: "%t",
                    },
                    "border-width": 1,
                    "border-color": "#cccccc",
                },
            },
            categorization_ratio_data: {
                type: "ring",
                height: "250px",
                legend: {
                    adjustLayout: true,
                    x: "67%",
                    y: "25%",
                    "margin-top": "20%",
                    "margin-right": "20%",
                    "border-width": 0,
                    "border-color": "gray",
                    "border-radius": "5px",
                    icon: {
                        "line-color": "#9999ff",
                    },
                },
                plotarea: {
                    adjustLayout: true,
                    "margin-right": "15%",
                },
                plot: {
                    "value-box": {
                        text: "%v",
                        "font-size": 14,
                        "font-family": "Georgia",
                        "font-weight": "normal",
                        placement: "in",
                        "font-color": "white",
                    },
                    tooltip: {
                        text: "%t",
                    },
                    "border-width": 1,
                    "border-color": "#cccccc",
                }
            },
            snackbar: false,
            color: "",
            text: "",
            x: "right",
            y: "top",
            loading: false,
            isDisabled: false,
            showMessages: true,
            campdetail: new CampaignDetail(),
            campentry: new CampaignEntry(),
            search: "",
            udata: [],
            disab : true,
            headers: [
            {
                    text: "Status",
                    value: "status",
                    width: "150"
                },
                {
                    text: "အမည်",
                    value: "name",
                    width: "100"
                },
                {
                    text: "မိုဘိုင်းဖုန်းနံပါတ်",
                    value: "mobile",
                    width: "150"
                },
                {
                    text: "ဌာန/အဖွဲ့အစည်း",
                    value: "departmentname",
                    width: "150"
                },
                {
                    text: "ကျား/မ",
                    value: "gender",
                    width: "100"
                },  
                {
                    text: "ပေးပို့ခဲ့သည့် မက်ဆေ့ချ်",
                    value: "smsmessage",
                    width: "500"
                },              
                {
                    text: "ပြန်စာ",
                    value: "responsemessage",
                    width: "100"
                },
                {
                    text: "တုန့်ပြန်မှုအမျိုးအစား",
                    value: "categorizedresponse",
                    width: "200"
                },                
                {
                    text: "ပြန်စာပေးပို့သည့်အချိန်",
                    value: "responsemessagetime",
                    width: "150"
                },                
                {
                    text: "မြို့နယ်",
                    value: "township",
                    width: "150"
                },
            ],
            detailist: [],
            totaldetail: 0,
            selected: {"id":null},
            pagination: {
                descending: true, //sort order
                page: 1, //current
                itemsPerPage: 50,
                pageStart: 1, //skip
                pageStop: null, //length
                // pageCount: 0,
                sortBy: ["id"], //default sort column,
                campid: 0,
            },
            footerProps: {
                "items-per-page-options": [50,100,200,300,400,500],
            },
        };
    },
    watch: {
        params: {
            handler() {
                this.GetDetail();
            },
            deep: true
        },
        selected(val) {
      var rowcount = val.length;   
      if (rowcount > 0) {
        this.disab = false;
      } else {
        this.disab = true;
      }
    },
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
        campaignstatus: function () {

            return this.campdetail.Status;
        },
        categoryratio: function () {

            if (this.campdetail.CategorizedResponseCount > 0 && this.campdetail.UncategorizedResponseCount > 0) {
                return [{
                        values: [this.campdetail.CategorizedResponseCount],
                        text: "Categorized",
                        "background-color": "#9ACD32"
                    },
                    {
                        values: [this.campdetail.UncategorizedResponseCount],
                        text: "UnCategorized",
                        "background-color": "#4682B4"
                    }
                ];
            } else if (this.campdetail.CategorizedResponseCount > 0) {
                return [{
                    values: [this.campdetail.CategorizedResponseCount],
                    text: "Categorized",
                    "background-color": "#9ACD32"
                }];
            }
            if (this.campdetail.UncategorizedResponseCount > 0) {
                return [{
                    values: [this.campdetail.UncategorizedResponseCount],
                    text: "UnCategorized",
                    "background-color": "#4682B4"
                }];
            } else {
                return [];
            }

        }
    },
    created() {
        this.$emit("eventname", true);
        this.udata = JSON.parse(localStorage.getItem("user"));
        this.pagination.campid = this.$route.query.campaignid;
        if (this.$store.state.auth.user.role_id == 1) {
            this.issuperadmin = true;
        } else {
            this.issuperadmin = false;
        }

    },
    methods: {
        GetDetail() {
            if (this.pagination.campid > 0) {
                var vm = this;
                vm.loading = true;
                vm.isDisabled = true;

                let params = vm.params;
                params.pageStop = params.itemsPerPage;
                params.pageStart = params.page == 1 ? 0 : params.itemsPerPage * (params.page - 1);
                if (this.search == "ကျား") {
                    params.search = "True";
                } else if (this.search == "မ") {
                    params.search = "False";
                } else {
                    params.search = this.search;
                }

                params.draw = this.draw;
                params.descending = params.sortDesc[0];

                if (params.descending == true) {
                    params.sortOrder = "desc";
                } else {
                    params.sortOrder = "asc";
                }
                params.sortBy = params.sortBy[0];
                CampaignService.GetCampaignDetail(this.pagination.campid, params).then(
                    result => {
                        //for  detail and count
                        vm.campdetail = result.data.detail;
                        vm.campdetail.ResponsePercent += "%";
                        vm.detailist = [];
                        //for tables
                        result.data.camplist.data.forEach(function (item) {
                            vm.detailist.push(item);
                        });
                        //for categorization status
                        vm.categorization_status_series = [];
                        result.data.categorizationstatuslist.forEach((element) => {
                            var color = "";
                            if (element.Category == "အသေးစားအဂတိလိုက်စားမှု") {
                                color = "#B22222";
                            }
                            if (element.Category == "ကျေနပ်မှုရှိ") {
                                color = "purple";
                            }
                            if (element.Category == "ကျေးဇူးတင်ကြောင်းဖြေကြားခြင်း") {
                                color = "#4682B4";
                            }

                            var data = {
                                values: [element.Sms_Reply_Count],
                                text: element.Category,
                                "background-color": color,
                                opacity: 0.9
                            };
                            vm.categorization_status_series.push(data);

                        });

                        vm.loading = false;
                        vm.isDisabled = false;
                        vm.totaldetail = result.data.camplist.recordsTotal;

                    }
                );
            }

        },
        ExcelReport() {
            var vm = this;
            vm.loading = true;
            vm.isDisabled = true;
            vm.excelloading = true;
            let params = vm.params;
            params.pageStop = params.itemsPerPage;
            params.pageStart = params.page == 1 ? 0 : params.itemsPerPage * (params.page - 1);
            params.search = this.search;

            params.draw = this.draw;
            params.descending = params.sortDesc[0];

            if (params.descending == true) {
                params.sortOrder = "desc";
            } else {
                params.sortOrder = "asc";
            }
            params.sortBy = params.sortBy[0];

            CampaignService.ExportToExcel(this.pagination.campid, params).then(
                (res) => {
                    const url = window.URL.createObjectURL(new Blob([res.data]));

                    $("#mylink").attr("href", url);
                    $("#mylink").attr("download", "file.xls");
                    $("#mylink")[0].click();
                    vm.loading = false;
                    vm.isDisabled = false;
                    vm.excelloading = false;
                }
            );
        },
        Filter() {
            this.params.itemsPerPage = 50;
            this.params.page = 1;

            this.GetDetail();
        },

        ResetFilter() {
            this.search = "";
            this.GetDetail();
        },

        CloseCampaign() {
            this.campentry.Id = this.pagination.campid;
            CampaignService.CloseCampaign(this.campentry).then(
            result => {
            if (result.data.success) {
            this.GetDetail();
            this.color = "success";
            this.text = "Campaign Closed!";
            this.snackbar = true;
            } else {}
            });
        },

        newItem() {
      this.$refs.GroupEntryModal.dialog = true;
      this.$refs.GroupEntryModal.datainfolist = this.selected;
    },
    }
};
</script>
