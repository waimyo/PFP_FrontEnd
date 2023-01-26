<style scoped>
.theme--light.v-subheader.sub {
  float: left;
  margin-top: -10px;
}
</style>
<template>
  <div>
    <v-progress-linear
      :active="loading"
      rounded
      indeterminate
      absolute
      top
      height="3"
      color="warning"
    ></v-progress-linear>
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
    <v-col cols="12" md="12">
      <v-card :disabled="isDisabled">
        <v-card-title> Create New Data</v-card-title>
        <v-divider></v-divider>
        <v-col cols="12" md="12">
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
                    <v-subheader
                      >အမည်
                      <span class="red--text title">*</span>
                    </v-subheader>
                  </v-col>
                  <v-col cols="12" md="8">
                    <v-text-field
                      v-model="data.name"
                      :rules="nameRules"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row dense>
                  <v-col cols="12" md="2">
                    <v-subheader
                      >ဖုန်းနံပါတ်
                      <span class="red--text title">*</span>
                    </v-subheader>
                  </v-col>
                  <v-col cols="12" md="8">
                    <!--VuePhoneNumberInput v-model="data.mobile"  clearable @update="onUpdate"/-->
                    <v-text-field
                      v-model="data.mobile"
                      :rules="mobileRules"
                      outlined
                      dense
                      placeholder="Mobile(09xxxxxxxxx)"
                      onkeydown="javascript: return event.keyCode === 8 || event.keyCode === 46 ? true : !isNaN(Number(event.key))"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row dense>
                  <v-col cols="12" md="2">
                    <v-subheader>ကျား/မ</v-subheader>
                  </v-col>
                  <v-col cols="12" md="8">
                    <v-autocomplete
                      v-model="data.gender"
                      item-text="Name"
                      item-value="Id"
                      :rules="genderRules"
                      autocomplete="off"
                      outlined
                      dense
                      :items="gender"
                    >
                    </v-autocomplete>
                  </v-col>
                </v-row>
                <v-row dense>
                  <v-col cols="12" md="2">
                    <v-subheader>ဝန်ကြီးဌာန</v-subheader>
                  </v-col>
                  <v-col cols="12" md="8">
                    <v-autocomplete
                      v-model="data.ministry_id"
                      :rules="ministryRules"
                      item-text="name"
                      item-value="id"
                      autocomplete="off"
                      :items="ministrylist"
                      @change="GetDepartment"
                      outlined
                      dense
                      clearable
                      placeholder="ဝန်ကြီးဌာနရွေးချယ်ပါ"
                      disabled
                      filled
                    >
                    </v-autocomplete>
                  </v-col>
                </v-row>
                <v-row dense>
                  <v-col cols="12" md="2">
                    <v-subheader
                      >ဦးစီးဌာန
                      <span class="red--text title">*</span>
                    </v-subheader>
                  </v-col>
                  <v-col cols="12" md="8">
                    <v-autocomplete
                      v-model="data.department_id"
                      item-text="name"
                      item-value="id"
                      autocomplete="off"
                      :items="departmentlist"
                      :rules="deptRules"
                      @change="GetService"
                      outlined
                      dense
                      clearable
                      placeholder="ဦးစီးဌာနရွေးချယ်ပါ"
                    ></v-autocomplete>
                  </v-col>
                </v-row>
                <v-row dense>
                  <v-col cols="12" md="2">
                    <v-subheader
                      >ဝန်ဆောင်မှုအမျိုးအစား
                      <span class="red--text title">*</span>
                    </v-subheader>
                  </v-col>
                  <v-col cols="12" md="8">
                    <v-autocomplete
                      v-model="data.service_id"
                      item-text="name"
                      item-value="id"
                      autocomplete="off"
                      :items="servicelist"
                      :rules="servRules"
                      outlined
                      dense
                      clearable
                      placeholder="ဝန်ဆောင်မှုအမျိုးအစားရွေးချယ်ပါ"
                    ></v-autocomplete>
                  </v-col>
                </v-row>
                <v-row dense>
                  <v-col cols="12" md="2">
                    <v-subheader
                      >တည်နေရာ
                      <span class="red--text title">*</span>
                    </v-subheader>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-autocomplete
                      v-model="data.location_state"
                      item-text="Name"
                      item-value="ID"
                      autocomplete="off"
                      :items="statedivisionlist"
                      @change="GetDistrict"
                      :rules="stateRules"
                      outlined
                      dense
                      placeholder="တိုင်းဒေသကြီး/ပြည်နယ်ရွေးချယ်ပါ"
                      clearable
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-autocomplete
                      v-model="data.location_district"
                      item-text="Name"
                      item-value="ID"
                      autocomplete="off"
                      :items="districtlist"
                      @change="GetTownship"
                      outlined
                      dense
                      placeholder="ခရိုင်ရွေးချယ်ပါ"
                      clearable
                    ></v-autocomplete>
                    <div
                      v-show="districtvalidate"
                      style="letter-spacing: 0; font-size: 12px;"
                      class="red--text ml-2 mt-n5"
                    >
                      ခရိုင်ရွေးရန်လိုအပ်ပါသည်။
                    </div>
                  </v-col>
                  <v-col cols="12" md="2">
                    <v-autocomplete
                      v-model="data.location_township"
                      item-text="Name"
                      item-value="ID"
                      autocomplete="off"
                      :items="townshiplist"
                      :rules="townshipRules"
                      outlined
                      dense
                      clearable
                      placeholder="မြို့နယ်ရွေးချယ်ပါ"
                    ></v-autocomplete>
                  </v-col>
                  <input
                    class="mt-3 ml-2"
                    type="checkbox"
                    value="true"
                    v-model="isalltownship"
                    @change="GetAllTownshipByMinistry"
                  /><span class="mt-2 ml-2">All Township</span>
                </v-row>

                <v-row dense>
                  <v-col cols="12" md="2">
                    <v-subheader>Service Dates</v-subheader>
                  </v-col>
                  <v-col cols="12" md="4">
                    <date-picker
                      v-model="data.date_of_application"
                      valueType="YYYY-MM-DD"
                      format="DD/MM/YYYY"
                      :editable="true"
                      placeholder="ရွေးချယ်ပါ"
                      clearable
                    ></date-picker
                    ><span
                      v-show="applicationdatevalidate"
                      style="letter-spacing: 0; font-size: 12px;"
                      class="red--text ml-2"
                      >ဝန်ဆောင်မှုရယူရန်
                      ရုံးသို့လာရောက်သည့်နေ့ထည့်ရန်လိုအပ်ပါသည်။</span
                    >
                    <v-subheader class="sub"
                      >ဝန်ဆောင်မှုရယူရန် ရုံးသို့လာရောက်သည့်နေ့</v-subheader
                    >
                  </v-col>
                  <v-col cols="12" md="4">
                    <date-picker
                      v-model="data.date_of_completion"
                      valueType="YYYY-MM-DD"
                      format="DD/MM/YYYY"
                      :editable="true"
                      placeholder="ရွေးချယ်ပါ"
                      clearable
                    ></date-picker
                    ><span
                      v-show="completiondatevalidate"
                      style="letter-spacing: 0; font-size: 12px;"
                      class="red--text ml-2"
                      >ဝန်ဆောင်မှုရရှိခဲ့သည့်နေ့ထည့်ရန်လိုအပ်ပါသည်။</span
                    >
                    <v-subheader class="sub"
                      >ဝန်ဆောင်မှုရရှိခဲ့သည့်နေ့</v-subheader
                    >
                  </v-col>
                </v-row>
                <v-row dense class="mt-n3">
                  <v-col cols="12" md="2"></v-col>
                  <v-col cols="12" md="10">
                    <span
                      v-show="comparedate"
                      style="letter-spacing: 0; font-size: 12px;"
                      class="red--text ml-2"
                      >{{ comparedateRule }}</span
                    >
                  </v-col>
                </v-row>
                <v-row dense>
                  <v-col cols="12" md="2" class="text-right">
                    <label style="font-size: 13px;"
                      >အချက်အလက်များတင်သွင်းသည့်နေ့</label
                    >
                  </v-col>
                  <v-col cols="12" md="8">
                    <v-text-field
                      v-model="created_date"
                      outlined
                      dense
                      disabled
                      filled
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row dense>
                  <v-col cols="12" md="2"> </v-col>
                  <v-col cols="12" md="8">
                    <v-btn
                      type="submit"
                      small
                      outlined
                      color="indigo"
                      class="mr-2"
                      >သိမ်းမည်</v-btn
                    >
                    <v-btn @click="reset()" small outlined color="error"
                      >ပြန်လည်ရွေးချယ်မည်</v-btn
                    >
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-form>
        </v-col>
      </v-card>
    </v-col>
  </div>
</template>

<script>
import DataService from "../../services/dataservice";
import Data from "../../models/data";
import DropDownService from "../../services/dropdownservice";
//import VuePhoneNumberInput from 'vue-phone-number-input';

export default {
  // components: {
  //       VuePhoneNumberInput,
  //   },
  data() {
    return {
      loading: false,
      ex7: "red",
      showMessages: true,
      valid: true,
      text: "",
      snackbar: false,
      isDisabled: false,
      color: "",
      x: "right",
      y: "top",
      savevalidate: true,
      isalltownship: false,
      applicationdatevalidate: false,
      completiondatevalidate: false,
      districtvalidate: false,
      comparedateRule: "",
      comparedate: false,
      data: new Data(),
      ministrylist: [],
      departmentlist: [],
      servicelist: [],
      statedivisionlist: [],
      districtlist: [],
      townshiplist: [],
      created_date: "",
      userdata: "",
      gender: [
        { Id: true, Name: "ကျား" },
        { Id: false, Name: "မ" },
      ],
      nameRules: [(v) => !!v || "အမည်ထည့်ရန်လိုအပ်ပါသည်။"],
      mobileRules: [(v) => !!v || "ဖုန်းနံပါတ်ထည့်ရန်လိုအပ်ပါသည်။"],
      ministryRules: [(v) => !!v || "ဝန်ကြီးဌာနရွေးရန်လိုအပ်ပါသည်။"],
      deptRules: [(v) => !!v || "ဦးစီးဌာနရွေးရန်လိုအပ်ပါသည်။"],
      servRules: [(v) => !!v || "ဝန်ဆောင်မှုအမျိုးအစားရွေးရန်လိုအပ်ပါသည်။"],
      stateRules: [(v) => !!v || "တိုင်းဒေသကြီး/ပြည်နယ်ရွေးရန်လိုအပ်ပါသည်။"],
      townshipRules: [(v) => !!v || "မြို့နယ်ရွေးရန်လိုအပ်ပါသည်။"],
    };
  },
  computed: {
    messages() {
      return this.showMessages ? ["Active"] : undefined;
    },
  },
  created() {
    this.getNowDateTime();
    this.$emit("eventname", true);
    this.GetMinistry();
    this.GetStateDivision();
    //
    this.userdata = JSON.parse(localStorage.getItem("user"));
    this.data.ministry_id = this.userdata.ministry_id;
    this.GetDepartment();
  },
  methods: {
    Insert() {
      var vm = this;
      vm.savevalidate = true;
      if (
        vm.data.name == null ||
        vm.data.name == "" ||
        vm.data.mobile == null ||
        vm.data.mobile == "" ||
        vm.data.service_id == 0 ||
        vm.data.service_id == undefined ||
        vm.data.service_id == "" ||
        vm.data.department_id == 0 ||
        vm.data.department_id == undefined ||
        vm.data.department_id == "" ||
        vm.data.ministry_id == 0 ||
        vm.data.date_of_completion == "" ||
        vm.data.location_state == 0 ||
        vm.data.location_state == undefined ||
        vm.data.location_state == "" ||
        vm.data.location_township == 0 ||
        vm.data.location_township == undefined ||
        vm.data.location_township == ""
      ) {
        vm.validate();
        vm.savevalidate = false;
        //alert("First If " + vm.service_id);
      }
      if (vm.data.location_district == 0 && vm.isalltownship == false) {
        vm.savevalidate = false;
        vm.districtvalidate = true;
        //alert("Second If " + vm.savevalidate);
      }
      if (vm.comparedate == true) {
        vm.savevalidate = false;
        vm.comparedate == true;
        //alert("Third If " + vm.savevalidate);
      }
      if (
        vm.data.date_of_application == null ||
        vm.data.date_of_application == ""
      ) {
        vm.savevalidate = false;
        vm.applicationdatevalidate = true;
        //alert("Fourth If " + vm.savevalidate);
      }
      if (
        vm.data.date_of_completion == null ||
        vm.data.date_of_completion == ""
      ) {
        vm.savevalidate = false;
        vm.completiondatevalidate = true;
        //alert("Fifth If " + vm.savevalidate);
      }
      if (vm.data.mobile.startsWith("09")) {
        this.mo = true;
        //alert("Six If " + vm.savevalidate);
      } else {
        //alert("First Else " + vm.savevalidate);
        this.mo = false;
        vm.color = "red";
        vm.snackbar = true;
        vm.text = "ဖုန်းနံပါတ် 09 ဖြင့်စရပါမည်";
      }
      if (vm.savevalidate == true && this.mo == true) {
        vm.loading = true;
        vm.isDisabled = true;
        DataService.InsertData(vm.data).then((result) => {
          if (result.data.success) {
            vm.reset();
            vm.color = "success";
            vm.data = [];
            vm.isalltownship = false;
            vm.townshiplist = [];
          } else {
            vm.color = "red";
          }
          vm.data.gender = true;
          vm.data.ministry_id = vm.userdata.ministry_id;
          vm.loading = false;
          vm.isDisabled = false;
          vm.snackbar = true;
          vm.text = result.data.messages[0];
          vm.districtvalidate = false;
          vm.applicationdatevalidate = false;
          vm.completiondatevalidate = false;
        });
      }
    },
    GetMinistry() {
      var vm = this;
      DropDownService.GetMinistry().then((result) => {
        vm.ministrylist = result.data;
      });
    },
    GetDepartment() {
      var vm = this;
      DropDownService.GetDepartment(vm.data.ministry_id).then((result) => {
        vm.departmentlist = result.data;
      });
    },
    GetService() {
      var vm = this;
      DropDownService.GetService(vm.data.department_id).then((result) => {
        vm.servicelist = result.data;
      });
    },
    GetStateDivision() {
      var vm = this;
      DropDownService.GetAllStateDivision().then((result) => {
        vm.statedivisionlist = result.data;
      });
    },
    GetDistrict() {
      var vm = this;
      vm.townshiplist = [];
      DropDownService.GetAllDistrict(vm.data.location_state).then((result) => {
        vm.districtlist = result.data;
      });
    },
    GetTownship() {
      var vm = this;
      vm.isalltownship = false;
      vm.townshiplist = [];
      DropDownService.GetAllTownship(vm.data.location_district).then(
        (result) => {
          vm.townshiplist = result.data;
        }
      );
    },
    GetAllTownshipByMinistry() {
      var vm = this;
      if (vm.data.location_state > 0 && vm.isalltownship === true) {
        DropDownService.GetAllTownshipByMinistry(vm.data.location_state).then(
          (result) => {
            vm.townshiplist = result.data;
            vm.data.location_district = 0;
          }
        );
        vm.districtvalidate = false;
      } else if (vm.isalltownship === false) {
        //vm.districtvalidate=true;
        vm.townshiplist = [];
      }
    },
    getNowDateTime() {
      const today = new Date();
      const date =
        String(today.getDate()).padStart(2, "0") +
        "-" +
        String(today.getMonth() + 1).padStart(2, "0") +
        "-" +
        today.getFullYear();
      this.created_date = date;
    },

    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.resetValidation();
      //this.$refs.form.reset();
      this.data.name = "";
      this.data.mobile = "";
      this.data.gender = true;
      this.data.service_id = 0;
      this.data.department_id = 0;
      this.data.date_of_application = "";
      this.data.date_of_completion = "";
      this.data.location_state = 0;
      this.data.location_district = 0;
      this.data.location_township = 0;
      this.districtlist = [];
      this.townshiplist = [];
      this.servicelist = [];
      this.isalltownship = false;
      this.districtvalidate = false;
      this.applicationdatevalidate = false;
      this.completiondatevalidate = false;
    },
    CalculateDate() {
      var appdate = new Date(this.data.date_of_application);
      var compdate = new Date(this.data.date_of_completion);
      var nowdate = new Date();
      this.comparedate = false;
      if (appdate > compdate) {
        this.comparedate = true;
        this.comparedateRule =
          "ဝန်ဆောင်မှုရယူရန် ရုံးသို့လာရောက်သည့်နေ့ သည် ဝန်ဆောင်မှုရရှိခဲ့သည့်နေ့ထက်မကြီးရပါ။";
      }
      if (appdate > nowdate) {
        this.comparedate = true;
        this.comparedateRule =
          "ဝန်ဆောင်မှုရယူရန် ရုံးသို့လာရောက်သည့်နေ့ သည် ချက်အလက်များတင်သွင်းသည့်နေ့ထက် မကြီးရပါ။";
      }
    },
  },
  watch: {
    "data.date_of_application"(val) {
      if (val != null && val != undefined) {
        this.CalculateDate();
        this.applicationdatevalidate = false;
      }
      // else{
      //   this.applicationdatevalidate = true;
      // }
    },
    "data.date_of_completion"(val) {
      if (val != null && val != undefined) {
        this.CalculateDate();
        this.completiondatevalidate = false;
      }
      // else{
      //   this.completiondatevalidate = true;
      // }
    },
    "data.location_district"(val) {
      if (val != null) {
        this.districtvalidate = false;
      }
      // else{
      //   this.districtvalidate = true;
      // }
    },
  },
};
</script>
