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
    <div v-show="isExactActive">
      <v-col cols="12" md="12">
        <v-card>
          <v-card-title> Add New Contacts Group</v-card-title>
          <v-divider></v-divider>
          <v-col cols="12" md="12">
            <v-form
              autocomplete="off"
              @submit.prevent="NextStep"
              ref="form"
              v-model="valid"
              lazy-validation
            >
              <v-row dense>
                <v-col cols="12" md="12" class="mt-5 mb-5">
                  <v-row dense>
                    <v-col cols="12" md="3">
                      <v-subheader>Group Name<span class="red--text title"
                          >*</span
                        ></v-subheader>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                      required
                        :rules="nameRules"
                        v-model="group.name"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row dense>
                    <v-col cols="12" md="3">
                      <v-subheader>အချက်အလက်များရွေးရန် </v-subheader>
                    </v-col>
                    <!-- :items="['All Departments', 'Dept1']" -->
                    <v-col cols="12" md="3">
                      <v-autocomplete
                        v-model="group.department_id"
                        item-text="name"
                        item-value="id"
                        :items="departmentlist"
                        outlined
                        dense
                        @change="OnChangeDepartment"
                        :rules="departmentRules"
                        
                      ></v-autocomplete>

                      <v-subheader class="sub">ဦးစီးဌာန</v-subheader>
                    </v-col>
                    <!-- :items="['All Services', 'Service1']" -->
                    <v-col cols="12" md="3">
                      <v-autocomplete
                        v-model="group.service_id"
                        item-text="name"
                        item-value="id"
                        :items="servicelist"
                        outlined
                        dense
                        :rules="serviceRules"
                      ></v-autocomplete>
                      <v-subheader class="sub">ဝန်ဆောင်မှု</v-subheader>
                    </v-col>
                  </v-row>

                  <v-row dense class="mb-5">
                    <v-col cols="12" md="3">
                      <v-subheader>နေ့စွဲ</v-subheader>
                    </v-col>
                    <v-col cols="12" md="3">
                      <date-picker
                        v-model="group.fromdate"
                        valueType="YYYY-MM-DD"
                        format="DD/MM/YYYY"
                        :editable="true"
                        placeholder="ရွေးချယ်ပါ"
                        clearable
                      >
                      </date-picker>
                      <!-- <span
                        v-show="fdatevalidate"
                        style="letter-spacing: 0; font-size: 12px; margin-top: -17px"
                        class="red--text ml-2"
                      >
                        ရွေးရန်လိုအပ်ပါသည်။
                      </span> -->
                      <!-- <v-autocomplete
                        v-model="group.fromdate"
                        item-text="created_date"
                        item-value="created_date"
                        :items="createddatelist"
                        outlined
                        dense
                        clearable
                      ></v-autocomplete> -->
                    </v-col>
                    <v-col cols="12" md="3">
                      <date-picker
                        v-model="group.todate"
                        valueType="YYYY-MM-DD"
                        format="DD/MM/YYYY"
                        :editable="true"
                        placeholder="ရွေးချယ်ပါ"
                        clearable
                      >
                      </date-picker>
                      <!-- <span
                        v-show="tdatevalidate"
                        style="letter-spacing: 0; font-size: 12px; margin-top: -17px"
                        class="red--text ml-2"
                      >
                        ရွေးရန်လိုအပ်ပါသည်။
                      </span> -->
                      <!-- <v-autocomplete
                        v-model="group.todate"
                        item-text="created_date"
                        item-value="created_date"
                        :items="createddatelist"
                        outlined
                        dense
                        clearable
                      ></v-autocomplete> -->
                    </v-col>
                  </v-row>
                  <v-row dense>
                    <v-col cols="12" md="3">
                      <v-subheader>Uploaded By</v-subheader>
                    </v-col>
                    <v-col cols="12" md="6">
                      <!--v-autocomplete
                        v-model="group.uploadedby"
                        item-text="name"
                        item-value="id"
                        :items="userlist"
                        outlined
                        dense
                        :rules="uploadRules"
                        chips
                        small-chips
                        multiple
                        required
                        clearable
                        autocomplete="off"
                      >
                    </v-autocomplete-->
                    <v-autocomplete
                          v-model="group.uploadedby"
                          :items="userlist"
                          :rules="uploadRules"
                          required
                          small-chips
                          deletable-chips
                          chips
                          outlined
                          dense
                          item-text="name"
                          item-value="id"
                          autocomplete="off"
                          multiple >
                          <template v-slot:selection="{ item }">
                          <v-chip small label color="primary">
                            {{ item.name }}
                          </v-chip>
                        </template>
                          <template v-slot:prepend-item>
        <v-list-item
          ripple
          @click="toggle"
        >
          <v-list-item-action>
            <v-icon :color="group.uploadedby.length > 0 ? 'indigo darken-4' : ''">
              {{ icon }}
            </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              Uploaded by All
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider class="mt-2"></v-divider>
      </template>
                        </v-autocomplete>
                    </v-col>
                  </v-row>

                  <!-- :items="['Uploaded By All', 'CPU_Training', 'DEO_Training']" -->
                  <!-- <v-row dense>
                    <v-col cols="12" md="3"> </v-col>
                    
                    <v-col cols="12" md="6">
                      <v-autocomplete
                        v-model="group.uploadby"
                        item-text="name"
                        item-value="id"
                        :items="userlist"
                        outlined
                        dense
                        clearable
                      ></v-autocomplete>
                    </v-col>
                  </v-row> -->

                  <v-row dense>
                    <v-col cols="12" md="3"> </v-col>
                    <v-col cols="12" md="6">
                      <!-- <router-link :to="{ path: 'GroupEntry/GroupConfirm' }"> -->
                      <v-btn type="submit" small outlined color="indigo" class="mr-2"
                        >ရှေ့ဆက်ပြုလုပ်မည်</v-btn
                      >
                      <!-- </router-link> -->
                      <v-btn @click="Reset" small outlined color="error">ပြန်လည်ရွေးချယ်မည်</v-btn>
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
import Group from "../../models/group";
//import GroupService from "../../services/groupservice";
import DropdownService from "../../services/dropdownservice";
export default {
  data() {
    return {
      //dept: "All Departments",
      //service: "All Services",
      //uploadby: "Uploaded By All",
      isExactActive: true,

      group: new Group(),
      departmentlist: [],
      servicelist: [],
      createddatelist: [],
      userlist: [],

      nameRules: [(v) => !!v || "အုပ်စုအမည်ထည့်ရန်လိုအပ်ပါသည်။"],
      //departmentRules: [(v) => !!v || "ဌာနအမည်ရွေးချယ်ရန်လိုအပ်ပါသည်။"],
      //serviceRules: [(v) => !!v || "ဝန်ဆောင်မှုရွေးချယ်ရန်လိုအပ်ပါသည်။"],
      //uploadRules: [(v) => !!v || "ပေးပို့သည့်အမည်ရွေးချယ်ရန်လိုအပ်ပါသည်။"],
      fdatevalidate: false,
      tdatevalidate: false,

      loading: false,
      text: "",
      snackbar: false,
      color: "",
      timeout: "5000",
      x: "right",
      y: "top",
    };
  },

  watch: {
    // "group.fromdate"(val) {
    //   if (val != null && val != undefined) {
    //     this.fdatevalidate = false;
    //   } else {
    //     this.fdatevalidate = true;
    //   }
    // },
    // "group.todate"(val) {
    //   if (val != null && val != undefined) {
    //     this.tdatevalidate = false;
    //   } else {
    //     this.tdatevalidate = true;
    //   }
    // },
  },
  computed: {
    likesAllFruit () {
        return this.group.uploadedby.length === this.userlist.length
      },
      likesSomeFruit () {
        return this.group.uploadedby.length > 0 && !this.likesAllFruit
      },
      icon () {
        if (this.likesAllFruit) return 'mdi-close-box'
        if (this.likesSomeFruit) return 'mdi-minus-box'
        return 'mdi-checkbox-blank-outline'
      },
  },

  created() {
    this.$emit("eventname", true);


    //this.GetCreatedDateList();

    if (this.$route.params.groupstatus === "success") {
      this.snackbar = true;
      this.color = "success";
      this.text = this.$route.params.groupmessage;
    }
    else if(this.$route.params.groupstatus === "fail"){
      this.group = this.$route.params.group;
      this.snackbar = true;
      this.color = "red";
      this.text = this.$route.params.groupmessage;
    }
    let user = JSON.parse(localStorage.getItem("user"));
    this.group.userid = user.id;
    this.group.ministry_id = user.ministry_id;
    this.GetUserList();
    this.GetDepartment();
    this.OnChangeDepartment();
    this.GetService();
  },

  methods: {
    GetDepartment() {
      var vm = this;
      DropdownService.GetDepartment(vm.group.ministry_id).then((result) => {
        vm.departmentlist = result.data;
        vm.departmentlist.splice(0, 0, {
          id: 0,
          name: "All Departments",
        });
      });
    },
    OnChangeDepartment() {
      var vm = this;
      DropdownService.GetService(vm.group.department_id).then((result) => {
        vm.servicelist = result.data;
        vm.servicelist.splice(0, 0, {
          id: 0,
          name: "All Services",
        });
        vm.group.service_id = 0;
      });
    },
    // GetCreatedDateList() {
    //   var vm = this;
    //   DropdownService.GetCreatedDateList(1).then((result) => {
    //     vm.createddatelist = result.data;
    //   });
    // },
    GetUserList() {
      var vm = this;
      DropdownService.GetUserList(vm.group.userid).then((result) => {
        vm.userlist = result.data;
        // vm.userlist.splice(0, 0, {
        //   id: 0,
        //   name: "Uploaded by All",
        // });
      });
    },

    NextStep() {
      // if (
      //   (this.group.fromdate == "" || this.group.fromdate == null) &&
      //   (this.group.todate == "" || this.group.todate == null)
      // ) {
      //   this.fdatevalidate = true;
      //   this.tdatevalidate = true;
      // }
      if (
        // this.group.name == "" ||
        // this.group.name == null ||
        // (this.group.name == undefined && this.group.department_id == "") ||
        // (this.group.department_id == 0 && this.group.service_id == 0) ||
        // (this.group.service_id == undefined && this.group.uploadedby == 0) ||
        // this.group.uploadedby == undefined
        this.group.name == "" ||
        this.group.name == null ||
        this.group.name == undefined

        // (this.group.name == "" ||
        //   this.group.name == null ||
        //   this.group.name == undefined) &&
        // this.group.department_id == 0 &&
        // this.group.service_id == 0 &&
        // this.group.uploadedby == 0
      ) {
        this.validate();
      } else {
        this.$router.push({
          name: "GroupConfirm",
          params: {
            glist: this.group,
          },
        });
      }
    },

    Reset() {
      this.group = new Group();
      this.OnChangeDepartment();
      this.$refs.form.resetValidation();
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
            this.group.uploadedby = []
          } else {
            this.group.uploadedby = [];
          this.userlist.forEach(user => {
            this.group.uploadedby.push(user.id)
          });
          }
        })
      },
  },

  updated() {
    this.isExactActive = typeof this.$refs.rv === "undefined";
  },

  mounted() {
    this.isExactActive = typeof this.$refs.rv === "undefined";
  },
};
</script>
