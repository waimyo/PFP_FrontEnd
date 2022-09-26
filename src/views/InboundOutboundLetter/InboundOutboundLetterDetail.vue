<style scoped>
.v-application p {
  margin-bottom: 0px;
}
.theme--light.v-expansion-panels .v-expansion-panel {
  border-left: 2px solid #fbba00;
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
    <v-col cols="12" md="12">
      <v-row dense>
        <v-col cols="12" md="2">
          <router-link
            v-if="this.inbound == 'true'"
            :to="{ name: 'InboundLetterList' }"
            tag="v-btn"
          >
            <v-icon color="primary" class="mb-n2"
              >mdi-arrow-left-bold-box</v-icon
            >
          </router-link>
          <router-link v-else :to="{ name: 'OutboundLetterList' }" tag="v-btn">
            <v-icon color="primary" class="mb-n2"
              >mdi-arrow-left-bold-box</v-icon
            >
          </router-link>
          <!-- <router-link :to="{ name: 'InboundOutboundLetterList' }" tag="v-btn">
            <v-icon color="primary" class="mb-n2"
              >mdi-arrow-left-bold-box</v-icon
            >
          </router-link> -->
        </v-col>
        <v-col cols="12" md="10" class="text-right">
          <v-btn @click="newItem()" class="mb-1" small color="primary"
            >Reply<v-icon right>mdi-reply</v-icon>
            <InboundOutboundLetterEntry
              v-on:getDetailData="GetAllData"
              ref="InboundOutboundLetterEntryModal"
          /></v-btn>
        </v-col>
      </v-row>

      <v-expansion-panels accordion>
        <v-expansion-panel v-for="(item, i) in datalist" :key="i">
          <v-expansion-panel-header
            :class="{ 'light-blue lighten-4': item.isread == false }"
            @click="ChangeStatus(item.id, item.isread)"
          >
            <p class="mb-n1 primary--text">
              <v-icon color="primary" left>mdi-account-circle</v-icon>
              {{ item.sender }}
            </p>
            <p style="font-size: 13px" class="text-right mr-3">
              <v-icon class="mr-3">mdi-calendar-clock</v-icon
              >{{ item.created_date }}
            </p>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <p class="mb-n1 primary--text">To: {{ item.receiver }}</p>
          </v-expansion-panel-content>
          <v-expansion-panel-content>
            {{ item.description }}
          </v-expansion-panel-content>
          <v-expansion-panel-content v-for="(file, i) in item.file" :key="i">
            <a
              :download="file.file_name"
              :href="`data:image/png;base64,${file.file_path}`"
              ><v-icon class="mr-2" small color="">mdi-file</v-icon
              >{{ file.file_name }}</a
            ><br />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
  </div>
</template>

<script>
import InboundOutboundLetterEntry from "../InboundOutboundLetter/InboundOutboundLetterEntry.vue";
import InboxOutboxService from "../../services/inboxoutbox.service";
import DropDownService from "../../services/dropdownservice";
import inboxoutboxService from "../../services/inboxoutbox.service";
import * as signalR from "@aspnet/signalr";

export default {
  components: {
    InboundOutboundLetterEntry,
  },
  data: () => ({
    panel: [1],
    readonly: false,
    loading: true,
    chatting_id: 0,
    disabletouserlist: false,
    cputouserlist: false,
    touserlist: [],
    receiver_id: 0,
    panelcolor: "",
    datalist: [],
    connection: "",
  }),
  computed: {},
  created() {
    this.panelcolor = "#E1F5FE";
    this.$emit("eventname", true);
    this.chatting_id = this.$route.query.chatting_id;
    this.inbound = this.$route.query.inbound;
    this.sender_id = this.$route.query.sender_id;
    let user = JSON.parse(localStorage.getItem("user"));
    if (user.role_id == 2 && this.inbound == "false") {
      this.ishidecreatebtn = false;
      this.cputouserlist = true;
      this.GetCPU();
    }
    // For CPU role
    if (user.role_id == 3 && this.inbound == "false") {
      this.ishide = false;
      this.disabletouserlist = true;
      this.GetMinistry();
      //this.GetDEOByChatId();
    } else {
      this.receiver_id = this.sender_id;
    }
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:44315/chatHub")
      .build();
    this.connection.start();
    this.GetAllData();
  },
  methods: {
    SendNoti() {
      this.connection.start();
      this.connection.invoke("SendNoti").catch(function (err) {
        return console.error(err);
      });
    },
    GetMinistry() {
      var vm = this;
      DropDownService.GetMinistryAccountByChattingId(this.chatting_id).then(
        (result) => {
          vm.touserlist = result.data;
          DropDownService.GetDEOAccountByChattingId(this.chatting_id).then(
            (res) => {
              res.data.forEach((user) => {
                vm.touserlist.push(user);
              });
              //vm.touserlist.push(result.data);
            }
          );
        }
      );
    },
    GetCPU() {
      var vm = this;
      DropDownService.GetCPUAccountByChattingId(this.chatting_id).then(
        (result) => {
          vm.touserlist = result.data;
          console.log(vm.touserlist);
        }
      );
    },
    // GetDEOByChatId(){
    //   var vm=this;
    //   DropDownService.GetDEOAccountByChattingId(this.chatting_id).then((result)=>{
    //     vm.touserlist=result.data;
    //   })
    // },
    newItem() {
      this.$refs.InboundOutboundLetterEntryModal.inboxoutbox.description = "";
      this.$refs.InboundOutboundLetterEntryModal.inboxoutbox.file = null;
      this.$refs.InboundOutboundLetterEntryModal.inboxoutbox.receiver = [];
      this.$refs.InboundOutboundLetterEntryModal.inboxoutbox.ismaindescription = false;
      this.$refs.InboundOutboundLetterEntryModal.inboxoutbox.mainchat_id =
        this.chatting_id;
      if (this.disabletouserlist == true) {
        this.$refs.InboundOutboundLetterEntryModal.touserlist = this.touserlist;
        this.$refs.InboundOutboundLetterEntryModal.disabletouserlist =
          this.disabletouserlist;
      } else {
        this.$refs.InboundOutboundLetterEntryModal.inboxoutbox.receiver[0] =
          this.receiver_id;
      }
      this.$refs.InboundOutboundLetterEntryModal.dialog = true;
    },
    GetAllData() {
      var vm = this;
      vm.loading = true;
      InboxOutboxService.GetDetailData(this.chatting_id).then((res) => {
        vm.datalist = res.data;
        vm.loading = false;
        vm.SendNoti();
      });
    },
    DownloadFile(file) {
      alert("file " + file);
      var ss = new Blob([file]);
      alert("new Blob " + ss);
      var fileURL = window.URL.createObjectURL(new Blob([file]));
      alert(fileURL);
      var fileLink = document.createElement("a");

      fileLink.href = fileURL;
      fileLink.setAttribute("download", "file.pdf");
      document.body.appendChild(fileLink);
      fileLink.click();
    },
    ChangeStatus(id, isread) {
      let vm = this;
      if (isread == false) {
        inboxoutboxService.UpdateStatus(id).then((res) => {
          vm.GetAllData();
          return res.data;
        });
      }
    },
  },
};
</script>
