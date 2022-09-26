<template>
  <div>
    <!-- Start of Navigation -->

    <!-- Start of app toolbar -->
    <v-app-bar color="#03a9f4" dark app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <!-- <img style="width: 60px" src="../assets/Logo/logo_accm.png" /> -->
      <!-- <img style="width: 60px" :src="require(`${ udata.minlogo }`)"/> -->
      <!-- <img style="width: 60px" :src="minlogo"/> -->
      <!-- <img :src="`data:image/png;base64,${udata.minlogo}`" /> -->
      <!-- <img v-bind:src="'data:image/jpeg;base64,'+udata.mlogo" /> -->
      <!-- <img :src="mlogo" /> -->
      <img
        style="width: 60px"
        :src="`data:image/png;base64,${udata.minlogo}`"
      />
      <v-toolbar-title class="text-uppercase subtitle-1 ml-3"
        ><h6
          style="
            text-shadow: 1px 1px 1px black, 0 0 1em rgb(250 250 250),
              0 0 0.2em blue;
          "
        >
          Public Feedback Programme
        </h6>
        <h4
          style="
            letter-spacing: 0;
            text-shadow: 1px 1px 1px black, 0 0 1em rgb(250 250 250),
              0 0 0.2em blue;
          "
        >
          {{ udata.minname }}
        </h4>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div
        class="mr-7"
        v-if="udata.role_id == 2 || udata.role_id == 3 || udata.role_id == 4"
      >
        <v-badge color="warning" :content="msgcount" :value="msgcount">
          <!-- <router-link :to="{ path: '/InboundOutboundLetterList' }"> -->
          <v-icon>mdi-email</v-icon>
          <!-- </router-link> -->
        </v-badge>
      </div>
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-width="100"
        offset-y
      >
        <template v-slot:activator="{ on, attrs }">
          <!-- <v-btn
          color="indigo"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Menu as Popover
        </v-btn> -->
          <v-icon size="22" v-bind="attrs" v-on="on" class="mr-5"
            >mdi-information-outline</v-icon
          >
        </template>

        <v-card>
          <v-list dense>
            <v-list-item v-if="udata.role_id == 1">
              <a
                style="font-size: 13px"
                href="/UserGuide(SuperAdminRole).pdf"
                download=""
                small
                outlined
              >
                <v-icon color="indigo">mdi-download</v-icon>User Guide Download
                ရယူရန်</a
              >
            </v-list-item>
            <v-list-item v-if="udata.role_id == 2">
              <a
                style="font-size: 13px"
                href="/UserGuide(MinistryRole).pdf"
                download=""
                small
                outlined
              >
                <v-icon color="indigo">mdi-download</v-icon>User Guide Download
                ရယူရန်</a
              >
            </v-list-item>
            <v-list-item v-if="udata.role_id == 3">
              <a
                style="font-size: 13px"
                href="/UserGuide(CPURole).pdf"
                download=""
                small
                outlined
              >
                <v-icon color="indigo">mdi-download</v-icon>User Guide Download
                ရယူရန်</a
              >
            </v-list-item>
            <v-list-item v-if="udata.role_id == 4">
              <a
                style="font-size: 13px"
                href="/UserGuide(DEORole).pdf"
                download=""
                small
                outlined
              >
                <v-icon color="indigo">mdi-download</v-icon>User Guide Download
                ရယူရန်</a
              >
            </v-list-item>

            <v-list-item>
              <a style="font-size: 13px" @click="ExportExcel" small outlined>
                <v-icon color="indigo">mdi-download</v-icon>Location Download
                ရယူရန်</a
              >
              <a href="#" id="mylink"></a>
              <!-- <v-btn
                style="float: right"
                :loading="excelloading"
                :disabled="excelloading"
                small
                outlined
                color="success"
                @click="ExportExcel"
                ><v-icon left>mdi-export</v-icon> Location Download ရယူရန်
                <span slot="loader" class="custom-loader">
                  <v-icon light>mdi-cached</v-icon>
                </span></v-btn
              >
              <a href="#" id="mylink"></a> -->
            </v-list-item>
            <v-list-item>
              <a
                style="font-size: 13px"
                @click="ServiceExportExcel"
                small
                outlined
              >
                <v-icon color="indigo">mdi-download</v-icon>Service Download
                ရယူရန်</a
              >
              <a href="#" id="mylink"></a>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>

      <v-menu v-model="menu1" :close-on-content-click="false" offset-y>
        <template v-slot:activator="{ on, attrs }">
          <!-- <v-btn
          color="indigo"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Menu as Popover
        </v-btn> -->
          <v-icon size="22" v-bind="attrs" v-on="on" class=""
            >mdi-account-circle</v-icon
          >
        </template>

        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-avatar>
                <!-- <img
                src="https://cdn.vuetifyjs.com/images/john.jpg"
                alt="John"
              > -->
                <v-icon
                  color="warning darken-1"
                  size="40"
                  v-bind="attrs"
                  v-on="on"
                  class=""
                  >mdi-account-circle</v-icon
                >
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ udata.username }}</v-list-item-title>
                <v-list-item-subtitle class="pt-2">{{
                  udata.name
                }}</v-list-item-subtitle>
              </v-list-item-content>

              <!-- <v-list-item-action>
              <v-btn
                :class="fav ? 'red--text' : ''"
                icon
                @click="fav = !fav"
              >
                <v-icon>mdi-heart</v-icon>
              </v-btn>
            </v-list-item-action> -->
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <!-- <v-list>
          <v-list-item>
            <v-list-item-action>
              <v-switch
                v-model="message"
                color="purple"
              ></v-switch>
            </v-list-item-action>
            <v-list-item-title>Enable messages</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-action>
              <v-switch
                v-model="hints"
                color="purple"
              ></v-switch>
            </v-list-item-action>
            <v-list-item-title>Enable hints</v-list-item-title>
          </v-list-item>
        </v-list> -->

          <v-card-actions>
            <!-- <v-spacer></v-spacer> -->
            <v-col cols="12" md="12" class="text-center">
              <v-btn small @click="Logout" outlined color="warning">
                Logout<v-icon right>mdi-logout</v-icon>
              </v-btn>
            </v-col>
          </v-card-actions>
        </v-card>
      </v-menu>

      <!-- <h5 style="letter-spacing: 0;">{{udata.username}}</h5>
      
      <v-btn text small @click="Logout">
                    <v-icon right>mdi-logout</v-icon>
                  </v-btn> -->
    </v-app-bar>
    <!-- End of app toolbar -->

    <!-- Start of mobile side menu -->
    <v-navigation-drawer v-model="drawer" app clipped width="290">
      <v-list dense>
        <template v-for="item in items">
          <v-row v-if="item.heading" :key="item.heading" align="center">
            <v-col cols="6">
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-col>
            <v-col cols="6" class="text-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-col>
          </v-row>
          <v-list-group
            v-else-if="item.children.length > 0"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item.icon"
            append-icon="mdi-chevron-down"
            dense
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="(child, i) in item.children"
              :key="i"
              link
              :to="child.href"
              dense
            >
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ child.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item v-else :key="item" link :to="item.href">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>

      <div v-if="udata.role_id != 1 && show">
        <a
          style="font-size: 12px; color: #000"
          @click="ShowChangePasswordDialog(udata.id)"
          class="ml-3"
          ><v-icon class="mr-2 ml-1">mdi-asterisk</v-icon>Password ပြောင်းရန်
          <ChangePwd ref="PasswordModal" />
        </a>
      </div>
      <div v-if="udata.role_id == 2 && show" class="mt-4">
        <a
          style="font-size: 12px; color: #000"
          @click="editItem(udata.id)"
          class="ml-3 mt-8"
          ><v-icon class="mr-2 ml-1">mdi-asterisk</v-icon>Logo ပြောင်းရန်
          <MinistryEntry ref="MinistryEntryModal" />
        </a>
        <!-- <v-btn @click="editItem(udata.ministry_id)" dense class="ml-5 mt-5" small outlined color="warning">Logo ပြောင်းရန်
                <MinistryEntry ref="MinistryEntryModal"
              />
              </v-btn> -->
      </div>
    </v-navigation-drawer>
    <!-- End of mobile side menu -->

    <!-- End of Navigation -->
  </div>
</template>

<script>
//import AccountService from '../services/accountservice';
//import ChangePasswordEntry from "../../views/ChangePassword/ChangePassword";
import ChangePwd from "../views/ChangePassword/ChangePwd";
import AccountService from "../services/accountservice";
import Account from "../models/account";
import MinistryEntry from "../views/Data Management/MinistryEntry";
import MinistryService from "../services/ministryservice";
import LocationService from "../services/locationservice";
import ServiceService from "../services/serviceservice";
import InboundOutboundService from "../services/inboxoutbox.service";
import $ from "jquery";
import * as signalR from "@aspnet/signalr";

export default {
  components: {
    ChangePwd,
    MinistryEntry,
  },

  name: "App",
  data() {
    return {
      drawer: null, // Hide mobile side menu by default
      udata: "",
      minlogo: "",
      items: [],
      account: new Account(),
      show: false,
      menu: false,
      menu1: false,
      excelloading: false,
      msgcount: 0,
    };
  },

  updated() {
    this.GetCountUnreadMessage();
  },
  created() {
    var vm = this;
    vm.getMenu();
    //vm.GetCountUnreadMessage();
    vm.udata = JSON.parse(localStorage.getItem("user"));
    var connection = "";
    connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:44315/chatHub")
      .build();
    connection.start();
    connection.on("ReceiveNoti", function (bcount) {
      console.log("private bcount " + bcount);
      //vm.GetCountUnreadMessage();
    });
  },

  methods: {
    getMenu() {
      this.items = this.getLists;
      if (this.items.length == 0) {
        this.$store.dispatch("getMenuPermission").then((response) => {
          this.items = response.data;
          this.show = true;
        });
      } else {
        this.items;
        this.show = true;
      }
    },

    editItem(item) {
      this.loading = true;
      this.$refs.MinistryEntryModal.isDisabled = true;
      MinistryService.GetById(item).then((result) => {
        this.$refs.MinistryEntryModal.ministry = result.data;
        if (result.data.imagebyte == null || result.data.imagebyte == "") {
          this.$refs.MinistryEntryModal.ministry.imagebyte = null;
        } else {
          this.$refs.MinistryEntryModal.ministry.imagebyte = `data:image/x-icon;base64,${result.data.imagebyte}`;
        }
        this.loading = false;
        this.$refs.MinistryEntryModal.isDisabled = false;
      });
      this.$refs.MinistryEntryModal.dialog = true;
    },

    getImage(poster) {
      return poster ? require("" + poster) : "";
    },

    Logout() {
      this.$store.state.menupermission.menuList = [];
      this.$store.dispatch("auth/logout");
      this.$router.push({
        name: "Login",
      });
    },

    ShowChangePasswordDialog(item) {
      //this.$refs.ChangePasswordModal.dialog=true;
      AccountService.GetById(item).then((result) => {
        this.$refs.PasswordModal.account = result.data;
        this.$refs.PasswordModal.isshowcurrentpassword = false;
        this.$refs.PasswordModal.dialog = true;
      });
    },

    GetCountUnreadMessage() {
      let vm = this;
      InboundOutboundService.GetCountUnread().then((result) => {
        vm.msgcount = result.data;
      });
    },

    ExportExcel() {
      var vm = this;
      vm.excelloading = true;
      LocationService.GetExcelData().then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        $("#mylink").attr("href", url);
        $("#mylink").attr("download", "Location.xls");
        $("#mylink")[0].click();
        vm.excelloading = false;
      });
    },

    ServiceExportExcel() {
      var vm = this;
      vm.excelloading = true;
      ServiceService.GetExcelDataForDownload().then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        $("#mylink").attr("href", url);
        $("#mylink").attr("download", "Service.xls");
        $("#mylink")[0].click();
        vm.excelloading = false;
      });
    },
    ChatList() {
      alert("charlist");
      this.$router.push({
        name: "CampaignConfirm",
      });
    },
  },

  computed: {
    getLists() {
      return this.$store.state.menupermission.menuList;
    },
  },
};
</script>
