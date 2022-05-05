<style scoped>
.theme--light.v-subheader.sub {
  float: left;
  margin-top: -35px;
}

</style>
<template>
  <div>
  <v-snackbar
        class="pt-0"
        :color="color"
        v-model="snackbar"
        :right="x"
        :timeout="timeout"
        :top="y">
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
          <span v-if="udata.role_id != 2">Create New Ministry</span>
          <span v-if="udata.role_id == 2">Change New Logo</span>
          <v-spacer></v-spacer>
          <v-icon color="primary" text @click="dialog = false; reset()" >mdi-close-circle</v-icon>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form
              autocomplete="off"
              @submit.prevent="Insert"
              ref="form"
              v-model="valid"
              lazy-validation
            >
              <v-row dense>
                <v-col cols="12" md="12">
                  <v-row dense>
                    <v-col cols="12" md="2">
                      <!-- <v-subheader>Ministry Name</v-subheader> -->
                    </v-col>
                    <v-col cols="12" md="8" class="text-center">
                      <picture-input
                      :prefill="ministry.imagebyte"
                      v-model="ministry.logo"
                        style="z-index: 0px"
                        ref="pictureInput"
                        @change="onChanged"
                        @remove="onRemoved"
                        :width="100"
                        :removable="true"
                        removeButtonClass="ui red button"
                        :height="100"
                        :hide-actions="hideActions"
                        :prefillOptions="{mediaType: 'image/png'}"
                        accept="image/png,image/jpeg"
                        buttonClass="mdi button info"
                        :customStrings="{
                          upload: '<h1>Upload it!</h1>',
                          drag: 'Upload Logo',
                        }"
                      >
                      </picture-input>
                    </v-col>
                  </v-row>
                  <v-row dense class="mt-3" v-if="udata.role_id != 2">
                    <v-col cols="12" md="3">
                      <v-subheader>Ministry Name<span class="red--text title"
                          >*</span
                        ></v-subheader>
                    </v-col>
                    <v-col cols="12" md="8">
                      <v-text-field
                      required
                      :rules="nameRules"
                      v-model="ministry.name"
                      outlined dense></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row dense>
                    <v-col cols="12" :md="udata.role_id != 2?0:2"> </v-col>
                    <v-col cols="12" md="8" class="text-center">
                      <v-btn v-if="udata.role_id != 2" type="submit" small outlined color="indigo" class="mr-2"
                        >Save</v-btn
                      >
                      <v-btn v-if="udata.role_id == 2" type="submit" small outlined color="indigo" class="mr-2"
                        >Logo ပြောင်းမည်</v-btn
                      >
                      <v-btn v-if="udata.role_id != 2" @click="reset()" small outlined color="error">Reset</v-btn>
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
import MinistryService from "../../services/ministryservice";
import Ministry from "../../models/ministry";
import PictureInput from "vue-picture-input";

export default {
  components: {
    PictureInput,
  },
  data() {
    return {
      image:"",
      file:"",
      dialog: false,
      valid: true,
      text: "",
      x: "right",
      y: "top",
      snackbar: false,
      color: "",
      isDisabled: false,
      ministry:new Ministry(),
      nameRules:[(v) => !!v || "Ministry ထည့်ရန်လိုအပ်ပါသည်။"],
    };
  },
  computed: {},
  created() {
    this.$emit("eventname", true);
    this.udata=JSON.parse(localStorage.getItem('user'));
  },
  methods:{
    Insert(){
      var vm=this;
      if(this.udata.role_id != 2){
        if(vm.ministry.name==null || vm.ministry.name==""){
        vm.validate();
      }
      else{
        vm.isDisabled = true;
        vm.ministry.logo=vm.$refs.pictureInput.file;
        MinistryService.InsertData(vm.ministry).then((result)=>{
          if(result.data.result.success){
            //for ministry log refresh
            this.image="";
            let user = JSON.parse(localStorage.getItem("user"));
             user.minlogo=result.data.base64Image;
             user.minname=result.data.ministryname;            
             localStorage.setItem('user',JSON.stringify(user));
            
          this.$router.go();
            vm.reset();
            vm.color = "success";
            //vm.ministry=[];
          }else {
            vm.color = "red";
          }
          vm.snackbar = true;
          vm.isDisabled = false;
          vm.text = result.data.result.messages[0];
        })
      }
      }
      else{
        vm.isDisabled = true;
        vm.ministry.logo=vm.$refs.pictureInput.file;
        vm.ministry.id = vm.udata.ministry_id;
        vm.ministry.name = vm.udata.minname;
        MinistryService.InsertData(vm.ministry).then((result)=>{
          if(result.data.result.success){
            //for ministry log refresh
            this.image="";
            let user = JSON.parse(localStorage.getItem("user"));
             user.minlogo=result.data.base64Image;
             user.minname=result.data.ministryname;            
             localStorage.setItem('user',JSON.stringify(user));
            
          this.$router.go();
            vm.reset();
            vm.color = "success";
            //vm.ministry=[];
          }else {
            vm.color = "red";
          }
          vm.snackbar = false;
          vm.isDisabled = false;
          vm.text = result.data.result.messages[0];
        })
      }
      
      
    },
    validate() {
      this.$refs.form.validate();
    },
    reset(){
      this.$refs.form.reset();
      this.ministry.imagebyte=null;
      this.ministry.imagebyte="";
    },
    onChanged() {
      console.log("New picture loaded");
      if (this.$refs.pictureInput.file) {
        this.image = this.$refs.pictureInput.file;
      } else {
        console.log("Old browser. No support for Filereader API");
      }
    },
    onRemoved() {
      this.image = "";
    },
  }
};
</script>
