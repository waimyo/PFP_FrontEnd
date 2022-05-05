<style scoped>
.v-list-item .v-list-item__title,
.v-list-item .v-list-item__subtitle {
    line-height: 2.2;
}

.datatableborder tbody tr td {
    border-right: thin solid rgba(0, 0, 0, 0.12);
}

.datatableborder {
    border: thin solid rgba(0, 0, 0, 0.12);
}
</style>
<template>
<div class="home">
    <v-progress-linear :active="loading" rounded indeterminate absolute top height="3" color="warning"></v-progress-linear>
    <v-col cols="12" md="12">
        <v-row dense>
            <v-col cols="12" md="12" class="mt-n1">
                <!-- <v-row dense class="mt-3"> -->
                <v-card :disabled="isDisabled">
                    <v-expansion-panels accordion v-model="palne" multiple>
                        <v-expansion-panel>
                            <v-expansion-panel-header>Data Selection Filters</v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <v-form autocomplete="off" @submit.prevent="Insert" ref="form" v-model="valid" lazy-validation>
                                    <v-row dense class>
                                        <v-col cols="12" md="3">
                                            <v-autocomplete v-model="ministry_id" item-text="ministry.name" item-value="id" autocomplete="off" :items="ministrylistnotincludetrainingForCounts" :disabled="disabledropdown" outlined dense clearable @change="OnChangeMinistryForCount" placeholder="All Ministries"></v-autocomplete>
                                        </v-col>

                                        <v-col cols="12" md="3">
                                            <v-autocomplete v-model="user_id_count" :items="userlistforcount" item-text="username" item-value="id" autocomplete="off" :disabled="disabledropdowncpu" outlined dense clearable placeholder="All CPU"></v-autocomplete>
                                        </v-col>

                                        <v-col cols="12" md="3">
                                            <date-picker v-model="fromdate" valueType="YYYY-MM-DD" format="DD/MM/YYYY" :editable="false" :clearable="false" placeholder="Select Start Date"></date-picker>
                                        </v-col>
                                        <v-col cols="12" md="3">
                                            <date-picker v-model="todate" valueType="YYYY-MM-DD" format="DD/MM/YYYY" :editable="false" :clearable="false" placeholder="Select End Date"></date-picker>
                                        </v-col>
                                        <!-- <v-row dense class="mb-n"> -->
                                        <v-col cols="12" class="text-right mt-n2">
                                            <v-btn small outlined color="primary" class="mr-2" v-on:click="OnChangeByReporDateForChart()">ရှာမည်</v-btn>
                                            <v-btn small outlined color="error" @click="ResetFilter">ပြန်လည်ရွေးချယ်မည်</v-btn>
                                        </v-col>
                                        <!-- </v-row> -->
                                    </v-row>
                                </v-form>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-card>
            </v-col>
            <!-- <v-row dense> -->
            <v-col cols="12" md="3">
                <v-card>
                    <v-col cols="12" md="12" style="background: #03a9f4 !important">
                        <v-row dense>
                            <v-col cols="12" md="2">
                                <v-icon size="40" color="white">mdi-email-outline</v-icon>
                            </v-col>
                            <v-col cols="12" md="10" class="text-right white--text">
                                <h5>စုစုပေါင်းကမ်ပိန်းအရေအတွက်</h5>
                                <h4 class="white--text" small style="float: right">{{ totalcampaigncount }}</h4>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-card>
            </v-col>
            <v-col cols="12" md="3">
                <v-card>
                    <v-col cols="12" md="12" style="background: #8bc34a !important">
                        <v-row dense>
                            <v-col cols="12" md="2">
                                <v-icon size="40" color="white">mdi-account-outline</v-icon>
                            </v-col>
                            <v-col cols="12" md="10" class="text-right white--text">
                                <h5>SMS ပေးပို့ခဲ့သည့်ပြည်သူဦးရေ</h5>
                                <h4 class="white--text" small style="float: right">{{ sentsmscount }}</h4>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-card>
            </v-col>
            <v-col cols="12" md="3">
                <v-card>
                    <v-col cols="12" md="12" style="background: #9c27b0 !important">
                        <v-row dense>
                            <v-col cols="12" md="2">
                                <v-icon size="40" color="white">mdi-checkbox-marked-outline</v-icon>
                            </v-col>
                            <v-col cols="12" md="10" class="text-right white--text">
                                <h5>SMS ပြန်ကြားလာသည့်ပြည်သူဦးရေ</h5>
                                <h4 class="white--text" small style="float: right">{{ receivedsmscount }}</h4>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-card>
            </v-col>
            <v-col cols="12" md="3">
                <v-card>
                    <v-col cols="12" md="12" style="background: #e84e40 !important">
                        <v-row dense>
                            <v-col cols="12" md="2">
                                <v-icon size="40" color="white">mdi-cash</v-icon>
                            </v-col>
                            <v-col cols="12" md="10" class="text-right white--text">
                                <h5>အသေးစားအဂတိလိုက်စားမှု</h5>
                                <h4 class="white--text" small style="float: right">{{ totalcorruptioncount }}</h4>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-card>
            </v-col>
            <!-- </v-row> -->

            <v-col cols="12" md="6">
                <v-card>
                    <v-card-title>လစဉ် ကမ်ပိန်းအရေအတွက်</v-card-title>
                    <zingchart id="campaignchart" style="height: 400px" :data="MonthlyCampaignChartData"></zingchart>
                </v-card>
            </v-col>
            <!-- </v-col> -->

            <v-col cols="12" md="6">
                <v-card>
                    <v-card-title>လစဉ် ဆက်သွယ်ခဲ့သည့် ပြည်သူဦးရေ နှင့် တုံ့ပြန်မှုအရေအတွက်</v-card-title>
                    <zingchart style="height: 400px" :data="MonthlySentAndReceivedChart"></zingchart>
                </v-card>
            </v-col>

            <v-col cols="12" md="6">
                <v-card>
                    <v-card-title>လစဉ် တုံ့ပြန်မှုနှုန်း</v-card-title>
                    <zingchart style="height: 400px" :data="MonthlyReceivedChart"></zingchart>
                </v-card>
            </v-col>
            <v-col cols="12" md="6">
                <v-card>
                    <v-card-title>လစဉ် အသေးစားအဂတိလိုက်စားမှုနှင့်စပ်လျဉ်း၍ တုံ့ပြန်မှု</v-card-title>
                    <zingchart style="height: 400px" :data="MonthlyCorruptionChart"></zingchart>
                </v-card>
            </v-col>
            <v-col cols="12" md="12">
                <v-card>
                    <v-card-title>လအလိုက်ဖြည့်သွင်းထားသော ဖုန်းနံပါတ်အရေအတွက်များ</v-card-title>
                    <zingchart style="height: 400px" :data="MonthlyPhoNoChartData"></zingchart>
                </v-card>
            </v-col>

            <v-col cols="12" md="12" v-show="show">
                <v-expansion-panels accordion v-model="panel2" multiple>
                    <v-expansion-panel>
                        <v-progress-linear :active="loadingfortelecomoperator" rounded indeterminate absolute top height="3" color="warning"></v-progress-linear>
                        <v-expansion-panel-header style="font-size: 17px;">Telecom Operator တစ်ခုချင်းစီအလိုက် SMS အရေအတွက်</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-row dense>
                                <v-col cols="12" md="3">
                                    <v-autocomplete v-model="model.ministry_acc_id" item-text="ministry.name" item-value="id" autocomplete="off" :items="ministrylist" @change="OnChangeByMinistry" outlined dense clearable placeholder="ဝန်ကြီးဌာနရွေးချယ်ပါ"></v-autocomplete>
                                    <!--v-subheader class="sub">????????????????????</v-subheader-->
                                </v-col>
                                <v-col cols="12" md="3">
                                    <v-autocomplete v-model="model.userid" :items="cpulist" item-text="username" item-value="id" autocomplete="off" outlined dense clearable placeholder="Select CPU"></v-autocomplete>
                                    <!--v-subheader class="sub">Select CPU</v-subheader-->
                                </v-col>
                                <v-col cols="12" md="3">
                                    <date-picker v-model="model.fromdate" valueType="YYYY-MM-DD" format="DD/MM/YYYY" :editable="false" :clearable="false" placeholder="Select Start Date"></date-picker>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <date-picker v-model="model.todate" valueType="YYYY-MM-DD" format="DD/MM/YYYY" :editable="false" :clearable="false" placeholder="Select Start Date"></date-picker>
                                </v-col>
                                <v-col cols="12" class="text-right mt-n1">
                                    <v-btn small outlined color="primary" class="mr-2" v-on:click="GetSmsCountByOperator()">ရှာမည်</v-btn>

                                    <v-btn small outlined color="error" @click="ResetForSmsCountByOprator">ပြန်လည်ရွေးချယ်မည်</v-btn>

                                    <!-- <v-btn class="ml-2" small outlined color="success" @click="ExcelReport">
                     <v-btn  :loading="excelloading"
                         :disabled="excelloading" class="ml-2" small outlined color="success" @click="ExcelReport">
                      <v-icon left>mdi-export</v-icon>Export Excel
                    </v-btn>
                    <a href="#" id="mylink"></a>-->

                                    <v-btn class="ml-2" :loading="excelloading" :disabled="excelloading" small outlined color="success" @click="ExcelReport">
                                        <v-icon left>mdi-export</v-icon>Export Excel
                                        <span slot="loader" class="custom-loader">
                                            <v-icon light>mdi-cached</v-icon>
                                        </span>
                                    </v-btn>
                                    <a href="#" id="mylink"></a>
                                </v-col>
                            </v-row>

                            <v-simple-table dense class="datatableborder mt-1">
                                <template v-slot:default>
                                    <thead>
                                        <tr class="font-weight-medium">
                                            <th class="text-center">Month</th>
                                            <th class="text-center" colspan="2">MPT</th>
                                            <th class="text-center" colspan="2">Ooredoo</th>
                                            <th class="text-center" colspan="2">Telenor</th>
                                            <th class="text-center" colspan="2">Mytel</th>
                                        </tr>
                                    </thead>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Incoming</th>
                                            <th>Outgoing</th>
                                            <th>Incoming</th>
                                            <th>Outgoing</th>
                                            <th>Incoming</th>
                                            <th>Outgoing</th>
                                            <th>Incoming</th>
                                            <th>Outgoing</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr v-for="item in itemlist" :key="item.month">
                                            <!-- <td>{{ item.year }}</td> -->
                                            <td>{{ item.month }}</td>
                                            <td>{{ item.mpt_sms_in }}</td>
                                            <td>{{ item.mpt_sms_out }}</td>
                                            <td>{{ item.ooredoo_sms_in }}</td>
                                            <td>{{ item.ooredoo_sms_out }}</td>
                                            <td>{{ item.telenor_sms_in }}</td>
                                            <td>{{ item.telenor_sms_out }}</td>
                                            <td>{{ item.mytel_sms_in }}</td>
                                            <td>{{ item.mytel_sms_out }}</td>
                                        </tr>
                                        <tr class="font-weight-black">
                                            <td>Total</td>
                                            <td>{{ sumField("mpt_sms_in") }}</td>
                                            <td>{{ sumField("mpt_sms_out") }}</td>
                                            <td>{{ sumField("ooredoo_sms_in") }}</td>
                                            <td>{{ sumField("ooredoo_sms_out") }}</td>
                                            <td>{{ sumField("telenor_sms_in") }}</td>
                                            <td>{{ sumField("telenor_sms_out") }}</td>
                                            <td>{{ sumField("mytel_sms_in") }}</td>
                                            <td>{{ sumField("mytel_sms_out") }}</td>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-col>
        </v-row>
    </v-col>
</div>
</template>

<script>
import DropDownService from "../services/dropdownservice";
import HomeService from "../services/Home/homeservice";
import SearchModel from "../models/home";
import $ from "jquery";

export default {
    data() {
        return {
            excelloading: false,
            panel: [0],
            panel1: [0],
            panel2: [0],
            user: [],
            loading: false,
            loadingfortelecomoperator: false,
            isDisabled: false,
            model: new SearchModel(),
            //Filter For Count
            ministry_id: 0,
            ministrylistnotincludetrainingForCounts: [],
            user_id_count: 0,
            userlistforcount: [],
            fromdate: "",
            todate: "",
            disabledropdown: false,
            disabledropdowncpu: false,
            //Filter For SMS
            cpulist: [],
            ministrylist: [],
            // other
            totalcampaigncount: 0,
            sentsmscount: 0,
            receivedsmscount: 0,
            totalcorruptioncount: 0,
            yearmonthlist: [],
            countlist: [],
            yearmonthlist1: [],
            sentcountlist: [],
            receivedcountlist: [],
            receivedcountlistnopercent: [],
            corruptioncount: [],
            yearmonthlist2: [],
            totalphnolist: [],
            yearmonthlist_forphnolist: [],
            show: false,
            itemlist: []
        };
    },
    computed: {

        MonthlyCampaignChartData() {
            return {
                type: "line",
                utc: true,
                height: "380px",

                plot: {
                    aspect: "spline",
                    tooltip: {
                        /***updated at 25-Nov-2021 by soelae***/
                        "border-radius": "5px",
                        "border-width": "1px",
                        "border-color": "#f6f7f8",
                        padding: "10px",
                        "font-weight": "bold",
                        "text-align": "center",
                        text: "%kl" + "<br>%t : %v",
                        sticky: true,
                        timeout: 60000,
                         "background-color": "#f6f7f8",
                         "font-color": "#000",
                        /***updated at 25-Nov-2021 by soelae***/

                    },

                },

                plotarea: {
                    adjustLayout: true
                },
                scaleX: {
                    labels: this.yearmonthlist,
                    guide: {
                        visible: false
                    },
                    item: {
                        paddingTop: "10px",
                        fontColor: "#8391a5",
                        fontFamily: "Arial",
                        fontSize: "11px",
                        "font-angle": -45
                    },
                    itemsOverlap: true,
                    lineColor: "#d2dae2",
                    maxItems: 9999,
                    offsetY: "1px",
                    tick: {
                        lineColor: "#d2dae2",
                        visible: false
                    }
                },

                "scale-y": {
                    "line-color": "#f6f7f8",
                    shadow: 0,
                    guide: {
                        "line-style": "dashed"
                    },
                    "minor-ticks": 0,
                    "thousands-separator": ","
                },

                series: [{
                    values: this.countlist,
                    text: "Total Campaigns",
                    "line-color": "#007790",
                    "legend-item": {
                        "background-color": "#007790",
                        borderRadius: 12,
                        "font-color": "white"
                    },
                    "legend-marker": {
                        visible: false
                    },
                    marker: {
                        "background-color": "#007790",
                        "border-width": 1,
                        shadow: 0,
                        "border-color": "#69dbf1"
                    },
                    "highlight-marker": {
                        size: 6,
                        "background-color": "#007790"
                    }
                }]
            };
        },
        MonthlySentAndReceivedChart() {
            return {
                type: "bar",
                height: "400px",
                plot: {
                    //marginTop: "20px",
                    //stacked: true,
                    "bar-width": "13px",
                    animation: {
                        effect: "ANIMATION_SLIDE_BOTTOM"
                    },
                    "hover-state": {
                        alpha: 1,
                        visible: true
                    },
                    // "value-box": {
                    //   text: "%v",
                    //   placement: "top-in",
                    //   "font-color": "white",
                    //   "font-size": 9,
                    // },
                    "value-box": {
                        text: "%v",
                        placement: "top-out",
                        "font-style": "normal",
                        "font-size": 10,
                        "font-color": "black",
                        "font-angle": -90,
                        rules: [{
                            rule: "%v == 0",
                            visible: false
                        }]
                    },
                    tooltip: {
                        text: "%t: %v",
                        "font-color": "white",
                        "font-family": "Georgia",
                        "font-size": 10,
                        "font-weight": "bold",
                        "font-style": "normal"
                    }
                },
                legend: {
                    paddingTop: "10px",
                    adjustLayout: true,
                    align: "center",
                    verticalAlign: "bottom",
                    item: {
                        fontSize: "13px"
                    }
                },
                plotarea: {
                    adjustLayout: true
                },
                scaleX: {
                    labels: this.yearmonthlist1,
                    guide: {
                        visible: false
                    },
                    item: {
                        paddingTop: "15px",
                        fontColor: "#8391a5",
                        fontFamily: "Arial",
                        fontSize: "11px",
                        "font-angle": -45
                    },
                    itemsOverlap: true,
                    lineColor: "#d2dae2",
                    maxItems: 9999,
                    offsetY: "1px",
                    tick: {
                        lineColor: "#d2dae2",
                        visible: false
                    }
                },
                series: [{
                        values: this.sentcountlist,
                        stack: 1,
                        backgroundColor: "#0066ff",
                        text: "Total Beneficiaries"
                    },
                    {
                        values: this.receivedcountlistnopersent,
                        stack: 2,
                        backgroundColor: "#ff9900",
                        text: "Feedback Received"
                    }
                ]
            };
        },
        MonthlyReceivedChart() {
            return {
                type: "line",
                utc: true,
                height: "380px",
                plot: {
                    aspect: "spline",
                    tooltip: {
                       /***updated at 25-Nov-2021 by soelae***/
                        "border-radius": "5px",
                        "border-width": "1px",
                        "border-color": "#f6f7f8",
                        padding: "10px",
                        "font-weight": "bold",
                        "text-align": "center",
                        text: "%kl" + "<br>%t : %v",
                        sticky: true,
                        timeout: 60000,
                         "background-color": "#f6f7f8",
                         "font-color": "#000",
                        /***updated at 25-Nov-2021 by soelae***/
                    }
                },

                plotarea: {
                    adjustLayout: true
                },
                scaleX: {
                    labels: this.yearmonthlist1,
                    guide: {
                        visible: false
                    },
                    item: {
                        paddingTop: "10px",
                        fontColor: "#8391a5",
                        fontFamily: "Arial",
                        fontSize: "11px",
                        "font-angle": -45
                    },
                    itemsOverlap: true,
                    lineColor: "#d2dae2",
                    maxItems: 9999,
                    offsetY: "1px",
                    tick: {
                        lineColor: "#d2dae2",
                        visible: false
                    }
                },

                "scale-y": {
                    "line-color": "#f6f7f8",
                    shadow: 0,
                    guide: {
                        "line-style": "dashed"
                    },
                    "minor-ticks": 0,
                    "thousands-separator": ","
                },

                series: [{
                    values: this.receivedcountlist,
                    text: "Response Rate %",
                    "line-color": "#ffcc00",
                    "legend-item": {
                        "background-color": "#ffcc00",
                        borderRadius: 5,
                        "font-color": "white"
                    },
                    "legend-marker": {
                        visible: false
                    },
                    marker: {
                        "background-color": "#ffcc00",
                        "border-width": 1,
                        shadow: 0,
                        "border-color": "#ffcc00"
                    },
                    "highlight-marker": {
                        size: 6,
                        "background-color": "#007790"
                    }
                }]
            };
        },
        MonthlyCorruptionChart() {
            return {
                type: "bar",
                height: "380px",
                plot: {
                    //marginTop: "20px",
                    //stacked: true,
                    "bar-width": "25px",
                    animation: {
                        effect: "ANIMATION_SLIDE_BOTTOM"
                    },
                    "hover-state": {
                        alpha: 1,
                        visible: true
                    },
                    "value-box": {
                        text: "%v",
                        placement: "top-out",
                        "font-style": "normal",
                        //'font-color': "white",
                        "font-size": 10,
                        "background-color": "white",
                        "border-color": "gray",
                        "border-width": 1,
                        padding: "3%",
                        callout: true,
                        //"font-angle": -90,
                        rules: [{
                            rule: "%v == 0",
                            visible: false
                        }]
                    },
                    tooltip: {
                        /***updated at 25-Nov-2021 by soelae***/
                        "border-radius": "5px",
                        "border-width": "1px",
                        "border-color": "#f6f7f8",
                        padding: "10px",
                        "font-weight": "bold",
                        "text-align": "center",
                        text: "%kl" + "<br>%t : %v",
                        sticky: true,
                        timeout: 60000,
                         "background-color": "#f6f7f8",
                         "font-color": "#000",
                        /***updated at 25-Nov-2021 by soelae***/

                    }
                },

                plotarea: {
                    adjustLayout: true
                },

                scaleX: {
                    labels: this.yearmonthlist2,
                    guide: {
                        visible: false
                    },
                    item: {
                        paddingTop: "15px",
                        fontColor: "#8391a5",
                        fontFamily: "Arial",
                        fontSize: "11px",
                        "font-angle": -45
                    },
                    itemsOverlap: true,
                    lineColor: "#d2dae2",
                    maxItems: 9999,
                    offsetY: "1px",
                    tick: {
                        lineColor: "#d2dae2",
                        visible: false
                    }
                },
                series: [{
                    values: this.corruptioncount,
                    stack: 1,
                    backgroundColor: "#0066ff",
                    text: "Corruption Complaint"
                }]
            };
        },
        MonthlyPhoNoChartData() {
            return {
                type: "bar",
                height: "380px",
                // title: {
                //   text: "Axis Lines",
                // },
                plot: {
                    //stacked: true,
                    "bar-width": "25px",
                    animation: {
                        effect: "ANIMATION_SLIDE_BOTTOM"
                    },
                    "hover-state": {
                        alpha: 1,
                        visible: true
                    },
                    "value-box": {
                        text: "%v",
                        placement: "top-out",
                        "font-style": "normal",
                        //'font-color': "white",
                        "font-size": 10,
                        "background-color": "white",
                        "border-color": "gray",
                        "border-width": 1,
                        padding: "3%",
                        callout: true,
                        //"font-angle": -90,
                        rules: [{
                            rule: "%v == 0",
                            visible: false
                        }]
                    }
                },
                // legend: {
                //   adjustLayout: true,
                //   align: "center",
                //   verticalAlign: "top",
                //   item: {
                //     fontSize: "13px",
                //   },
                // },
                plotarea: {
                    adjustLayout: true
                },
                scaleX: {
                    labels: this.yearmonthlist_forphnolist,
                    guide: {
                        visible: false
                    },
                    item: {
                        paddingTop: "20px",
                        fontColor: "#8391a5",
                        fontFamily: "Arial",
                        fontSize: "11px",
                        "font-angle": -45
                    },
                    itemsOverlap: true,
                    lineColor: "#d2dae2",
                    maxItems: 9999,
                    offsetY: "1px",
                    tick: {
                        lineColor: "#d2dae2",
                        visible: false
                    }
                },
                /////
                series: [{
                    values: this.totalphnolist,
                    text: "Total Phone No",
                    "line-color": "#007790",
                    "legend-item": {
                        "background-color": "#007790",
                        borderRadius: 12,
                        "font-color": "white"
                    },
                    "legend-marker": {
                        visible: false
                    },
                    marker: {
                        "background-color": "#007790",
                        "border-width": 1,
                        shadow: 0,
                        "border-color": "#69dbf1"
                    },
                    "highlight-marker": {
                        size: 6,
                        "background-color": "#007790"
                    }
                }]
            };
        }
    },

    watch: {
        "model.ministry_acc_id"(val) {
            if (!val) {
                this.model.ministry_acc_id = 0;
            }
        },
        "model.userid"(val) {
            if (!val) {
                this.model.userid = 0;
            }
        },

        ministry_id(val) {
            if (!val) {
                this.ministry_id = 0;
            }
        },
        user_id_count(val) {
            if (!val) {
                this.user_id_count = 0;
            }
        }
    },

    created() {

        this.$emit("eventname", true);
        this.user = JSON.parse(localStorage.getItem("user"));
        if (this.user.role_id == 1) {
            this.disabledropdowncpu = false;
            this.disaledropdown = false;
            this.show = true;
            this.OnChangeMinistryForCount();
            this.GetMinistryNoTraining();
            this.GetMinistry();
            this.OnChangeByMinistry();
        } else if (this.user.role_id == 2) {
            this.disabledropdown = true;
            this.disabledropdowncpu = false;
            this.ministry_id = this.user.id;
            this.OnChangeMinistryForCount();
        } else if (this.user.role_id == 3) {
            this.disabledropdown = true;
            this.disabledropdowncpu = true;
            this.ministry_id = this.user.parent_id;
            this.user_id_count = this.user.id;
            this.OnChangeMinistryForCount();
        }

        this.SetDefaultFormDateAndToDate();
        this.OnChangeByReporDateForChart();

        this.GetMinistryNoTraining();
        this.GetSmsCountByOperator();
    },
    methods: {
        sumField(key) {
            // sum data in give key (property)
            return this.itemlist.reduce((a, b) => a + (b[key] || 0), 0);
        },

        SetDefaultFormDateAndToDate() {
            var today = new Date();
            // var dd = String(today.getDate()).padStart(2, "0");
            // var mm = String(today.getMonth() -1).padStart(2, "0");
            var yyyy = today.getFullYear();
            var fdate = yyyy + "-" + "01" + "-" + "01";
            var tdate = yyyy + "-" + "12" + "-" + "31";
            this.fromdate = String(fdate);
            this.todate = String(tdate);
            this.year = String(yyyy);
            this.model.fromdate = String(fdate);
            this.model.todate = String(tdate);
        },

        OnChangeByReporDateForChart() {
            var vm = this;

            vm.countlist = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            vm.sentcountlist = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            vm.receivedcountlist = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            vm.receivedcountlistnopersent = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            vm.totalcampaigncount = 0;
            vm.sentsmscount = 0;
            vm.receivedsmscount = 0;
            vm.totalcorruptioncount = 0;
            vm.corruptioncount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            vm.totalphnolist = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            vm.GetAllDataForMonthlyCampaignCounts(
                vm.fromdate,
                vm.todate,
                vm.ministry_id,
                vm.user_id_count
            );
            vm.GetAllDataForMonthlyNumberOfSentAndReceivedCounts(
                vm.fromdate,
                vm.todate,
                vm.ministry_id,
                vm.user_id_count
            );
            vm.GetAllDataForTotalCampaignCounts(
                vm.fromdate,
                vm.todate,
                vm.ministry_id,
                vm.user_id_count
            );
            vm.GetAllDataForSentAndReceivedSmsCounts(
                vm.fromdate,
                vm.todate,
                vm.ministry_id,
                vm.user_id_count
            );
            vm.GetAllDataForTotalCorruptionCounts(
                vm.fromdate,
                vm.todate,
                vm.ministry_id,
                vm.user_id_count
            );
            vm.GetAllDataForMonthlyCorruptionCounts(
                vm.fromdate,
                vm.todate,
                vm.ministry_id,
                vm.user_id_count
            );

            vm.GetMonthlyPhNoCount(
                vm.fromdate,
                vm.todate,
                vm.ministry_id,
                vm.user_id_count
            );
        },

        GetMinistry() {
            var vm = this;
            DropDownService.GetMinistryAccount().then(result => {
                vm.ministrylist = result.data;
                vm.ministrylist.splice(0, 0, {
                    id: 0,
                    "ministry.name": "All Ministries"
                });
            });
        },

        GetMinistryNoTraining() {
            var vm = this;
            DropDownService.GetMinistryNoTraining().then(result => {
                vm.ministrylistnotincludetrainingForCounts = result.data;
                vm.ministrylistnotincludetrainingForCounts.splice(0, 0, {
                    id: 0,
                    "ministry.name": "All Ministries"
                });
            });
        },

        OnChangeByMinistry() {
            var vm = this;
            DropDownService.GetAllCPUAccountByMinistry(vm.model.ministry_acc_id).then(
                result => {
                    vm.cpulist = result.data;
                    this.cpulist.splice(0, 0, {
                        id: 0,
                        username: "All CPUS"
                    });
                    this.model.userid = 0;
                }
            );
        },
        OnChangeMinistryForCount() {
            var vm = this;
            //vm.userlistforcount = [];
            DropDownService.GetAllCPUAccountByMinistry(vm.ministry_id).then(
                result => {
                    vm.userlistforcount = result.data;
                    vm.userlistforcount.splice(0, 0, {
                        id: 0,
                        username: "All CPUS"
                    });
                    if (this.user.role_id != 3) {
                        this.user_id_count = 0;
                    }
                }
            );
        },

        GetAllDataForMonthlyCampaignCounts(
            fromdate,
            todate,
            ministry_id,
            user_id_count
        ) {
            var vm = this;
            vm.loading = true;
            vm.isDisabled = true;
            HomeService.GetMonthlyCampainCounts(
                fromdate,
                todate,
                ministry_id,
                user_id_count
            ).then(result => {
                if (result.data.counts == 0 || result.data.yearmonths == 0) {
                    vm.yearmonthlist = result.data.filterdates;
                    vm.countlist = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                } else {
                    vm.yearmonthlist = result.data.yearmonths;
                    vm.countlist = result.data.counts;
                }
                vm.loading = false;
                vm.isDisabled = false;
            });
        },
        GetAllDataForMonthlyNumberOfSentAndReceivedCounts(
            fromdate,
            todate,
            ministry_id,
            user_id_count
        ) {
            var vm = this;
            vm.loading = true;
            vm.isDisabled = true;
            HomeService.GetAllForSentAndReceivedCount(
                fromdate,
                todate,
                ministry_id,
                user_id_count
            ).then(result => {
                if (
                    result.data.sentcounts == 0 ||
                    result.data.receivedfornopersent == 0 ||result.data.receivedcounts==0||
                    result.data.months == 0
                ) {
                    vm.yearmonthlist1 = result.data.filterDate;
                    vm.sentcountlist = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    vm.receivedcountlist = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    vm.receivedcountlistnopersent = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


                } else {
                    vm.yearmonthlist1 = result.data.months;
                    vm.sentcountlist = result.data.sentcounts;
                    vm.receivedcountlist = result.data.receivedcounts;
                    vm.receivedcountlistnopersent=result.data.receivedfornopersent;
                }
                vm.loading = false;
                vm.isDisabled = false;
            });
        },
        GetAllDataForMonthlyCorruptionCounts(
            fromdate,
            todate,
            ministry_id,
            user_id_count
        ) {
            var vm = this;
            vm.loading = true;
            vm.isDisabled = true;
            HomeService.GetAllForMonthlyCorruptionReceived(
                fromdate,
                todate,
                ministry_id,
                user_id_count
            ).then(result => {
                if (result.data.corruptioncounts == 0 || result.data.months == 0) {
                    vm.yearmonthlist2 = result.data.filterDate;
                    vm.corruptioncount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                } else {
                    vm.yearmonthlist2 = result.data.months;
                    vm.corruptioncount = result.data.corruptioncounts;
                }
                vm.loading = false;
                vm.isDisabled = false;
            });
        },
        GetAllDataForTotalCampaignCounts(
            fromdate,
            todate,
            ministry_id,
            user_id_count
        ) {
            var vm = this;
            vm.loading = true;
            vm.isDisabled = true;
            HomeService.GetAllForTotalCampaign(
                fromdate,
                todate,
                ministry_id,
                user_id_count
            ).then(result => {
                vm.totalcampaigncount = result.data.counts;
            });
            vm.loading = false;
            vm.isDisabled = false;
        },
        GetAllDataForSentAndReceivedSmsCounts(
            fromdate,
            todate,
            ministry_id,
            user_id_count
        ) {
            var vm = this;
            vm.loading = true;
            vm.isDisabled = true;
            HomeService.GetAllForSentAndReceivedSms(
                fromdate,
                todate,
                ministry_id,
                user_id_count
            ).then(result => {
                vm.sentsmscount = result.data.sentcounts;
                vm.receivedsmscount = result.data.receivedcounts;
            });
            vm.loading = false;
            vm.isDisabled = false;
        },
        ResetFilter() {
            var vm = this;
            var today = new Date();
            var yyyy = today.getFullYear();
            var fdate = yyyy + "-" + "01" + "-" + "01";
            var tdate = yyyy + "-" + "12" + "-" + "31";
            vm.fromdate = String(fdate);
            vm.todate = String(tdate);
            if (vm.user.role_id == 1) {
                vm.ministry_id = 0;
                this.OnChangeMinistryForCount();
            } else if (vm.user.role_id == 2) {
                vm.user_id_count = 0;
            }
            vm.GetAllDataForTotalCorruptionCounts(
                vm.fromdate,
                vm.todate,
                vm.ministry_id,
                vm.user_id_count
            );
            vm.GetAllDataForSentAndReceivedSmsCounts(
                vm.fromdate,
                vm.todate,
                vm.ministry_id,
                vm.user_id_count
            );
            vm.GetAllDataForTotalCampaignCounts(
                vm.fromdate,
                vm.todate,
                vm.ministry_id,
                vm.user_id_count
            );
            vm.GetAllDataForMonthlyCampaignCounts(
                vm.fromdate,
                vm.todate,
                vm.ministry_id,
                vm.user_id_count
            );
            vm.GetAllDataForMonthlyNumberOfSentAndReceivedCounts(
                vm.fromdate,
                vm.todate,
                vm.ministry_id,
                vm.user_id_count
            );
            vm.GetAllDataForMonthlyCorruptionCounts(
                vm.fromdate,
                vm.todate,
                vm.ministry_id,
                vm.user_id_count
            );
            vm.GetMonthlyPhNoCount(
                vm.fromdate,
                vm.todate,
                vm.ministry_id,
                vm.user_id_count
            );
        },

        ResetForSmsCountByOprator() {
            var vm = this;
            vm.SetDefaultFormDateAndToDate();
            vm.model.ministry_acc_id = 0;
            vm.model.userid = 0;
            vm.cpulist = [];
            vm.cpulist.splice(0, 0, {
                id: 0,
                username: "All CPUS"
            });
            this.GetSmsCountByOperator();
        },
        GetAllDataForTotalCorruptionCounts(
            fromdate,
            todate,
            ministry_id,
            user_id_count
        ) {
            var vm = this;
            vm.loading = true;
            vm.isDisabled = true;
            HomeService.GetAllForCorruptionSms(
                fromdate,
                todate,
                ministry_id,
                user_id_count
            ).then(result => {
                vm.totalcorruptioncount = result.data.corruptioncounts;
            });
            vm.loading = false;
            vm.isDisabled = false;
        },
        GetMonthlyPhNoCount(fromdate, todate, ministry_id, user_id_count) {
            var vm = this;
            vm.loading = true;
            vm.isDisabled = true;
            HomeService.MonthlyPhNoCount(
                fromdate,
                todate,
                ministry_id,
                user_id_count
            ).then(result => {
                if (result.data.counts == 0 || result.data.yearmonths == 0) {
                    vm.yearmonthlist_forphnolist = result.data.filterdates;
                    vm.totalphnolist = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                } else {
                    vm.yearmonthlist_forphnolist = result.data.yearmonths;
                    vm.totalphnolist = result.data.counts;
                }
                vm.loading = false;
                vm.isDisabled = false;
            });
        },

        GetSmsCountByOperator() {
            var vm = this;
            vm.loadingfortelecomoperator = true;
            vm.isDisabled = true;
            vm.itemlist = [];
            HomeService.GetSmsByOperator(
                vm.model.fromdate,
                vm.model.todate,
                vm.model.ministry_acc_id,
                vm.model.userid
            ).then(result => {
                result.data.forEach(item => {
                    vm.itemlist.push(item);
                });
                vm.loadingfortelecomoperator = false;
                vm.isDisabled = false;
            });
        },

        ExcelReport() {
            var vm = this;
            vm.excelloading = true;
            HomeService.GetExcelData(
                vm.model.fromdate,
                vm.model.todate,
                vm.model.ministry_acc_id,
                vm.model.userid
            ).then(response => {
                //console.log(response);
                const url = window.URL.createObjectURL(new Blob([response.data]));
                $("#mylink").attr("href", url);
                $("#mylink").attr("download", "file.xls");
                $("#mylink")[0].click();
                vm.excelloading = false;
            });
        }
    }
};
</script>
