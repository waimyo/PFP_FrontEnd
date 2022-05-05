<style scoped>
.theme--light.v-subheader.sub {
    float: left;
    margin-top: -35px;
}
</style>
<template>
<div>
    <v-col cols="12" md="12">
        <v-card>
            <v-card-title>Broadcast Confirmation</v-card-title>
            <v-divider></v-divider>
            <v-col cols="12" md="12">
                <v-row dense class="mb-n5">
                    <v-col cols="12" md="12" class="mb-5">
                        <v-row dense>
                            <!-- <v-col cols="12" md="2"></v-col> -->
                            <v-col cols="12" md="9">
                                <v-card-text class="mt-n4">Following SMS are ready for broadcast. Please review them for the last time to confirm the SMS content, and click START BROADCAST button. If you need to design again, please click CANCEL button.</v-card-text>
                            </v-col>
                            <v-col cols="12" md="3">
                                <v-btn @click="Insert()" class="mr-2" small outlined color="indigo">Start Broadcast</v-btn>
                                <router-link :to="{ path: '/CampaignEntry' }">
                                    <v-btn class small outlined color="error">Cancel</v-btn>
                                </router-link>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>

                <v-data-table :headers="headers" :items="confirmlist" :search="search" :options.sync="pagination" :server-items-length="totalclass" :footer-props="footerProps">
                    <template v-slot:item="row">
                        <tr>
                            <td>{{ row.item.from }}</td>
                            <td>{{ row.item.to }}</td>
                            <td>{{ row.item.smstext }}</td>
                            <td>{{ row.item.channel }}</td>

                        </tr>
                    </template>
                </v-data-table>
            </v-col>
        </v-card>
    </v-col>
</div>
</template>

<script>
import CampaignsEntry from '../../models/campaignsentry';
import CampaignService from '../../services/campaignservice';
export default {
    data() {
        return {
            camp: new CampaignsEntry(),
            showMessages: true,
            headers: [{
                    text: "FROM",
                    value: "from",
                    width: "70"
                },
                {
                    text: "TO(MOBILE NUMBER)",
                    value: "to",
                    width: "100"
                },
                {
                    text: "SMS TEXT",
                    value: "smstext",
                    width: "200"
                },
                {
                    text: "CHANNEL",
                    value: "channel",
                    width: "100"
                },

            ],
            confirmlist: [],

        };
    },

    computed: {
        messages() {
            return this.showMessages ? ["Active"] : undefined;
        },
    },
    created() {
        this.$emit("eventname", true);
        //get data from campaignentryform
        this.camp.Name = this.$route.query.name;
        this.camp.GroupId = this.$route.query.group_id;
        this.camp.SmsMessage = this.$route.query.smsmessage;
        this.camp.ClosingMessage = this.$route.query.closingmessage;
        this.camp.SmsCodeId = this.$route.query.smscodeid;
        this.camp.SmsShortCodeText = this.$route.query.smscodetext;
        this.GetConfirmList();
    },
    updated() {
        this.isExactActive = typeof this.$refs.rv === "undefined";
    },

    mounted() {
        this.isExactActive = typeof this.$refs.rv === "undefined";
    },
    methods: {
        GetConfirmList() {
            CampaignService.GetCampaignConfirmList(this.camp.GroupId).then(result => {

                for (var i in result.data) {

                    var obj = {};
                    obj["from"] = this.$route.query.smscodetext;
                    obj["to"] = result.data[i];
                    obj["smstext"] = this.$route.query.smsmessage;
                    obj["channel"] = this.Checkoperator(result.data[i]);
                    this.confirmlist.push(obj);
                }

            })
        },
        Insert() {
            CampaignService.InsertData(this.camp).then(
                result => {
                    if (result.data.success) {
                        this.$router.push({
                            name: 'CampaignEntry',
                            params: {
                                campaignstatus: 'success',
                                campaignmessage: 'Success! The new campaign has started.'
                            }
                        });
                        //alert("success");
                    } else {
                        this.$router.push({
                            name: 'CampaignEntry',
                            params: {
                                campaignstatus: 'fail',
                                campaignmessage: 'Failed! The new campaign has not started.'
                            }
                        });
                    }
                }
            );
        },
        Checkoperator(phonenumber) {
            //var term = "09451234177";
            var mptRegExp = new RegExp("^(092|093|094|095|0973|098|0991)[*0-9]+$");
            var mytelRegExp = new RegExp("^(096)[*0-9]+$");
            var telenorRegExp = new RegExp("^(0975|0976|0977|0978|0979)[*0-9]+$");
            var ooredooRegExp = new RegExp("^(0995|0996|0997|0998)[*0-9]+$");


            if (mptRegExp.test(phonenumber)) {
                return "mpt1111";
            }
            if (mytelRegExp.test(phonenumber)) {
                return "mytel1111";
            }
            if (telenorRegExp.test(phonenumber)) {
                return "telenor1111";
            }
            if (ooredooRegExp.test(phonenumber)) {
                return "ooredoo1111";
            }

        }
    }
};
</script>
