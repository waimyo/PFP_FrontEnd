<style scoped>
.theme--light.v-subheader.sub {
    float: left;
    margin-top: -35px;
}
</style>
<template>
<div>
    <!-- <v-snackbar class="pt-0 ml-1" :color="color" v-model="snackbar" :right="x" :timeout="timeout" :top="y">
        {{ text }}
        <template v-slot:action="{ attrs }">
            <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
                <v-icon>mdi-close-circle</v-icon>
            </v-btn>
        </template>
    </v-snackbar> -->
    <v-dialog flat v-model="dialog" max-width="700px">
        <v-card class="mt-1" :disabled="isDisabled">
          <v-card-title class="grey black--text lighten-3">
                Password ပြောင်းရန်
                <v-spacer></v-spacer>
                <v-icon color="primary" text @click="dialog = false;Reset()">mdi-close-circle</v-icon>
            </v-card-title>
        <v-divider></v-divider>

        
        <v-col cols="12" md="12" class="mt-3">
          
          <v-col class="pl-9 pr-9 mt-n3 mb-n3">
    <v-alert
    v-model="snackbar"
      shaped
      outlined
      :type="color"
      dense
    >
      <span style="font-size: 13px;">{{ text }}</span>
    </v-alert>
          </v-col>

  
          <!-- <v-col style="font-size: 13px" class="text-center green--text mt-n3">{{ text }}</v-col> -->
          <v-form
            autocomplete="off"
            @submit.prevent="ChangePassword"
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-row dense>
              
              <v-col cols="12" md="12">
                <v-row dense>
                  <v-col cols="12" md="3">
                    <v-subheader>Username</v-subheader>
                  </v-col>
                  <v-col cols="12" md="7">
                    <v-text-field v-model="account.username" filled disabled outlined dense></v-text-field>
                  </v-col>
                </v-row>

                <v-row dense v-show="isshowcurrentpassword">
                  <v-col cols="12" md="3">
                    <v-subheader>Current Password</v-subheader>
                  </v-col>
                  <v-col cols="12" md="7">
                    <v-text-field
                      v-model="account.current_password"
                      :rules="currpassRules"
                      outlined
                      dense
                      placeholder="Please enter current password"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row dense>
                  <v-col cols="12" md="3">
                    <v-subheader>New Password</v-subheader>
                  </v-col>
                  <v-col cols="12" md="7">
                    <v-text-field
                    v-model="account.new_password"
                      :rules="newpassRules"
                      outlined
                      dense
                      placeholder="Please enter new password"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row dense>
                  <v-col cols="12" md="3">
                    <v-subheader>Confirm Password</v-subheader>
                  </v-col>
                  <v-col cols="12" md="7">
                    <v-text-field
                      v-model="confirmpass"
                      :rules="confirmpassRules"
                      outlined
                      dense
                      placeholder="Please enter the password again"
                    ></v-text-field>
                    <span v-show="passconfirm" style="letter-spacing: 0; font-size: 12px;" class="red--text ml-2">{{ passconfirmation }}</span>
                  </v-col>
                </v-row>
                <v-row dense class="mb-3">
                  <v-col cols="12" md="3"> </v-col>
                  <v-col cols="12" md="7">
                    <v-btn type="submit" small outlined color="indigo" class="mr-2"
                      >Password အသစ်ပြောင်းမည်</v-btn
                    >
                    <v-btn @click="Reset()" small outlined color="error">Reset</v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-form>
        </v-col>
      </v-card>
    </v-dialog>
    <!-- </v-col> -->
</div>
</template>

<script>
import Account from "../../models/account";
import AccountService from "../../services/accountservice"
export default {
  data() {
    return {
      isDisabled:false,
      snackbar: false,
      color: "",
      text: "",
      x: "right",
      y: "top",
      timeout: "5000",
      dialog: false,
      confirmpass:"",
      isshowcurrentpassword:true,
      passconfirmation:"",
      passconfirm:false,
      account:new Account(),
      currpassRules:[(v) => !!v || "Current password ထည့်ရန်လိုအပ်ပါသည်။"],
      newpassRules:[(v) => !!v || "New password ထည့်ရန်လိုအပ်ပါသည်။"],
      confirmpassRules:[(v)=>!!v||"Confirm password ထည့်ရန်လိုအပ်ပါသည်။"],
    };
  },

  created() {
    this.$emit("eventname", true);
    if(this.isshowcurrentpassword==true){
      this.currpassRules=(v) => !!v || "Current password ထည့်ရန်လိုအပ်ပါသည်။";
    }
  },
  methods:{
    ChangePassword(){
      var vm=this;
      if(//this.account.current_password==null || this.account.current_password=="" ||
         this.account.new_password==null || this.account.new_password==""){
           this.validate();
          }
      else{
        vm.isDisabled=true;
        if(vm.account.new_password===this.confirmpass){
          AccountService.ChangePassword(vm.account).then((result)=>{
            if(result.data.success){
                vm.Reset();
                vm.color = "success";
              }
              else{
                vm.color="red";
              }
              vm.snackbar = true;
              vm.text = result.data.messages[0];
              //vm.dialog=false;
              vm.isDisabled=false;
          })
        }
        else{
          this.passconfirmation="The password confirmation does not match.";
          this.passconfirm=true;
          vm.isDisabled=false;
        }
        
      }      
    },
    Reset(){
      this.$refs.form.resetValidation();
      this.account.new_password = "";
      this.confirmpass = "";
    },
    validate() {
            this.$refs.form.validate();
        },
  }

};
</script>
