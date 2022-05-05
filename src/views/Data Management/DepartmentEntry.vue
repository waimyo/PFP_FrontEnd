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
      <!-- <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on"> Open Dialog </v-btn>
      </template> -->
      <v-card :disabled="isDisabled">
        <v-card-title class="grey black--text lighten-3">
          Create New Deparment
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
                      <v-subheader>Account Link<span class="red--text title"
                          >*</span
                        ></v-subheader>
                    </v-col>
                    <v-col cols="12" md="8">
                      <v-autocomplete
                        v-model="department.ministry_Id"
                        :items="ministrylist"
                        item-value="id"
                        item-text="name"
                        outlined
                        dense
                        placeholder="Select Ministry"
                        :rules="minRules"
                        clearable
                      ></v-autocomplete>
                    </v-col>
                  </v-row>

                  <v-row dense>
                    <v-col cols="12" md="3">
                      <v-subheader>Department Name<span class="red--text title"
                          >*</span
                        ></v-subheader>
                    </v-col>
                    <v-col cols="12" md="8">
                      <v-text-field
                        v-model="department.name"
                        outlined
                        dense
                        :rules="deptRules"
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
                      <!-- <v-btn small outlined color="indigo" class="mr-2"
                        >Create Department</v-btn
                      >
                      <v-btn small outlined color="error">Reset</v-btn> -->
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
import Department from "../../models/department";
import DepartmentService from "../../services/departmentservice";
import DropdownService from "../../services/dropdownservice";
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
      department: new Department(),
      minRules: [(v) => !!v || "ဝန်ကြီးဌာနအမည်ရွေးရန်လိုအပ်ပါသည်။"],
      deptRules: [(v) => !!v || "ဌာနအမည်ထည့်ရန်လိုအပ်ပါသည်။"],

      ministrylist: [],
    };
  },
  computed: {},
  created() {
    this.$emit("eventname", true);
    this.GetMinistry();
  },

  methods: {
    GetMinistry() {
      var vm = this;
      DropdownService.GetMinistry().then((result) => {
        vm.ministrylist = result.data;
      });
    },
    Insert() {
      var vm = this;
      if (
        vm.department.name == null ||
        vm.department.name == "" ||
        vm.department.ministry_Id == null ||
        vm.department.ministry_Id == ""
      ) {
        vm.validate();
      } else {
        vm.isDisabled=true;
        DepartmentService.InsertData(vm.department).then((result) => {
          if (result.data.success) {
            this.$emit("getData", { methodCall: "GetAllData" });
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
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>
