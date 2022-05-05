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
    <v-dialog flat v-model="dialog" persistent max-width="800px">
        <!-- <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on"> Open Dialog </v-btn>
      </template> -->
        <v-card :disabled="isDisabled">
            <v-card-title class="grey black--text lighten-3">
                Create New Service
                <v-spacer></v-spacer>
                <v-icon color="primary" text @click="dialog = false;reset()">mdi-close-circle</v-icon>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-form autocomplete="off" @submit.prevent="Insert" ref="form" v-model="valid" lazy-validation>
                        <v-row dense>
                            <v-col cols="12" md="12">
                                <v-row dense>
                                    <v-col cols="12" md="3">
                                        <v-subheader>Account Link<span class="red--text title">*</span></v-subheader>
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <v-autocomplete outlined dense v-model="service.ministry_id" item-text="name" item-value="id" :items="ministrylist" :rules="minRules" placeholder="Select Ministry" @change="GetDepartment"></v-autocomplete>
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <v-autocomplete outlined dense v-model="service.dept_id" item-text="name" item-value="id" :items="departmentlist" :rules="deptRules" placeholder="Select Department"></v-autocomplete>
                                    </v-col>
                                </v-row>

                                <v-row dense>
                                    <v-col cols="12" md="3">
                                        <v-subheader>Service Name<span class="red--text title">*</span></v-subheader>
                                    </v-col>
                                    <v-col cols="12" md="8">
                                        <v-text-field required v-model="service.name" :rules="serRules" outlined dense></v-text-field>
                                    </v-col>
                                </v-row>

                                <v-row dense>
                                    <v-col cols="12" md="3"> </v-col>
                                    <v-col cols="12" md="8">
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
import Service from "../../models/service"
import DropDown from "../../services/dropdownservice"
import ServicesService from "../../services/serviceservice"

export default {
    data() {
        return {
            isDisabled: false,
            service: new Service(),
            color: "",
            mode: "",
            snackbar: false,
            text: "",
            timeout: "5000",
            x: "right",
            y: "top",
            valid: true,
            dialog: false,
            ministrylist: [],
            departmentlist: [],
            minRules: [(v) => !!v || "ဝန်ကြီးဌာနအမည်ရွေးရန်လိုအပ်ပါသည်။"],
            deptRules: [(v) => !!v || "ဌာနအမည်ထည့်ရန်လိုအပ်ပါသည်။"],
            serRules: [(v) => !!v || "ဝန်ဆောင်မှုအမည်ထည့်ရန်လိုအပ်ပါသည်။"],
        };
    },
    computed: {},
    created() {
        this.$emit("eventname", true);
        this.GetMinistry();
        //this.GetDepartment();
    },
    methods: {
        Insert() {
            var vm = this;
            if (vm.service.name == null || vm.service.name == "" || vm.service.ministry_id == null || vm.service.ministry_id == "" || vm.service.dept_id == null || vm.service.dept_id == "") {
                vm.validate();

            } else {

              vm.isDisabled=true;
                ServicesService.InsertData(vm.service).then(result => {
                    if (result.data.success) {
                        this.$emit("getData", {
                            methodCall: 'GetAllData'
                        });
                        vm.reset();
                        vm.color = "success";
                        vm.snackbar = true;
                        vm.text = result.data.messages[0];
                    } else {
                        vm.snackbar = true;
                        vm.color = "red";
                        vm.text = result.data.messages[0];
                    }
                     vm.isDisabled=false;

                })
            }

        },
        GetMinistry() {
            var vm = this;
            DropDown.GetMinistry().then((result) => {
                vm.ministrylist = result.data;
            });
        },
        GetDepartment() {
            var vm = this;
            DropDown.GetDepartment(vm.service.ministry_id).then((result) => {
                vm.departmentlist = result.data;
            });
        },
        validate() {
            this.$refs.form.validate();
        },
        // clear(){

        //   this.service.name="";
        //   this.service.dept_id="";
        //   this.service.ministry_id="";
        // },
        reset() {

            this.$refs.form.reset();
        }
    },
};
</script>
