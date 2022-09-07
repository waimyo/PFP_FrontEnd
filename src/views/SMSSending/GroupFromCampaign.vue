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
          :top="y"
        >
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
              Create New Group
              <v-spacer></v-spacer>
              <v-icon
                color="primary"
                text
                @click="
                  dialog = false;
                  reset();
                "
                >mdi-close-circle</v-icon
              >
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
                        <v-col cols="12" md="3">
                          <v-subheader>Group Name<span class="red--text title"
                              >*</span
                            ></v-subheader>
                        </v-col>
                        <v-col cols="12" md="8">
                          <v-text-field
                          v-model="groupname"
                            outlined
                            dense
                            :rules="groupRules"
                          ></v-text-field>
                        </v-col>
                      </v-row>
    
                      <v-row dense>
                        <v-col cols="12" md="3"> </v-col>
                        <v-col cols="12" md="8">
                          <v-btn type="submit" small outlined color="indigo" class="mr-2"
                            >Save</v-btn
                          >
                          <v-btn @click="reset()" small outlined color="error"
                            >Reset</v-btn
                          >
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
        import groupService from '../../services/groupservice';
    export default {
      data() {
        return {
          isDisabled:false,
          dialog: false,
          valid: true,
          text: "",
          snackbar: false,
          color: "",
          timeout: "5000",
          x: "right",
          y: "top",
          groupRules: [(v) => !!v || "Group Name ထည့်ရန်လိုအပ်ပါသည်။"],
          groupname:"",
          datainfolist:[],
        };
      },
      computed: {},
      created() {
        this.$emit("eventname", true);
      },
    
      methods: {        
        validate() {
          this.$refs.form.validate();
        },
        reset() {
          this.$refs.form.reset();
        },
        Insert(){
            let vm=this;
            groupService.CreateGroupFromCampaign(this.groupname, this.datainfolist).then((result) => {
          if (result.data.success) {
            vm.reset();

            vm.color = "success";
            vm.department = [];
          } else {
            vm.color = "red";
          }
          vm.isDisabled=false;
          vm.snackbar = true;
          vm.text = result.data.messages[0];
        });
        }
      },
    };
    </script>
    