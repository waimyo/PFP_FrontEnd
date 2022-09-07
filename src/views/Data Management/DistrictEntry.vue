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
            <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
                <v-icon>mdi-close-circle</v-icon>
            </v-btn>
        </template>
    </v-snackbar>
    <v-dialog flat v-model="dialog" max-width="800px">
        <!-- <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on"> Open Dialog </v-btn>
      </template> -->
        <v-card :disabled="isDisabled">
            <v-card-title class="grey black--text lighten-3">
                Create New District
                <v-spacer></v-spacer>
                <v-icon color="primary" text @click="dialog = false;reset()">mdi-close-circle</v-icon>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-form @submit.prevent="Insert" autocomplete="off" ref="form" v-model="valid" lazy-validation>
                        <v-row dense>
                            <v-col cols="12" md="12">

                                <v-row dense>
                                    <v-col cols="12" md="4">
                                        <v-subheader>တိုင်းဒေသကြီး/ပြည်နယ်<span class="red--text title">*</span></v-subheader>
                                    </v-col>
                                    <v-col cols="12" md="7">
                                        <v-autocomplete clearable required :rules="statedivRules" v-model="loc.StateDivisionId" :items="statedivlist" item-text="Name" item-value="ID" outlined dense placeholder="တိုင်းဒေသကြီး/ပြည်နယ်ရွေးချယ်ပါ"></v-autocomplete>
                                    </v-col>
                                </v-row>

                                <v-row dense>
                                    <v-col cols="12" md="4">
                                        <v-subheader>ခရိုင်<span class="red--text title">*</span></v-subheader>
                                    </v-col>
                                    <v-col cols="12" md="7">
                                        <v-text-field required :rules="districtRules" v-model="loc.DistrictName" outlined dense></v-text-field>
                                    </v-col>
                                </v-row>

                                <v-row dense>
                                    <v-col cols="12" md="4">
                                        <v-subheader>ခရိုင်ကုဒ်<span class="red--text title">*</span></v-subheader>
                                    </v-col>
                                    <v-col cols="12" md="7">
                                        <v-text-field required :rules="districtcodeRules" v-model="loc.DistrictCode" outlined dense></v-text-field>
                                    </v-col>
                                </v-row>

                                <v-row dense>
                                    <v-col cols="12" md="4"> </v-col>
                                    <v-col cols="12" md="7">
                                        <v-btn type="submit" small outlined color="indigo" class="mr-2">Save</v-btn>
                                        <v-btn @click="reset()" small outlined color="error">Reset</v-btn>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-container>
            </v-card-text>
        </v-card>
    </v-dialog>
    <!-- </v-col> -->
</div>
</template>

<script>
/*eslint-disable*/
import Location from "../../models/location";
import LocationService from "../../services/locationservice";
import DropDownService from "../../services/dropdownservice";
export default {
    data() {
        return {
            isDisabled: false,
            statedivlist: [],
            valid: true,
            dialog: false,
            snackbar: false,
            color: "",
            text: "",
            x: "right",
            y: "top",
            loc: new Location(0, 1),
            statedivRules: [(v) => !!v || "တိုင်းဒေသကြီး/ပြည်နယ်ရွေးရန်လိုအပ်ပါသည်။"],
            districtRules: [(v) => !!v || "ခရိုင်ထည့်ရန်လိုအပ်ပါသည်။"],
            districtcodeRules: [(v) => !!v || "ခရိုင်ကုဒ်ထည့်ရန်လိုအပ်ပါသည်။"],
        };
    },
    computed: {},
    created() {
        this.$emit("eventname", true);
        //  this.GetStateDivision();

    },
    methods: {
        GetStateDivision() {
            var vm = this;
            DropDownService.GetAllStateDivision().then(result => {

                vm.statedivlist = result.data;
            });

        },
        /***To Insert or Update  form data***/
        Insert() {

            var vm = this;
            if (!vm.loc.DistrictName || !vm.loc.DistrictCode || !vm.loc.StateDivisionId) {

                vm.validate();
            } else {
                vm.isDisabled = true;
                vm.loc.LocationType = 2;
                LocationService.InsertData(vm.loc).then(
                    (result) => {
                        if (result.data.success) {
                            this.$emit("getData");
                            vm.reset();
                            vm.color = "success";
                        } else {

                            vm.color = "red";
                        }
                        vm.isDisabled = false;
                        vm.snackbar = true;
                        vm.text = result.data.messages[0];

                    }
                );
            }

        },
        validate() {
            this.$refs.form.validate();
        },
        reset() {
            this.$refs.form.reset();
            this.loc.Id = 0;
        },
    }
};
</script>
