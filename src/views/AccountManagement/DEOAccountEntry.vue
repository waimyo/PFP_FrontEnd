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
    <v-dialog flat v-model="dialog" max-width="900px">
        <v-card :disabled="isDisabled">
            <v-card-title class="grey black--text lighten-3">
                Create New DEO Account
                <v-spacer></v-spacer>
                <v-icon color="primary" text @click="dialog = false;reset()">mdi-close-circle</v-icon>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-form @submit.prevent="Insert" autocomplete="off" ref="form" v-model="valid" lazy-validation>
                        <v-row dense>
              <v-col cols="12" md="12">
                <v-row dense>
                  <v-col cols="12" md="2">
                    <v-subheader>Name
                      <span class="red--text title">*</span>
                      </v-subheader>
                  </v-col>
                  <v-col cols="12" md="8">
                    <v-text-field v-model="account.name" :rules="nameRules" outlined dense></v-text-field>
                  </v-col>
                </v-row>
                <v-row dense>
                  <v-col cols="12" md="2">
                    <v-subheader>တည်နေရာ</v-subheader>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-autocomplete
                      v-model="account.location_state"
                      :items="statedivlist"
                      item-value="ID"
                      item-text="Name"
                      :disabled="disableDropdown"
                      placeholder="တိုင်းဒေသကြီး/ပြည်နယ်ရွေးချယ်ပါ"
                      @change="GetDistrict()"
                      outlined
                      dense
                      clearable
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-autocomplete
                      v-model="account.location_district"
                      :items="districtlist"
                      item-text="Name"
                      item-value="ID"
                      placeholder="ခရိုင်ရွေးချယ်ပါ"
                      @change="GetTownship()"
                      :disabled="disableDropdown"
                      outlined
                      dense                      
                      clearable
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="2">
                    <v-autocomplete
                      v-model="account.location_township"
                      :items="townshiplist"
                      item-text="Name"
                      item-value="ID"
                      placeholder="မြို့နယ်ရွေးချယ်ပါ"
                      :disabled="disableDropdown"
                      outlined
                      dense
                      clearable                      
                    ></v-autocomplete>
                  </v-col>
                </v-row>
                <v-row dense>
                  <v-col cols="12" md="2">
                    <v-subheader>Account Link</v-subheader>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-autocomplete 
                      v-model="account.parent_minid"
                      :items="ministrylist"
                      item-text="username"
                      item-value="id" 
                      :rules="ministryRules"
                      placeholder="ဝန်ကြီးဌာနရွေးချယ်ပါ"
                      @change="GetCPUAccount(account.parent_minid)"
                      :disabled="disableministryandcpu"
                      outlined dense  clearable></v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-autocomplete 
                    v-model="account.parent_id"
                      :items="cpuaccountlist"
                      item-text="username"
                      item-value="id"
                      :rules="cpuaccountRules"
                      placeholder="Select Parent CPU"
                      :disabled="disableministryandcpu"
                      @change="GetUserName(account.parent_id)"

                      outlined dense clearable></v-autocomplete>
                  </v-col>
                </v-row>
                <v-row dense>
                  <v-col cols="12" md="2">
                    <v-subheader>User Name</v-subheader>
                  </v-col>
                  <v-col cols="12" md="8">
                    <v-text-field v-model="account.username" :rules="usernameRules" outlined dense placeholder="Please write username in English only" disabled></v-text-field>
                  </v-col>
                </v-row>
                <v-row dense>
                  <v-col cols="12" md="2">
                    <v-subheader>Password
                      <span class="red--text title">*</span>
                    </v-subheader>
                  </v-col>
                  <v-col cols="12" md="8">
                    <v-text-field v-model="account.password" :rules="passwordRules" outlined dense placeholder="Please write password in English only" :disabled="disableDropdown" :append-icon="showpass ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showpass = !showpass"
                    :type="showpass ? 'text' : 'password'"></v-text-field>
                  </v-col>
                </v-row>
                <v-row dense>
                  <v-col cols="12" md="2">
                    <v-subheader>Email Address
                      <span class="red--text title">*</span>
                    </v-subheader>
                  </v-col>
                  <v-col cols="12" md="8">
                    <v-text-field v-model="account.email" :rules="emailaddressRules" outlined dense></v-text-field>
                  </v-col>
                </v-row>

                <v-row dense>
                  <v-col cols="12" md="2"> </v-col>
                  <v-col cols="12" md="8">
                    <v-btn type="submit" small outlined color="indigo" class="mr-2"
                      >သိမ်းမည်</v-btn
                    >
                    <v-btn @click="reset()" :disabled="disableReset" small outlined color="error">ပြန်လည်ရွေးချယ်မည်</v-btn>
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
import DropDownService from "../../services/dropdownservice";
import AccountService from "../../services/accountservice";
import Account from "../../models/account";

export default {
    data() {
        return {
            disableReset:true,
            isDisabled: false,
            statedivlist: [],
            districtlist:[],
            townshiplist:[],
            ministrylist:[],
            cpuaccountlist:[],
            account:new Account(),
            valid: true,
            dialog: false,
            snackbar: false,
            showpass:false,
            color: "",
            text: "",
            x: "right",
            y: "top",
            disableDropdown:false,
            disableministryandcpu:false,
            ministryRules: [(v) => !!v || "ဝန်ကြီးဌာနရွေးရန်လိုအပ်ပါသည်။"],
            cpuaccountRules: [(v) => !!v || "Parent CPU ရွေးရန်လိုအပ်ပါသည်။"],
            nameRules: [(v) => !!v || "Name ထည့်ရန်လိုအပ်ပါသည်။"],
            //usernameRules: [(v) => !!v || "User Name ထည့်ရန်လိုအပ်ပါသည်။"],
            passwordRules: [(v) => !!v || "Password ထည့်ရန်လိုအပ်ပါသည်။"],
            emailaddressRules: [(v) => !!v || "Email Address ထည့်ရန်လိုအပ်ပါသည်။"],
            udata: '',
        };
    },
    computed: {
      
    },
    created() {
        this.$emit("eventname", true);
        this.udata=JSON.parse(localStorage.getItem('user'));
        if(this.udata.role_id != 1){
          this.account.parent_minid = this.udata.ministry_id;
        }
        
    },
    methods: {
        GetStateDivision() {
            var vm = this;
            DropDownService.GetAllStateDivision().then(result => {
                vm.statedivlist = result.data;
            });
        },
        GetMinistry(){
          var vm = this;
            DropDownService.GetMinistryAccount().then(result => {
                vm.ministrylist = result.data;
            });
        },
        GetDistrict(){
      var vm=this;
      DropDownService.GetAllDistrict(vm.account.location_state).then(
        result=>{
          vm.districtlist=result.data;
        }
      )
    },
    GetTownship(){
      var vm=this;
      DropDownService.GetAllTownship(vm.account.location_district).then(
        result=>{
          vm.townshiplist=result.data;
        }
      )
    },
    GetCPUAccount(ministry_id){
      var vm=this;
      DropDownService.GetAllCPUAccountByMinistry(ministry_id).then(
        result=>{
          vm.cpuaccountlist=result.data;
        }
      )
    },
    GetUserName(parent_id){
          DropDownService.GetUserNameDEO(parent_id).then(result=>{
            this.account.username=result.data;
          })
        },
        /***To Insert or Update  form data***/
        Insert() {
            var vm = this;
            if(vm.account.name=="" || vm.account.name==null ||
             vm.account.username=="" || vm.account.username==null ||
             vm.account.password=="" || vm.account.password==null || 
             vm.account.email=="" || vm.account.email==null)
            {
              vm.validate();
            }
            else{
              vm.isDisabled=true;
              vm.account.role_id=4;
            AccountService.InsertData(vm.account).then((result)=>{
              if(result.data.success){
                this.$emit("getData");
                vm.reset();
                vm.color = "success";
              }
              else{
                vm.color="red";
              }
              
              vm.snackbar = true;
              vm.text = result.data.messages[0];
              vm.isDisabled=false;
            })
            }            
        },
        validate() {
            this.$refs.form.validate();
        },
        reset() {
          if(this.udata.role_id == 1){
            this.$refs.form.resetValidation();
            this.disableDropdown=false;
            this.account.name="";
            this.account.location_state=0;
            this.account.location_district=0;
            this.account.location_township=0;
             this.account.password="";
             this.account.email="";
             this.account.parent_minid=0;
            this.account.parent_id=0;
            this.account.username="";
            this.districtlist=[];
            this.townshiplist=[];
            this.cpuaccountlist=[];
          }
          else{
            this.$refs.form.resetValidation();
             this.account.name="";
             this.account.password="";
             this.account.email="";
            this.disableDropdown=false;
          }
            
        },
    }
};
</script>
