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
          <v-card-title>အမျိုးအစားအုပ်စုမခွဲခြားရသေးသည့် တုန့်ပြန်မှုများ</v-card-title>
          <v-divider></v-divider>
          <v-col cols="12" md="12">
            <v-row dense>
              <v-col cols="12" md="6">
                <v-row dense class="mb-n5 mt-3">
                  <v-col cols="12" md="8">
                    <v-autocomplete
                      v-model="category_id"
                      :items="categorylist"
                      item-text="name"
                      item-value="id"
                      :autocomplete="off"
                      outlined
                      dense
                      placeholder="Select Category"
                      required
                      :rules="categroyRules"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-btn :disabled="disab" @click="Save()" small outlined color="indigo"
                      >ပေးပို့မည်</v-btn
                    >
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" md="6">
                <v-row dense>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="search"
                      placeholder="ရှာဖွေရန်"
                      append-icon="mdi-magnify"
                      outlined
                      dense
                      autocomplete="off"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-btn class="mr-2" small outlined color="primary" @click="Filter"
                      >ရှာမည်</v-btn
                    >
                    <v-btn class small outlined color="error" @click="ResetFilter"
                      >ပြန်လည်ရွေးချယ်မည်</v-btn
                    >
                  </v-col>
                </v-row>
              </v-col>
            </v-row>

            <!-- <v-data-table
              

              v-model="selected"
    :headers="headers"
    :items="uncategorizedlist"
    :single-select="singleSelect"
    item-key="sms_code"
    show-select
    class="elevation-1"
    :options.sync="pagination"
              :server-items-length="totalclass"
              :footer-props="footerProps"
              :disable-sort="isDisabled"
            >
              <template v-slot:item="row">
                <tr>
                  <td>
                    
                  </td>
                  <td>
                    
                  </td>

                  <td>{{ row.item.sms_code }}</td>
                  <td>{{ row.item.campaign_id }}</td>
                  <td>{{ row.item.phono }}</td>
                  <td>{{ row.item.sms_text }}</td>
                  <td>{{ row.item.sms_time }}</td>
                </tr>
              </template>
            </v-data-table> -->

            <v-data-table             
              v-model="selected"
              :headers="headers"
              :items="uncategorizedlist"
              :options.sync="pagination"
              :footer-props="footerProps"  
              :server-items-length="totalclass"           
              :disable-sort="isDisabled"
              item-key="id"
              show-select
            >
            </v-data-table>
            <template v-slot:item="row">
              <tr>
                <td></td>
                <td>{{ row.item.sms_code }}</td>
                <td>{{ row.item.campaign_id }}</td>
                <td>{{ row.item.campaign }}</td>
                <td>{{ row.item.phono }}</td>
                <td>{{ row.item.sms_text }}</td>
                <td>{{ row.item.sms_time }}</td>
              </tr>
            </template>
          </v-col>
        </v-card>
      </v-col>
    </div>
    <router-view ref="rv"></router-view>
  </div>
</template>

<script>
import DropDown from "../../services/dropdownservice";
import UnCategorizedSMSService from "../../services/uncategorizedsmsservice";
import UnCategorizedSMS from "../../models/uncategorizedsms";
export default {
  data() {
    return {
      singleSelect: false,
      selected: [],
      isExactActive: true,
      loading: false,
      isDisabled: true,
      totalclass:0,
      uncategorizedlist: [],
      categorylist: [],
      uncategorizedsms: new UnCategorizedSMS(),
      color: "",
      mode: "",
      snackbar: false,
      text: "",
      timeout: "5000",
      x: "right",
      y: "top",
      valid: true,
      dialog: false,
      pagination: {
        descending: true,
        page: 1,
        itemsPerPage: 10,
        pageStart: 1,
        pageStop: null,
        sortBy: ["id"],
      },
      footerProps: {
        "items-per-page-options": [10, 20, 30, 40, 50],
      },
      headers: [
        // {
        //   text: "အမျိုးအစား",
        //   align: "start",
        //   sortable: false,
        //   width: "250",
        // },
        { text: "အမှတ်စဉ်", value: "sms_code", width: "100" },
        { text: "ကမ်ပိန်းအမှတ်စဉ်", value: "campaign_id", width: "150" },
        { text: "ကမ်ပိန်းအမည်", value: "campaign", width: "150" },
        { text: "မိုဘိုင်းဖုန်းနံပါတ်", value: "phono", width: "150" },
        { text: "ပြန်စာ", value: "sms_text", width: "200" },
        { text: "ပြန်စာပေးပို့သည့်အချိန်", value: "sms_time", width: "200" },
      ],
      disab : true,
    };
  },
  computed: {
    messages() {
      return this.showMessages ? ["Active"] : undefined;
    },
    params(nv) {
      console.log(nv);
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

    selected(val) {
      var rowcount = val.length;   
      if (rowcount > 0) {
        this.disab = false;
      } else {
        this.disab = true;
      }
    },

  },
  
  created() {
    this.$emit("eventname", true);
    this.GetCategory();
    // this.GetAllData(); 
  },
  methods: {
    GetAllData() {
      var vm = this;
      vm.loading = true;
      vm.isDisabled = true;
      let params = vm.params;
      params.pageStop = params.itemsPerPage;
      params.pageStart = params.page == 1 ? 0 : params.itemsPerPage * (params.page - 1); //set offset    
      params.search = vm.search;
      params.draw = this.draw;
      if (params.descending == true) {
        params.sortOrder = "desc";
      } else {
        params.sortOrder = "asc";
      }
      params.sortBy = params.sortBy[0];
      UnCategorizedSMSService.GetAll(params).then(
        (response) => {
          vm.uncategorizedlist = [];         
          response.data.data.forEach(function (item) {
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
    Filter() {
      (this.pagination = {
        descending: true,
        page: 1,
        itemsPerPage: 10,
        pageStart: 1,
        pageStop: null,
        sortBy: ["id"],
      }),
        this.GetAllData();
    },
    ResetFilter() {
      this.search = "";
      (this.pagination = {
        descending: true,
        page: 1,
        itemsPerPage: 10,
        pageStart: 1,
        pageStop: null,
        sortBy: ["id"],
      }),
        this.GetAllData();
    },
    Save() {
      var vm = this;
      vm.isDisabled = true;
      vm.rowcount = vm.selected.length;
     // window.console.log("ssssssssss "+vm.selected+","+vm.category_id);
      this.$confirm("Do you really want to be categorizedSMS?", {
        title: "Categorized SMS",
        color: "primary",
      }).then((res) => {
        if (res) {
          UnCategorizedSMSService.Insert(this.category_id,this.selected).then((response) => {
             vm.selected=[];
            if (response.data.success) {
              this.$emit("getData", { methodCall: "GetAllData" });
              vm.uncategorizedlist = [];              
              this.GetAllData();
              vm.color = "success";
              vm.snackbar = true;
              vm.text = "Success Categorized SMS";
            } else {
              vm.snackbar = true;
              vm.color = "red";
              vm.text = "Not Success";              
            }
            vm.isDisabled=false;

          });
        } else {
          vm.isDisabled = false;
        }
      });
    },
    GetCategory() {
      //var vm =this;
      DropDown.GetCategory().then((result) => {
        this.categorylist = result.data;
        this.category_id = result.data[0].id;
        window.console.log(this.categorylist);
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
