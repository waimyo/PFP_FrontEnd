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
        <v-card-title>Manage Categories</v-card-title>
        <v-divider></v-divider>
        <v-col cols="12" md="12">
          <v-row dense class="mb-n5">
            <v-col cols="12" md="6" >
              <v-btn v-if="isshow" @click="newItem()" class="mt-1" small outlined color="indigo"
                ><v-icon left>mdi-plus-circle</v-icon>Create New
                <ManageCategoryEntry v-on:getData="GetAllData" ref="ManageCategoryEntryModal"
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
                  <v-btn v-if="isshoweng" class="mr-2" small outlined color="primary" @click="Filter">Search</v-btn>
                  <v-btn v-if="isshoweng" class small outlined color="error" @click="ResetFilter"
                    >Reset</v-btn
                  >
                   <v-btn v-if="isshowmyan"  class="mr-2" small outlined color="primary" @click="Filter">ရှာမည်</v-btn>
                  <v-btn v-if="isshowmyan" class small outlined color="error" @click="ResetFilter"
                    >ပြန်လည်ရွေးချယ်မည်</v-btn
                  >
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-data-table
         :disable-sort="isDisabled"
            :headers="headers"
            :items="categorylist"
            :search="search"
            :options.sync="pagination"
            :server-items-length="totalclass"
            :footer-props="footerProps"
          >
            <template v-slot:item="row">
              <tr >
                <td v-if="!ishidecreatebtn">
                <v-btn @click="editItem(row.item)" dense class="mr-2" small outlined color="warning">Edit</v-btn>
                <v-btn @click="deleteItem(row.item)" dense class="mr-2" small outlined color="error">Delete</v-btn>
                </td>
                <td>{{ row.item.name }}</td>
              </tr>
            </template>
          </v-data-table>
        </v-col>
      </v-card>
    </v-col>
  </div>
</template>

<script>
import ManageCategoryEntry from "../ManageCategoryGroup/ManageCategoryEntry.vue";
import CategoryService from"../../services/categoryservice"
export default {
  components: {
    ManageCategoryEntry,
  },
  data() {
    return {
      dialog: false,
      categorylist:[],
      loading: false,
      isDisabled:false,
      snackbar: false,
      showMessages: true,
      ishidecreatebtn:true,
      totalclass:0,
       x: "right",
       y: "top",
       search:"",
       isshow:true,
       isshoweng:true,
       isshowmyan:false,
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

      head: [{ text: "Action", value: "name", sortable:false,width: "200" },{ text:"Name", value: "name", width: "200" }],
      headerforuser: [{ text:"Name", value: "name", width: "200" }],


    };
  },
  computed: {
        params(nv) {
            console.log(nv);
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
    // this.GetAllData();
     let user=JSON.parse(localStorage.getItem('user'));
    // For CPU role
    if(user.role_id==1){
      this.isshow=true;
      this.isshoweng=true;
      this.headers=this.head;
      this.ishidecreatebtn=false;
    }
    else{
      this.isshow=false;
      this.isshowmyan=true;
      this.isshoweng=false;
      this.headers=this.headerforuser;
      this.ishidecreatebtn=true;
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

      CategoryService.GetAll(params).then(
          (response) => {
            vm.categorylist = [];
            vm.categorylist=response.data.data;
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
      this.$refs.ManageCategoryEntryModal.category.id=0;
      this.$refs.ManageCategoryEntryModal.dialog = true;

    },
    deleteItem(item) {
      var vm = this;
       vm.loading = true;
       vm.isDisabled = true;
      this.$confirm("Are you sure you want to delete this item?").then((result) => {
        if (result) {
          CategoryService.DeleteData(item).then(
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
      this.$refs.ManageCategoryEntryModal.isDisabled = true;
      CategoryService.GetById(item.id).then((result) => {
        this.$refs.ManageCategoryEntryModal.category = result.data;
         this.loading = false;
        this.$refs.ManageCategoryEntryModal.isDisabled = false;
      });
      this.$refs.ManageCategoryEntryModal.dialog = true;
    },
  },
};

</script>
