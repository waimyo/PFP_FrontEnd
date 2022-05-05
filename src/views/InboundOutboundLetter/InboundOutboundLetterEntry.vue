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
      <v-card :disabled="isDisabled">
        <v-card-title class="grey black--text lighten-3">
          စာပေးပို့ခြင်း
          <v-spacer></v-spacer>
          <v-icon color="primary" text @click="dialog = false">mdi-close-circle</v-icon>
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
                  <v-row v-if="disabletouserlist" dense>
                    <v-col cols="12" md="3">
                      <v-subheader>DEO Account<span class="red--text title"
                          >*</span
                        ></v-subheader>
                    </v-col>
                    <v-col cols="12" md="7">
                      <v-autocomplete
                        v-model="inboxoutbox.receiver"
                        :items="touserlist"
                        item-text="username"
                        item-value="id"
                        :rules="receiverRules"
                        outlined
                        dense
                        chips
                        small-chips
                        multiple
                        required
                        clearable
                        autocomplete="off"

    >
    <template v-slot:selection="{ item }">
                          <v-chip small label color="primary">
                            {{ item.username }}
                          </v-chip>
                        </template>

      <template v-slot:prepend-item>
        <v-list-item
          ripple
          @click="toggle"
        >
          <v-list-item-action>
            <v-icon :color="inboxoutbox.receiver.length > 0 ? 'indigo darken-4' : ''">
              {{ icon }}
            </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              Select All
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider class="mt-2"></v-divider>
      </template>
     
            </v-autocomplete>

                      <!-- <v-autocomplete
                        v-model="inboxoutbox.receiver"
                        :items="touserlist"
                        item-text="username"
                        item-value="id"
                        :rules="receiverRules"
                        outlined
                        dense
                        chips
                        small-chips
                        multiple
                        required
                        clearable
                        autocomplete="off"
                      >
                        <template v-slot:selection="{ item }">
                          <v-chip small label color="primary">
                            {{ item.username }}
                          </v-chip>
                        </template></v-autocomplete
                      > -->
                    </v-col>
                  </v-row>

                  <v-row dense>
                    <v-col cols="12" md="3">
                      <v-subheader>Description<span class="red--text title"
                          >*</span
                        ></v-subheader>
                    </v-col>
                    <v-col cols="12" md="7">
                      <v-textarea v-model="inboxoutbox.description" outlined dense rows="5" :rules="descriptionRules"></v-textarea>
                    </v-col>
                  </v-row>

                  <v-row dense>
                    <v-col cols="12" md="3">
                      <v-subheader>Attatch တွဲရန်</v-subheader>
                    </v-col>
                    <v-col cols="12" md="7">
                      <v-file-input
                        v-model="inboxoutbox.file"
                        placeholder="Upload your file"
                        :prefillOptions="{mediaType: 'application/mrc'}"
                        multiple
                        outlined
                        dense                        
                        append-icon="mdi-file">
                        <template v-slot:selection="{ text }">
                          <v-chip small label color="primary">
                            {{ text }}
                          </v-chip>
                        </template>
                      </v-file-input>
                    </v-col>
                  </v-row>

                  <v-row dense>
                    <v-col cols="12" md="3"> </v-col>
                    <v-col cols="12" md="7">
                      <v-btn type="submit" small outlined color="indigo" class="mr-2">ပေးပို့မည်</v-btn>
                      <v-btn @click="reset()" small outlined color="error">ပြန်လည်ရွေးချယ်မည်</v-btn>
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
//import DropDownService from "../../services/dropdownservice";
import InboxOutboxService from "../../services/inboxoutbox.service";
import InboxOutbox from "../../models/inboxoutbox";

export default {
  data() {
    return {
      touserlist:[],
      disabletouserlist:false,
      isDisabled: false,
      //ismaindescription:true,
      files:new FormData(),
      inboxoutbox:new InboxOutbox(),
      dialog: false,
      valid: true,
      snackbar: false,
      color: "",
      text: "",
      x: "right",
      y: "top",
      receiverRules:[(v) => !!v || "DEO Account ရွေးရန်လိုအပ်ပါသည်။"],
      descriptionRules:[(v) => !!v || "Description ထည့်ရန်လိုအပ်ပါသည်။"],
    };
  },
  computed: {
    likesAllFruit () {
        return this.inboxoutbox.receiver.length === this.touserlist.length
      },
      likesSomeFruit () {
        return this.inboxoutbox.receiver.length > 0 && !this.likesAllFruit
      },
      icon () {
        if (this.likesAllFruit) return 'mdi-close-box'
        if (this.likesSomeFruit) return 'mdi-minus-box'
        return 'mdi-checkbox-blank-outline'
      },
  },
  created() {
    this.$emit("eventname", true);
  },
  methods:{
    Insert(){
      var vm=this;
      if(this.inboxoutbox.receiver.length==0 || this.inboxoutbox.description=="" || this.inboxoutbox.description==null){
        this.validate();
      }
      else{
        // if(this.likesAllFruit){
        //    this.inboxoutbox.receiver = [];
        //     this.touserlist.forEach(user => {
        //     this.inboxoutbox.receiver.push(user.id)
        //    });
        // }
        vm.isDisabled=true;
        if(vm.inboxoutbox.file==undefined){vm.inboxoutbox.file=null;}
        InboxOutboxService.InsertData(vm.inboxoutbox).then((result)=>{
          if(result.data.result.success){
            var msg= result.data.result.messages[0];           
            if(vm.inboxoutbox.file !=null){
              for (let i = 0; i < vm.inboxoutbox.file.length; i++){
                vm.files.append("file",vm.inboxoutbox.file[i]);
              }
              InboxOutboxService.InsertAttachFile(vm.files,result.data.chatid).then(result=>{
                console.log(result);
                vm.reset();
                vm.isDisabled=false;
                vm.color = "success"; 
                vm.snackbar = true;
                vm.text = msg;
                vm.files=new FormData();
                if(vm.inboxoutbox.ismaindescription==true){
              this.$emit("getData");
            }
            else{
              this.$emit("getDetailData");
            }
              })
              // for (let i = 0; i < vm.inboxoutbox.file.length; i++){
              // InboxOutboxService.InsertAttachFile(vm.inboxoutbox.file[i],result.data.chatid).then(result=>{
              //   console.log(result);
              //   result.data.result.success=result.data;
              // })
            // }            
            }   
            else{
            vm.reset();
            vm.isDisabled=false;
            vm.color = "success"; 
            vm.snackbar = true;
            vm.text = msg;
            if(vm.inboxoutbox.ismaindescription==true){
              this.$emit("getData");
            }
            else{
              this.$emit("getDetailData");
            }
            } 
            }
              else{
                vm.color="red";
                vm.snackbar = true;
              vm.text = result.data.result.messages[0];
              }
        })
      }
    },
    
    validate() {
            this.$refs.form.validate();
        },
        reset() {
            this.$refs.form.reset();
        },

        toggle () {
        this.$nextTick(() => {
          if (this.likesAllFruit) {
            this.inboxoutbox.receiver = []
          } else {
            this.inboxoutbox.receiver = [];
          this.touserlist.forEach(user => {
            this.inboxoutbox.receiver.push(user.id)
          });
          //this.inboxoutbox.receiver = this.touserlist;
            //window.console.log(this.inboxoutbox.receiver)
          }
        })
      },

  },
};
</script>
