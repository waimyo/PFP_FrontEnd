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
                Create New CPU Account
                <v-spacer></v-spacer>
                <v-icon color="primary" text @click="dialog = false;reset()">mdi-close-circle</v-icon>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-form @submit.prevent="Insert" autocomplete="off" ref="form" v-model="valid" lazy-validation>
                        <v-row dense>
              <v-col cols="12" md="12">
                <v-row dense>
                  <v-col cols="12" md="3">
                    <v-subheader>Name
                      <span class="red--text title">*</span>
                    </v-subheader>
                  </v-col>
                  <v-col cols="12" md="8">
                    <v-text-field v-model="account.name" :rules="nameRules" outlined dense></v-text-field>
                  </v-col>
                </v-row>
                <v-row dense>
                  <v-col cols="12" md="3">
                    <v-subheader>Account Link</v-subheader>
                  </v-col>
                  <v-col cols="12" md="8">
                    <v-autocomplete 
                    item-text="username" 
                    item-value="id" 
                    :items="ministrylist" 
                    v-model="account.parent_id"
                    :rules="ministryRules" 
                    :disabled="disableDropdown"
                    @change="GetUserName"
                    clearable
                    outlined dense></v-autocomplete>
                  </v-col>
                </v-row>
                <v-row dense>
                  <v-col cols="12" md="3">
                    <v-subheader>User Name</v-subheader>
                  </v-col>
                  <v-col cols="12" md="8">
                    <v-text-field v-model="account.username" :rules="usernameRules" outlined dense placeholder="Please write username in English only" disabled></v-text-field>
                  </v-col>
                </v-row>
                <v-row dense>
                  <v-col cols="12" md="3">
                    <v-subheader>Password
                      <span class="red--text title">*</span>
                    </v-subheader>
                  </v-col>
                  <v-col cols="12" md="8">
                    <v-text-field v-model="account.password" :rules="passwordRules" outlined dense placeholder="Please write password in English only" :disabled="disableDropdown"
                    :append-icon="showpass ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showpass = !showpass"
                    :type="showpass ? 'text' : 'password'"
                     >
                      
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row dense>
                  <v-col cols="12" md="3">
                    <v-subheader>Email Address
                      <span class="red--text title">*</span>
                    </v-subheader>
                  </v-col>
                  <v-col cols="12" md="8">
                    <v-text-field v-model="account.email" :rules="emailaddressRules" outlined dense></v-text-field>
                  </v-col>
                </v-row>

                <v-row dense>
                  <v-col cols="12" md="3"> </v-col>
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
          isDisabled: false,
          disableReset:true,
            ministrylist: [],
            account:new Account(),
            valid: true,
            dialog: false,
            snackbar: false,
            color: "",
            text: "",
            x: "right",
            y: "top",
            showpass:false,
            nameRules: [(v) => !!v || "Name ထည့်ရန်လိုအပ်ပါသည်။"],
           //usernameRules: [(v) => !!v || "User Name ထည့်ရန်လိုအပ်ပါသည်။"],
            passwordRules: [(v) => !!v || "Password ထည့်ရန်လိုအပ်ပါသည်။"],
            emailaddressRules: [(v) => !!v || "Email Address ထည့်ရန်လိုအပ်ပါသည်။"],
        };
    },
    computed: {},
    created() {
        this.$emit("eventname", true);
        //this.GetMinistryAccount();
    },
    methods: {
        GetMinistryAccount() {
            var vm = this;
            DropDownService.GetMinistryAccount().then(result => {
                vm.ministrylist = result.data;
            });
        },
        GetUserName(){
          DropDownService.GetUserNameCPU(this.account.parent_id).then(result=>{
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
              vm.account.role_id=3;
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
            this.$refs.form.reset();
            this.disableDropdown=false;
        },
    }
};
</script>
