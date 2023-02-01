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
    <v-progress-linear
      :active="loading"
      rounded
      indeterminate
      absolute
      top
      height="3"
      color="warning"
    ></v-progress-linear>
    <div v-show="isExactActive">
      <v-col cols="12" md="12">
        <v-card :disabled="isDisabled">
          <v-card-title
            >အမျိုးအစားအုပ်စုခွဲခြားပြီးသော တုံ့ပြန်မှုများ</v-card-title
          >
          <v-divider></v-divider>
          <v-col cols="12" md="12">
            <v-row dense>
              <!-- <v-col cols="12" md="2"> </v-col> -->
              <v-col cols="12" md="12">
                <v-row dense>
                  <v-col cols="12">
                    <v-autocomplete
                      v-if="udata.role_id == 1"
                      v-model="uncategorizedsms.ministry_id"
                      :items="minacclist"
                      item-text="ministry.name"
                      item-value="id"
                      outlined
                      dense
                      placeholder="ဝန်ကြီးဌာန"
                    >
                    </v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="2">
                    <date-picker
                      v-model="fromdate"
                      valueType="YYYY-MM-DD"
                      format="DD/MM/YYYY"
                      :editable="true"
                      placeholder="SMS Time(From)"
                      clearable
                    ></date-picker>
                  </v-col>
                  <v-col cols="12" md="2">
                    <date-picker
                      v-model="todate"
                      valueType="YYYY-MM-DD"
                      format="DD/MM/YYYY"
                      :editable="true"
                      placeholder="SMS Time(To)"
                      clearable
                    ></date-picker>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="search"
                      placeholder="ရှာဖွေရန်"
                      append-icon="mdi-magnify"
                      outlined
                      dense
                      autocomplete="off"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="5">
                    <v-btn
                      class="mr-2"
                      small
                      outlined
                      color="primary"
                      @click="Filter"
                      >ရှာမည်</v-btn
                    >
                    <v-btn
                      class="mr-2"
                      small
                      outlined
                      color="error"
                      @click="ResetFilter"
                      >ပြန်လည်ရွေးချယ်မည်</v-btn
                    >
                    <v-btn
                      :loading="excelloading"
                      :disabled="excelloading"
                      small
                      outlined
                      color="success"
                      @click="ExportExcel"
                    >
                      <v-icon left>mdi-export</v-icon>Export Excel
                      <span slot="loader" class="custom-loader">
                        <v-icon light>mdi-cached</v-icon>
                      </span>
                    </v-btn>
                    <a href="#" id="mylink"></a>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>

            <v-data-table
              :headers="udata.role_id == 1 ? headers1 : headers2"
              :items="uncategorizedlist"
              :search="search"
              :options.sync="pagination"
              :server-items-length="totalclass"
              :footer-props="footerProps"
              :disable-sort="isDisabled"
            >
              <template v-slot:item="row">
                <tr>
                  <td v-if="udata.role_id != 1">
                    <v-btn
                      small
                      @click="CategoryReset(row.item)"
                      outlined
                      color="warning"
                      >Reset Category</v-btn
                    >
                  </td>

                  <td>{{ row.item.sms_code }}</td>
                  <td>{{ row.item.campaign_id }}</td>
                  <td>{{ row.item.campaign }}</td>
                  <td>{{ row.item.phono }}</td>
                  <td>{{ row.item.sms_text }}</td>
                  <td>{{ row.item.categoryname }}</td>
                  <td>{{ row.item.name }}</td>
                  <td>{{ row.item.sms_time }}</td>
                  <td>{{ row.item.createdBy }}</td>
                </tr>
              </template>
            </v-data-table>
          </v-col>
        </v-card>
      </v-col>
    </div>
    <router-view ref="rv"></router-view>
  </div>
</template>

<script>
import UnCategorizedSMSService from "../../services/uncategorizedsmsservice";
import UnCategorizedSMS from "../../models/uncategorizedsms";
import DropDownService from "../../services/dropdownservice";
import $ from "jquery";

export default {
  data() {
    return {
      isDisabled: false,
      isExactActive: true,
      uncategorizedlist: [],
      loading: false,
      uncategorizedsms: new UnCategorizedSMS(),
      category_id: 0,
      campaign_id: 0,
      phono: "",
      color: "",
      mode: "",
      snackbar: false,
      text: "",
      fromdate: "",
      todate: "",
      timeout: "5000",
      x: "right",
      y: "top",
      valid: true,
      dialog: false,
      excelloading: false,
      pagination: {
        descending: true,
        page: 1,
        itemsPerPage: 50,
        pageStart: 1,
        pageStop: null,
        sortBy: ["id"],
      },
      footerProps: {
        "items-per-page-options": [50, 100, 200, 300, 400, 500],
      },
      headers1: [
        { text: "အမှတ်စဉ်", value: "sms_code", width: "100" },
        { text: "ကမ်ပိန်းအမှတ်စဉ်", value: "campaign_id", width: "150" },
        { text: "ကမ်ပိန်းအမည်", value: "campaign", width: "150" },
        { text: "မိုဘိုင်းဖုန်းနံပါတ်", value: "phono", width: "150" },
        { text: "ပြန်စာ", value: "sms_text", width: "280" },
        {
          text: "တုန့်ပြန်မှုအမျိုးအစား ",
          value: "categoryname",
          width: "280",
        },
        {
          text: "အမျိုးအစားအုပ်စုခွဲခြားသည့်အဖွဲ့",
          value: "name",
          width: "280",
        },
        { text: "ပြန်စာပေးပို့သည့်အချိန်", value: "sms_time", width: "200" },
        { text: "ဦးစီးဌာန", value: "createdBy", width: "200" },
      ],
      headers2: [
        {
          text: "Reset Category",
          align: "start",
          sortable: false,
          value: "iron",
          width: "150",
        },
        { text: "အမှတ်စဉ်", value: "sms_code", width: "100" },
        { text: "ကမ်ပိန်းအမှတ်စဉ်", value: "campaign_id", width: "150" },
        { text: "ကမ်ပိန်းအမည်", value: "campaign", width: "150" },
        { text: "မိုဘိုင်းဖုန်းနံပါတ်", value: "phono", width: "150" },
        { text: "ပြန်စာ", value: "sms_text", width: "280" },
        {
          text: "တုန့်ပြန်မှုအမျိုးအစား ",
          value: "categoryname",
          width: "280",
        },
        {
          text: "အမျိုးအစားအုပ်စုခွဲခြားသည့်အဖွဲ့",
          value: "name",
          width: "280",
        },
        { text: "ပြန်စာပေးပို့သည့်အချိန်", value: "sms_time", width: "200" },
        { text: "ဦးစီးဌာန", value: "createdBy", width: "200" },
      ],
      minacclist: [],
    };
  },

  computed: {
    messages() {
      return this.showMessages ? ["Active"] : undefined;
    },
    params() {
      return {
        ...this.pagination,
      };
    },
  },
  watch: {
    params: {
      handler() {
        this.GetAllData();
      },
      deep: true,
    },
  },

  created() {
    this.$emit("eventname", true);
    // this.GetAllData();
    this.udata = JSON.parse(localStorage.getItem("user"));
    this.GetMinistryAccount();
  },

  methods: {
    GetMinistryAccount() {
      DropDownService.GetMinistryAccount().then((res) => {
        this.minacclist = res.data;
      });
    },

    CategoryReset(item) {
      var vm = this;
      vm.isDisabled = true;
      this.$confirm("Are you sure you want to reset this item?", {
        title: "Uncategorized SMS",
        color: "primary",
      }).then((result) => {
        if (result) {
          UnCategorizedSMSService.ResetCategory(item).then(
            (response) => {
              if (response.data.success) {
                vm.GetAllData();
                vm.color = "success";
                vm.snackbar = true;
                vm.text = "Success Uncategorized SMS";
              }
            },
            (error) => {
              console.error(error);
            }
          );
        } else {
          vm.isDisabled = false;
        }
      });
    },
    Filter() {
      (this.pagination = {
        descending: true,
        page: 1,
        itemsPerPage: 50,
        pageStart: 1,
        pageStop: null,
        sortBy: ["id"],
      }),
        this.GetAllData();
    },
    ResetFilter() {
      this.search = "";
      this.fromdate = "";
      this.todate = "";
      (this.pagination = {
        descending: true,
        page: 1,
        itemsPerPage: 50,
        pageStart: 1,
        pageStop: null,
        sortBy: ["id"],
      }),
        this.GetAllData();
    },

    GetAllData() {
      var vm = this;
      vm.loading = true;
      vm.isDisabled = true;
      let params = vm.params;
      params.pageStop = params.itemsPerPage;
      params.pageStart =
        params.page == 1 ? 0 : params.itemsPerPage * (params.page - 1); //set offset
      params.search = vm.search;
      params.fromdate = vm.fromdate;
      params.todate = vm.todate;
      params.ministry_id = vm.uncategorizedsms.ministry_id;
      params.draw = this.draw;
      if (params.sortDesc) {
        params.descending = params.sortDesc[0];
        if (params.descending == true) {
          params.sortOrder = "desc";
        } else {
          params.sortOrder = "asc";
        }
      }
      if (params.sortBy) {
        params.sortBy = params.sortBy[0];
      }
      UnCategorizedSMSService.GetAllForCategorized(params).then(
        (response) => {
          vm.uncategorizedlist = [];
          response.data.data.forEach(function(item) {
            vm.uncategorizedlist.push(item);
          });
          vm.totalclass = response.data.recordsTotal;
          if (response.data.success == false) {
            vm.snackbar = true;
            vm.color = "red";
            vm.text = response.data.messages[0];
          }
          vm.loading = false;
          vm.isDisabled = false;
        },
        (error) => {
          console.error(error);
        }
      );
    },

    ExportExcel() {
      var vm = this;
      vm.excelloading = true;
      let params = vm.params;
      params.pageStop = params.itemsPerPage;
      params.pageStart =
        params.page == 1 ? 0 : params.itemsPerPage * (params.page - 1); //set offset
      params.search = vm.search;
      params.fromdate = vm.fromdate;
      params.todate = vm.todate;
      params.ministry_id = vm.uncategorizedsms.ministry_id;
      params.draw = vm.draw;
      if (params.sortDesc) {
        params.descending = params.sortDesc[0];
        if (params.descending == true) {
          params.sortOrder = "desc";
        } else {
          params.sortOrder = "asc";
        }
      }
      if (params.sortBy) {
        params.sortBy = params.sortBy[0];
      }
      UnCategorizedSMSService.GetExcelCategorized(params).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        $("#mylink").attr("href", url);
        $("#mylink").attr(
          "download",
          "အမျိုးအစားအုပ်စုခွဲခြားပြီးသော တုံ့ပြန်မှုများ.xls"
        );
        $("#mylink")[0].click();
        vm.excelloading = false;
      });
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
