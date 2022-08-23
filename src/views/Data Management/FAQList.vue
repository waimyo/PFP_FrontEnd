<style scoped>
.sub {
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
        <v-card-title>Frequently Asked Questions</v-card-title>
        <v-divider></v-divider>
        <v-col cols="12" md="12">
          <v-row dense class="mb-n5">
            <v-col cols="12" md="6" >
              <v-btn v-if="ishide" @click="newItem()" class="mt-1" small outlined color="indigo"
                ><v-icon left>mdi-plus-circle</v-icon>Create New
                <FAQEntry v-on:getData="GetAllData" ref="FAQEntryModal"
              /></v-btn>
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
                  <v-btn class="mr-2" small outlined color="primary" @click="Filter">Search</v-btn>
                  <v-btn class small outlined color="error" @click="ResetFilter"
                    >Reset</v-btn
                  >
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-data-table
         :disable-sort="isDisabled"
            :headers="headers"
            :items="datalist"
            :search="search"
            :options.sync="pagination"
            :server-items-length="totalclass"
            :footer-props="footerProps"
          >
            <template v-slot:item="row">
              <tr >
                <td v-if="ishide">
                <v-btn @click="editItem(row.item)" dense class="mr-2" small outlined color="warning">Edit</v-btn>
                <v-btn @click="deleteItem(row.item)" dense class="mr-2" small outlined color="error">Delete</v-btn>
                </td>
                <td>{{ row.item.question }}</td>
                <td>{{ row.item.answer }}</td>
              </tr>
            </template>
          </v-data-table>
        </v-col>
      </v-card>
    </v-col>
  </div>
</template>

<script>
import FAQEntry from "../Data Management/FAQEntry";
import FaqService from"../../services/faqservice"
export default {
  components: {
    FAQEntry,
  },
  data() {
    return {
      dialog: false,
      datalist:[],
      loading: false,
      isDisabled:false,
      snackbar: false,
      totalclass:0,
       x: "right",
       y: "top",
       search:"",
       ishide:false,
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
      headers:[],
     headerforsuperadmin: [
        { text: "Actions", value: "action", sortable: false, width: 50 },
        { text: "Questions", value: "question", width: "150" },
        { text: "Answers", value: "answer", width: "150" },
      ],
      headerforother: [
        { text: "Questions", value: "question", width: "150" },
        { text: "Answers", value: "answer", width: "150" },
      ],
    };
  },
  computed: {
        params() {
            return {
                ...this.pagination
            };
        }
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
    let user = JSON.parse(localStorage.getItem("user"));
    if(user.role_id==1){
      this.ishide=true;
      this.headers=this.headerforsuperadmin;
    }
    else{
      this.headers=this.headerforother;
    }
  },
  methods: {
    GetAllData(){
      var vm=this;
      vm.loading = true;
      vm.isDisabled=true;
      let params = vm.params;
      params.pageStop = params.itemsPerPage;
      params.pageStart = params.page == 1 ? 0 : params.itemsPerPage * (params.page - 1); //set offset
      params.search = vm.search;
      params.draw = this.draw;
      //params.descending = params.sortDesc[0];
      if (params.descending == true) {
        params.sortOrder = "desc";
      } else {
        params.sortOrder = "asc";
      }
      params.sortBy = params.sortBy[0];

      FaqService.GetAll(params).then(
          (response) => {
            vm.datalist = [];
            vm.datalist=response.data.data;
            vm.totalclass = response.data.recordsTotal;
            if (response.data.success == false) {
              vm.snackbar = true;
              vm.color = "red";
              vm.text = response.data.messages[0];
            }
             vm.loading = false;
             vm.isDisabled=false;
          },
          (error) => {
            console.error(error);
          }
        );
    },
    Filter(){
     this.pagination= {
        descending: true,
        page: 1,
        itemsPerPage: 10,
        pageStart: 1,
        pageStop: null,
        sortBy: ["id"],
      },
      this.GetAllData();
    },
    ResetFilter(){
       this.pagination= {
        descending: true,
        page: 1,
        itemsPerPage: 10,
        pageStart: 1,
        pageStop: null,
        sortBy: ["id"],
      },
      this.search="";
      this.GetAllData();
    },
    newItem() {
      this.$refs.FAQEntryModal.faq.id=0;
      this.$refs.FAQEntryModal.dialog = true;

    },
    deleteItem(item) {
      var vm = this;
       vm.loading = true;
       vm.isDisabled = true;
      this.$confirm("Are you sure you want to delete this item?").then((result) => {
        if (result) {
          FaqService.DeleteData(item.id).then(
            (response) => {
                vm.loading = false;
                vm.isDisabled = false;
                vm.snackbar=true;
                vm.color="red";
                vm.text = response.data.messages[0];
                vm.GetAllData();
            },
            (error) => {
              console.error(error);
            }
          );
        }
      });
    },

    editItem(item) {
      this.loading = true;
      this.$refs.FAQEntryModal.isDisabled = true;
      FaqService.GetById(item.id).then((result) => {
        this.$refs.FAQEntryModal.faq = result.data;
         this.loading = false;
        this.$refs.FAQEntryModal.isDisabled = false;
      });
      this.$refs.FAQEntryModal.dialog = true;
    },
  },
};

</script>
