<style scoped>
.theme--light.v-subheader.sub {
  float: left;
  margin-top: -35px;
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
      <v-card>
        <v-expansion-panels accordion v-model="panel" multiple>
          <v-expansion-panel>
            <v-expansion-panel-header>
              အချက်အလက်ပေးပို့သူဆိုင်ရာအချက်အလက်များ
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row>
                <v-col cols="12" md="1"></v-col>
                <v-col cols="12" md="10">
                  <p>
                    အချက်အလက်စုစည်းထားသည့်ဖိုင်ကို ပေးပို့ရာတွင်
                    လိုက်နာရမည့်စည်းမျဉ်းများကို ဤနေရာတွင် ကြည့်ရှုနိုင်ပါသည်။
                    အချက်အလက်ဖြည့်သွင်းရမည့် csvဖိုင်ကို ဤနေရာတွင် ဒေါင်းလုပ်ရယူပါ။
                  </p>
                  <p>
                    - Excel ဖိုင်တွင်ဖော်ပြထားသည့် ပုံစံအတိုင်း အချက်အလက်များထည့်သွင်းပါ။
                    Excel ကော်လံများ၏ ခေါင်းစဉ်မျာကို မပြောင်းပါနှင့်၊ မဖျက်ပါနှင့်။
                  </p>
                  <div style="background: #d4edff; padding: 10px">
                    Name (အမည်)၊ mobile (မိုဘိုင်းဖုန်းနံပါတ်)၊ gender (ကျား/မ)၊ date of
                    application (ဝန်ဆောင်မှုရယူသည့်နေ့)၊ date of completion
                    (ဝန်ဆောင်မှုရရှိသည့်နေ့)
                  </div>

                  <p class="mt-3">
                    - Download sample file from here:
                    <a download="" href="/uploadfile.xlsx"> Excel (.xlsx)</a>
                  </p>

                  <p class="red--text">
                    - Note: Please do not change the first row which carries the headers.
                    Paste your data from row 2 and below.
                  </p>
                  <p>
                    - <strong> Manual for data upload via excel:</strong> Excel
                    ဖြင့်အချက်အလက်များပေးပို့ခြင်း
                    <!-- <a download="" href="/191222 DEOManual.pdf">191222 DEOManual.pdf</a> -->
                  </p>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card>

      <v-card class="mt-1" :disabled="isDisabled">
        <v-card-title>စုစည်းထားသည့် data များ upload ပြုလုပ်ရန်</v-card-title>
        <v-divider></v-divider>
        <v-col cols="12" md="12" class="mt-3">
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
                    <v-subheader>Service Details </v-subheader>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-autocomplete
                      v-model="data.ministry_id"
                      :rules="ministryRules"
                      item-text="name"
                      item-value="id"
                      autocomplete="off"
                      :items="ministrylist"
                      @change="OnChangeMinistry"
                      outlined
                      dense
                      placeholder="ဝန်ကြီးဌာနရွေးချယ်ပါ"
                      clearable
                      disabled
                      filled
                    ></v-autocomplete>
                    <v-subheader class="sub" style="margin-top: -20px"
                      >ဝန်ကြီးဌာန</v-subheader
                    >
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-autocomplete
                      v-model="data.department_id"
                      item-text="name"
                      item-value="id"
                      autocomplete="off"
                      :items="departmentlist"
                      :rules="deptRules"
                      outlined
                      dense
                      placeholder="ဦးစီးဌာနရွေးချယ်ပါ"
                      clearable
                    ></v-autocomplete>

                    <v-subheader class="sub" style="margin-top: -20px"
                      >ဦးစီးဌာန</v-subheader
                    >
                  </v-col>
                </v-row>

                <v-row dense>
                  <v-col cols="12" md="2" class="text-right">
                    <label style="font-size: 13px;">အချက်အလက်များတင်သွင်းသည့်နေ့</label>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="created_date"
                      outlined
                      dense
                      disabled
                      filled
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="4">
                    <!--clearable ref="filer" v-model="fileupload" append-icon="mdi-file" prepend-icon="mdi-file" class="filemrc" :prefillOptions="{mediaType: 'application/mrc'}" placeholder="Select MRC File" outlined accept=".mrc,.marc" dense style="color:red"-->
                    <v-file-input
                      v-model="data.uploaded_file"
                      placeholder="Upload your file"
                      :prefillOptions="{ mediaType: 'application/mrc' }"
                      :rules="fileRules"
                      outlined
                      dense
                      append-icon="mdi-file"
                      accept=".xls,.xlsx"
                    >
                      <template v-slot:selection="{ text }">
                        <v-chip small label color="primary">
                          {{ text }}
                        </v-chip>
                      </template>
                    </v-file-input>
                    <v-subheader class="sub" style="margin-top: -20px"
                      >ပေးပို့မည့်ဖိုင်ကိုရွေးချယ်ပါ</v-subheader
                    >
                  </v-col>
                </v-row>

                <v-row dense class="mb-3">
                  <v-col cols="12" md="2"> </v-col>
                  <v-col cols="12" md="8">
                    <v-btn type="submit" small outlined color="indigo" class="mr-2"
                      >ပေးပို့မည်</v-btn
                    >
                    <v-btn @click="reset" small outlined color="error"
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

export default {
  data() {
    return {
      timeout: 0,
      loading: false,
      snackbar: false,
      isDisabled: false,
      x: "right",
      y: "top",
      panel: [0],
      data: new Data(),
      ministrylist: [],
      departmentlist: [],
      created_date: "",
      ministryRules: [(v) => !!v || "ဝန်ကြီးဌာနရွေးရန်လိုအပ်ပါသည်။"],
      deptRules: [(v) => !!v || "ဦးစီးဌာနရွေးရန်လိုအပ်ပါသည်။"],
      fileRules: [(v) => !!v || "ပေးပို့မည့်ဖိုင်ရွေးရန်လိုအပ်ပါသည်။"],
    };
  },

  created() {
    this.$emit("eventname", true);
    this.data.uploaded_file = null;
    this.getNowDateTime();
    this.GetMinistry();
    this.userdata = JSON.parse(localStorage.getItem("user"));
    this.data.ministry_id = this.userdata.ministry_id;
    this.OnChangeMinistry();
  },
  methods: {
    Insert() {
      var vm = this;
      if (
        vm.data.department_id == 0 ||
        vm.data.ministry_id == 0 ||
        vm.data.uploaded_file == "" ||
        vm.data.uploaded_file == null
      ) {
        vm.validate();
      } else {
        vm.loading = true;
        vm.isDisabled = true;
        DataService.UploadFile(vm.data).then((result) => {
          if (result.data.success) {
            vm.data.uploaded_file = null;
            vm.reset();
            vm.color = "success";
            //vm.data=[];
          } else {
            vm.color = "red";
          }
          vm.loading = false;
          vm.isDisabled = false;
          vm.snackbar = true;
          vm.text = result.data.messages[0];
        });
      }
    },
    GetMinistry() {
      var vm = this;
      DropDownService.GetMinistry().then((result) => {
        vm.ministrylist = result.data;
      });
    },
    OnChangeMinistry() {
      var vm = this;
      DropDownService.GetDepartment(vm.data.ministry_id).then((result) => {
        vm.departmentlist = result.data;
      });
    },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.data.uploaded_file = null;
      this.data.department_id = 0;
      this.$refs.form.resetValidation();
    },
    getNowDateTime() {
      const today = new Date();
      const date =
        String(today.getDate()).padStart(2, "0") +
        "-" +
        String(today.getMonth() + 1).padStart(2, "0") +
        "-" +
        today.getFullYear();
      //const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      //const dateTime = date +' '+ time;
      this.created_date = date;
    },
  },
};
</script>
