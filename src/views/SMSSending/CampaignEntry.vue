<style scoped>
.theme--light.v-subheader.sub {
    float: left;
    margin-top: -35px;
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
    <div v-show="isExactActive">
        <v-col cols="12" md="12">
            <v-card>
                <v-card-title> ကမ်ပိန်းအသစ်စတင်ရန်</v-card-title>
                <v-divider></v-divider>
                <v-col cols="12" md="12">
                    <v-form autocomplete="off" @submit.prevent="ShowCampaignConfirmForm" ref="form" v-model="valid" lazy-validation>

                        <v-row dense>
                            <v-col cols="12" md="12" class="mt-5 mb-5">
                                <v-row dense>
                                    <v-col cols="12" md="3">
                                        <v-subheader>ကမ်ပိန်းအမည်
                                            <span class="red--text title">*</span>
                                        </v-subheader>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-text-field required :rules="nameRules" v-model="camp.Name" outlined dense></v-text-field>
                                    </v-col>
                                </v-row>

                                <v-row dense>
                                    <v-col cols="12" md="3">
                                        <v-subheader>ရွေးချယ်မည့်အုပ်စု 
                                            <span class="red--text title">*</span>
                                        </v-subheader>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-autocomplete clearable placeholder="အုပ်စုရွေးချယ်ပါ" required :rules="groupRules" v-model="camp.GroupId" :items="grouplist" item-text="Name" item-value="ID" outlined dense></v-autocomplete>
                                    </v-col>
                                </v-row>
                                <v-row dense>
                                    <v-col cols="12" md="3">
                                        <v-subheader>ကမ်ပိန်းပြီးဆုံးချိန်
                                            <span class="red--text title">*</span>
                                        </v-subheader>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <date-picker
                                        v-model="camp.closeddate"
                                            valueType="YYYY-MM-DD"
                                            format="DD/MM/YYYY"
                                            :editable="true"
                                            placeholder="ရွေးချယ်ပါ"
                                            clearable
                                        ></date-picker>
                                        <span v-show="closeddatevalidate" style="letter-spacing: 0; font-size: 12px;" class="red--text ml-2">ကမ်ပိန်းပြီးဆုံးချိန် ထည့်ရန်လိုအပ်ပါသည်။</span>
                                        <span v-show="closeddatecompare" style="letter-spacing: 0; font-size: 12px;" class="red--text ml-2">{{ closeddatecompareRule }}</span>
                                    </v-col>
                                </v-row>

                                <v-row dense class="mb-5">
                                    <v-col cols="12" md="3">
                                        <v-subheader>ပေးပို့မည့် မက်ဆေ့ချ် စာသား
                                            <span class="red--text title">*</span>
                                        </v-subheader>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-textarea required :rules="smsRules" v-model="camp.SmsMessage" outlined dense rows="5">
                                        </v-textarea>
                                    </v-col>
                                    <v-col cols="12" md="2">
                                        <p style="font-size: 13px">
                                            Shortcut example: #name# -> Name of recipient in list More:
                                            #service#, #department#, #ministry#, #dateofapp#, #dateofcomp#, #township#
                                        </p>
                                    </v-col>
                                </v-row>

                                <v-row dense class="mt-n5">
                                    <v-col cols="12" md="3">
                                        <v-subheader> အပိတ်မက်ဆေ့ချ် 
                                            <span class="red--text title">*</span>
                                        </v-subheader>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-text-field required :rules="closingsmsRules" v-model="camp.ClosingMessage" outlined dense></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="2">
                                        <p style="font-size: 13px">Example: Thank you for your feedback.</p>
                                    </v-col>
                                </v-row>
                                <v-row dense>
                                    <v-col cols="12" md="3">
                                        <v-subheader> SMS Shortcode </v-subheader>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-autocomplete outlined dense v-model="selectedsmscode" :items="smscodelist" item-text="Sms_Code" item-value="ID" return-object></v-autocomplete>
                                    </v-col>
                                </v-row>

                                <v-row dense>
                                    <v-col cols="12" md="3"> </v-col>
                                    <v-col cols="12" md="6">
                                        <v-btn type="submit" small outlined color="indigo" class="mr-2">ရှေ့ဆက်ပြုလုပ်မည်</v-btn>

                                        <!-- <router-link :to="{ path: 'CampaignEntry/CampaignConfirm' }">
                                            <v-btn small outlined color="indigo" class="mr-2">ရှေ့ဆက်ပြုလုပ်မည်</v-btn>
                                        </router-link> -->
                                        <v-btn @click="reset()" small outlined color="error"> ပြန်လည်ရွေးချယ်မည်</v-btn>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-col>
            </v-card>
        </v-col>
    </div>
    <router-view ref="rv"></router-view>
</div>
</template>

<script>
/*eslint-disable*/
import CampaignsEntry from '../../models/campaignsentry';
import CampaignService from '../../services/campaignservice';
import DropDownService from "../../services/dropdownservice";

export default {
    data() {
        return {
            snackbar: false,
            color: "",
            text: "",
            x: "right",
            y: "top",
            selectedsmscode: [],
            camp: new CampaignsEntry(),
            dept: "All Departments",
            service: "All Services",
            uploadby: "Uploaded By All",
            startdate: null,
            enddate: null,
            isExactActive: true,
            def: "1111",
            closeddatevalidate:false,
            closeddatecompare:false,
            savevalidate:true,
            nameRules: [(v) => !!v || "ကမ်ပိန်းအမည်ထည့်ရန်လိုအပ်ပါသည်။"],
            groupRules: [(v) => !!v || "အုပ်စုရွေးရန်လိုအပ်ပါသည်။"],
            smsRules: [(v) => !!v || "ပေးပို့မည့်မက်ဆေ့ချ်စာသားထည့်ရန်လိုအပ်ပါသည်။"],
            closingsmsRules: [(v) => !!v || "အပိတ်မက်ဆေ့ချ်ထည့်ရန်လိုအပ်ပါသည်။"],
            closeddatecompareRule:"",
            grouplist: [],
            smscodelist: [],

        };
    },
    watch: {
        '$route'() {
            if (this.$route.params.campaignstatus === "success") {
                this.snackbar = true;
                this.color = "success";
                this.text = this.$route.params.campaignmessage;
                this.reset();
                this.GetSmsCode();
                this.GetGroupList();
            } else if (this.$route.params.campaignstatus === "fail") {
                this.snackbar = true;
                this.color = "red";
                this.text = this.$route.params.campaignmessage;
            } else {
                this.reset();
                this.GetSmsCode();
                this.GetGroupList();
            }
        },
        'camp.closeddate'(val)
    {      
      if(val != null && val != undefined)
      {
        this.CalculateDate();
      }
    },
    },

    created() {

        this.$emit("eventname", true);

        this.GetSmsCode();
        this.GetGroupList();

    },
    updated() {

        this.isExactActive = typeof this.$refs.rv === "undefined";
    },

    mounted() {
        this.isExactActive = typeof this.$refs.rv === "undefined";
    },
    methods: {
        GetSmsCode() {
            DropDownService.GetSmsShortCode().then(result => {
                this.smscodelist = result.data;
                var smscodeobj = {
                    ID: result.data[0].ID,
                    Sms_Code: result.data[0].Sms_Code

                };
                this.selectedsmscode = smscodeobj;
            });
        },
        GetGroupList() {
            CampaignService.GetGroup().then(result => {
                this.grouplist = result.data;

            });
        },
        ShowCampaignConfirmForm() {
            console.lo
            if(this.camp.closeddate =="" || this.camp.closeddate==null){
                this.closeddatevalidate=true;
                this.closeddatecompare=false;
                this.savevalidate=false;
            }
            if (!this.camp.Name || !this.camp.GroupId ||
                !this.camp.SmsMessage || !this.camp.ClosingMessage ||
                !this.selectedsmscode.ID) {
                    this.savevalidate=false;
                this.validate();
            } 
            if(this.savevalidate == true){
                //Check Campaign Name is already exist
                CampaignService.GetCampaignByName(this.camp.Name).then(
                    result => {
                        //if campaign name already exist,show error message
                        if (!result.data.satisfied) {
                            this.color = "red";
                            this.text = result.data.message;
                            this.snackbar = true;
                        }
                        //Show campaign confirm list
                        else {
                            this.snackbar = false;
                            this.$router.push({
                                name: "CampaignConfirm",
                                query: {
                                    name: this.camp.Name,
                                    group_id: this.camp.GroupId,
                                    smsmessage: this.camp.SmsMessage,
                                    closingmessage: this.camp.ClosingMessage,
                                    smscodeid: this.selectedsmscode.ID,
                                    smscodetext: this.selectedsmscode.Sms_Code,
                                    closedDate:this.camp.closeddate,
                                }
                            });
                        }
                    }
                );
            }
        },
        validate() {
            this.$refs.form.validate();
        },
        reset() {
            this.$refs.form.reset();
            this.GetSmsCode();
        },
        CalculateDate(){
            var closedate=new Date(this.camp.closeddate);
            var todaydate=new Date();
            this.closeddatevalidate=false;
            if(closedate>todaydate){
                this.closeddatecompare=false;   
                this.savevalidate=true;
            }
            else{    
                this.closeddatecompare=true;                
                this.closeddatecompareRule="ကမ်ပိန်းပြီးဆုံးချိန်သည် ကမ်ပိန်းစတင်သည့်အချိန်ထက် ကြီးရပါမည်။"
            }
        }

    }
};
</script>
