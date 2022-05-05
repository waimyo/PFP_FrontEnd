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
      <v-row dense>
        <v-col cols="12" :md="udata.role_id != 1?6 : 12">
          <router-link :to="{ name: 'GroupList' }">
            <v-icon color="primary" class="mt-n2">mdi-arrow-left-bold-box</v-icon>
          </router-link>
          <v-card style="border-top: 3px solid #fbba00" :disabled="isDisabled">
            <v-card-title>အကျဉ်းချုပ်</v-card-title>
            <v-divider></v-divider>
            <v-col cols="12" md="12">
              <v-simple-table dense>
                <template v-slot:default>
                  <tbody>
                    <tr>
                      <th class="text-left">အုပ်စုနံပါတ်</th>
                      <td>{{ groupdata.id }}</td>
                    </tr>
                    <tr>
                      <th class="text-left">အုပ်စုအမည်</th>
                      <td>{{ groupdata.group_name }}</td>
                    </tr>
                    <tr>
                      <th class="text-left">အုပ်စုဖွဲ့သည့်နေ့ရက်</th>
                      <td>{{ groupdata.group_date }}</td>
                    </tr>
                    <tr>
                      <th class="text-left">အုပ်စုတွင်ပါဝင်သူဦးရေ</th>
                      <td>{{ groupdata.group_member }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-col>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card :disabled="isDisabled"
            v-if="udata.role_id != 1"
            class="mt-6"
            style="border-top: 3px solid #fbba00"
          >
            <v-card-title
              >အုပ်စုတွင်းသို့ထပ်မံဖြည့်သွင်းလိုသည့်အမည်နှင့်ဖုန်းနံပါတ်</v-card-title
            >
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
                    <v-row dense class="mt-2">
                      <v-col cols="12" md="5">
                        <v-subheader
                          >စုစည်းထားသည့်အချက်အလက်များမှ ရွေးချယ်ရန်</v-subheader
                        >
                      </v-col>
                      <v-col cols="12" md="7">
                        <v-autocomplete
                          v-model="group.datainfo"
                          :items="datalist"
                          item-text="name"
                          item-value="id"
                          outlined
                          dense
                          multiple
                          clearable
                          chips
                          small-chips
                          color="primary"
                        >
                          <template v-slot:selection="{ item }">
                            <v-chip small label color="primary">
                              {{ item.name }}
                            </v-chip>
                          </template>
                        </v-autocomplete>
                        <div
                          v-if="datainfovalidate"
                          style="letter-spacing: 0; font-size: 12px; margin-top: -17px"
                          class="red--text ml-2"
                        >
                          အချက်အလက်ရွေးရန်လိုအပ်ပါသည်။
                        </div>
                      </v-col>
                    </v-row>

                    <v-row dense class="mb-2">
                      <v-col cols="12" md="5"> </v-col>
                      <v-col cols="12" md="7">
                        <v-btn type="submit" small outlined color="indigo" class="mr-2"
                          >အုပ်စုအတွင်းသို့ဖြည့်သွင်းမည်</v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-form>
            </v-col>
          </v-card>
        </v-col>
      </v-row>
      <v-card class="mt-1" :disabled="isDisabled">
        <v-card-title>အသေးစိတ်ကြည့်ရှုရန်</v-card-title>
        <v-divider></v-divider>
        <v-col cols="12" md="12">
          <v-row dense class="mb-n5">
            <v-col cols="12" md="6">
              <!-- <v-btn class="mt-1" small outlined color="success"
                ><v-icon left>mdi-export</v-icon>Export Excel</v-btn
              > -->
              <v-btn
              v-show="udata.role_id != 1"
               :disabled="disab"
                    @click="deleteItem(selected)"
                    small
                    outlined
                    dense
                    color="warning"
                    >အုပ်စုအတွင်းမှဖယ်ထုတ်မည်</v-btn
                  >
            </v-col>
            <v-col cols="12" md="6">
              <v-row dense>
                <v-col cols="12" md="7">
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
            v-model="selectedRows"
            @current-items="current = $event"
            @item-selected="bulkSelect"
            
            item-key="id"
            class="elevation-1"
            show-select
            unselectable

            :headers="udata.role_id == 1 ? headers1 : headers2"
            :items="itemlist"
            :search="search"
            :options.sync="pagination"
            :server-items-length="total"
            :footer-props="footerProps"
            :disable-sort="disableSort"
          /> -->

          <v-data-table
          v-model="selected"
            :headers="udata.role_id == 1 ? headers1 : headers2"
            :items="itemlist"
             item-key="id"
            :search="search"
            :options.sync="pagination"
            :server-items-length="total"
            :footer-props="footerProps"
            :disable-sort="disableSort"
            :show-select="udata.role_id == 1 ? false : true"
          >
            
          </v-data-table>
          <template v-slot:item="row">
              <tr>
                <!-- <td v-if="udata.role_id != 1">
                  <v-btn
                    @click="deleteItem(row.item)"
                    small
                    outlined
                    dense
                    color="warning"
                    >အုပ်စုအတွင်းမှဖယ်ထုတ်မည်</v-btn
                  >
                </td> -->
                <td>{{ row.item.datainfo_id }}</td>
                <td>{{ row.item.name }}</td>
                <td>{{ row.item.mobile }}</td>
                <td>{{ row.item.sender_name }}</td>
                <td>{{ row.item.created_date }}</td>
              </tr>
            </template>
        </v-col>
      </v-card>
    </v-col>
  </div>
</template>

<script>
//import authHeader from '../../services/auth-header';
//import axios from "axios";
import Group from "../../models/group";
import GroupService from "../../services/groupservice";
import DropdownService from "../../services/dropdownservice";
export default {
  data() {
    return {
      selected: {"id":null},
      disab : true,

      valid: true,
      loading: false,
      isDisabled: false,
      disableSort: false,
      text: "",
      snackbar: false,
      color: "",
      timeout: "5000",
      x: "right",
      y: "top",
      datainfovalidate: false,
      dataRules: [(v) => !!v || "ဌာနအမည်ထည့်ရန်လိုအပ်ပါသည်။"],

      headers1: [
        { text: "အမှတ်စဉ်", value: "id", width: "100" },
        { text: "အမည်", value: "name", width: "100" },
        { text: "မိုဘိုင်းဖုန်းနံပါတ်", value: "mobile", width: "150" },
        { text: "ပေးပို့သူ", value: "sender_name", width: "150" },
        { text: "ပေးပို့သည့်နေ့", value: "created_date", width: "150" },
      ],
      headers2: [
        // {
        //   text: "မှားထည့်မိသည့်အမှတ်စဉ်ကို အုပ်စုအတွင်းမှ ဖယ်ထုတ်ရန်",
        //   value: "action",
        //   width: "300",
        //   sortable: false,
        // },
        { text: "အမှတ်စဉ်", value: "id", width: "100" },
        { text: "အမည်", value: "name", width: "200" },
        { text: "မိုဘိုင်းဖုန်းနံပါတ်", value: "mobile", width: "150" },
        { text: "ပေးပို့သူ", value: "sender_name", width: "150" },
        { text: "ပေးပို့သည့်နေ့", value: "created_date", width: "150" },
      ],
      itemlist: [],
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

      gid: 0,
      groupdata: [],
      datalist: [],
      group: new Group(),
      //groupmemberlist: [],
      datainfo: [],

      udata: 0,
    };
  },
  watch: {
    params: {
      handler() {
        this.GetAllData();
      },
      deep: true,
    },

    "group.datainfo"(val) {
      if (val != null || val == undefined) {
        this.datainfovalidate = false;
      } else {
        //alert(val)
        this.datainfovalidate = true;
      }
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
  computed: {
    params(nv) {
      console.log(nv);
      return {
        ...this.pagination,
      };
    },
  },
  created() {
    this.$emit("eventname", true);
    this.gid = this.$route.query.groupId;
    // alert("Group Id " + this.gid);
    this.udata = JSON.parse(localStorage.getItem("user"));
    this.userid = this.udata.id;
    this.GetDataList();
    this.GetById();
    this.GetAllData();
  },

  methods: {

    
        
    GetDataList() {
      var vm = this;
      //alert("uid " + this.userid)
      DropdownService.GetDataList().then((result) => {
        vm.datalist = result.data;
      });
    },

    GetById() {
      var vm = this;
      GroupService.GetById(this.gid).then((response) => {
        //vm.loading = true;
        vm.groupdata = response.data;
      });
    },

    GetAllData() {
      var vm = this;
      vm.loading = true;
      vm.isDisabled = true;
      vm.disableSort = true;
      let params = vm.params;
      params.pageStop = params.itemsPerPage;
      params.pageStart = params.page == 1 ? 0 : params.itemsPerPage * (params.page - 1); //set offset
      params.search = vm.search;
      params.draw = this.draw;
      params.descending = params.sortDesc[0];
      if (params.descending == true) {
        params.sortOrder = "desc";
      } else {
        params.sortOrder = "asc";
      }
      params.sortBy = params.sortBy[0];
      GroupService.GetAllGroupMember(params, this.gid).then(
        (response) => {
          vm.itemlist = [];
          response.data.data.forEach(function (item) {
            vm.itemlist.push(item);
          });
          vm.total = response.data.recordsTotal;
          vm.loading = false;
          vm.isDisabled = false;
          vm.disableSort = false;
        },
        (error) => {
          console.error(error);
        }
      );
    },

    deleteItem(item) {
     
      var vm = this;
      if(item.length >= vm.total){
        //if(vm.total == item.length){
        vm.color = "red";
        vm.snackbar = true;
        vm.text = "Group တွင် အနည်းဆုံးလူတစ်ယောက်ရှိရပါမည်။";
      }
      else{
        this.$confirm("Are you sure you want to delete this item?").then((result) => {
        if (result) {
          GroupService.DeleteData(item).then(
            (response) => {
              vm.color = "red";
              vm.snackbar = true;
              vm.text = response.data.messages[0];
              vm.GetAllData();
              vm.GetById();
              vm.selected = [];
            },
            (error) => {
              console.error(error);
            }
          );
        }
      });
      }
      
    },

    Filter() {
      this.params.itemsPerPage = 10;
      this.params.page = 0;
      this.GetAllData();
    },

    ResetFilter() {
      this.search = "";
      this.GetAllData();
    },

    Insert() {
      var vm = this;
      vm.loading = true;
      vm.isDisabled = true;
      vm.disableSort = true;
      if (vm.group.datainfo == "" || vm.group.datainfo == null) {
        vm.datainfovalidate = true;
        vm.loading = false;
        vm.isDisabled = false;
        vm.disableSort = false;
        //vm.validate();
      } else {
        vm.datainfovalidate = false;
        vm.group.group_id = this.gid;
        GroupService.InsertDataForDataList(vm.group).then((result) => {
          if (result.data.success) {
            vm.datainfovalidate = false;
            //alert(vm.datainfovalidate)
            vm.color = "success";
            vm.group = [];
          } else {
            vm.color = "red";
          }
          this.GetAllData();
          this.GetById();

          //vm.datainfovalidate = false;
          vm.snackbar = true;
          vm.text = result.data.messages[0];
          vm.loading = false;
          vm.isDisabled = false;
          vm.disableSort = false;
        });
        
      }
      
    },

    validate() {
      this.$refs.form.validate();
    },
  },
};
</script>
