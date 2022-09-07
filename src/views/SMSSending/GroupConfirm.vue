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
      <v-card :disabled="isDisabled">
        <v-card-title>Review Group Data</v-card-title>
        <v-divider></v-divider>
        <v-col cols="12" md="12">
          <v-row dense class="mb-n5">
            <v-col cols="12" md="12" class="mb-5">
              <v-row dense>
                <!-- <v-col cols="12" md="2"></v-col> -->
                <v-col cols="12" md="9">
                  <v-card-text class="mt-n4"
                    >Following contacts will be added to the new group. Please review them
                    for the last time to confirm the contacts, and click CREATE GROUP
                    button. If you need to design again, please click START AGAIN
                    button.</v-card-text
                  >
                </v-col>
                <v-col cols="12" md="3">
                  <v-btn :disabled="disab" @click="Insert" class="mr-2" small outlined color="indigo"
                    >Create Group</v-btn
                  >
                  <router-link :to="{ path: '/GroupEntry' }">
                    <v-btn class small outlined color="error">Start Again</v-btn>
                  </router-link>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-data-table
            :headers="headers"
            :items="itemlist"
            :search="search"
            :options.sync="pagination"
            :server-items-length="total"
            :footer-props="footerProps"
            :disable-sort="disableSort"
          >
            <template v-slot:item="row">
              <tr>
                <!-- <td>{{ row.item.dataportalid }}</td>
                  <td>{{ row.item.name }}</td>
                  <td>{{ row.item.mobile }}</td>
                  <td>{{ row.item.department }}</td>
                  <td>{{ row.item.service }}</td>
                  <td>{{ row.item.uploadeddate }}</td>
                  <td>{{ row.item.uploadedby }}</td>
                  <td>{{ row.item.state }}</td>
                  <td>{{ row.item.district }}</td>
                  <td>{{ row.item.township }}</td> -->

                <td>{{ row.item.id }}</td>
                <td>{{ row.item.name }}</td>
                <td>{{ row.item.mobile }}</td>
                <td>{{ row.item.department }}</td>
                <td>{{ row.item.service }}</td>
                <td>{{ row.item.created_date }}</td>
                <td>{{ row.item.created_by }}</td>

                <td>{{ row.item.statedivision }}</td>
                <td>{{ row.item.district }}</td>
                <td>{{ row.item.township }}</td>
              </tr>
            </template>
          </v-data-table>
        </v-col>
      </v-card>
    </v-col>
  </div>
</template>

<script>
//import Group from "../../models/group";
import GroupService from "../../services/groupservice";
export default {
  data() {
    return {

      loading: false,
      isDisabled: false,
      disableSort: false,
      text: "",
      snackbar: false,
      color: "",
      timeout: "5000",
      x: "right",
      y: "top",

      disab: false,

      headers: [
        { text: "DATA PORTAL ID", value: "dataid", width: "150" },
        { text: "NAME", value: "name", width: "100" },
        { text: "MOBILE", value: "mobile", width: "150" },
        { text: "DEPARTMENT", value: "department", width: "150" },
        { text: "SERVICE", value: "service", width: "150" },
        { text: "UPLOADED DATE", value: "uploadeddate", width: "150" },
        { text: "UPLOADED BY", value: "uploadedby", width: "150" },
        { text: "STATE", value: "state", width: "150" },
        { text: "DISTRICT", value: "district", width: "150" },
        { text: "TOWNSHIP", value: "township", width: "150" },
      ],

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

      glist: [],
      itemlist: [],
    };
  },
  watch: {
    params: {
      handler() {
        this.GetAllData();
      },
      deep: true,
    },
    
  },

  computed: {
    params() {
      return {
        ...this.pagination,
      };
    },
    messages() {
      return this.showMessages ? ["Active"] : undefined;
    },
  },

  created() {
    this.$emit("eventname", true);
    this.glist = this.$route.params.glist;
    this.GetAllData();
  },

  methods: {
    GetAllData() {
      var vm = this;
      vm.loading = true;
      vm.isDisabled = true;
      vm.disableSort = true;
      return new Promise((resolve, reject) => {
        vm.resolve = resolve;
        vm.reject = reject;
        let params = vm.params;

        params.pageStop = params.itemsPerPage; //set how many records to fecth per page
        params.pageStart = params.page == 1 ? 0 : params.itemsPerPage * (params.page - 1); //set offset

        //params.search = vm.search;
        params.search = this.glist;
        params.draw = this.draw;
        //params.descending = params.sortDesc[0];
        if (params.descending == true) {
          params.sortOrder = "desc";
        } else {
          params.sortOrder = "asc";
        }
        params.sortBy = params.sortBy[0];

        GroupService.GetAll(params).then(
          (response) => {
            vm.itemlist = [];
            //vm.isshow = response.data.isshow;
            response.data.data.forEach(function (item) {
              vm.itemlist.push(item);
            });
            vm.total = response.data.recordsTotal;
            vm.loading = false;
            vm.isDisabled = false;
            vm.disableSort = false;
            if(vm.itemlist.length == 0){
              this.disab = true;
              this.snackbar = true;
              this.color = "red";
              this.timeout = 0;
              this.text = "Group တွင် အနည်းဆုံးလူတစ်ယောက်ရှိရပါမည်။"
            }
          },
          (error) => {
            console.error(error);
          }
        );
      });
    },

    Insert() {
      var vm = this;
      vm.loading = true;
      vm.isDisabled = true;
      vm.disableSort = true;
      if(this.glist.department_id == "All Departments"){
        this.glist.department = "All Departments";
        this.glist.department_id = 0;
      }
      if(this.glist.service_id == "All Services"){
        this.glist.service = "All Services";
        this.glist.service_id = 0;
      }
      if(this.glist.uploadedby == "Uploaded by All"){
        this.glist.uploadedbyname = "Uploaded by All";
        this.glist.uploadedby = 0;
      }
      GroupService.InsertData(this.glist).then((result) => {
        if (result.data.success) {
          this.$router.push({
          name: 'GroupEntry',
          params: {
              groupstatus: 'success',
              groupmessage: 'အချက်အလက်များသိမ်းဆည်းပြီးပါပြီ'
          }
        })
        } else {
          this.$router.push({
          name: 'GroupEntry',
          params: {
              groupstatus: 'fail',
              groupmessage: 'အုပ်စုအမည်တူနေပါသည်',
              group: this.glist
          }
        });
          vm.color = "red";
        }
        vm.snackbar = true;
        vm.text = result.data.messages[0];
        vm.loading = false;
        vm.isDisabled = false;
        vm.disableSort = false;
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
