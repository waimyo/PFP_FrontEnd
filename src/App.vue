<template>
<div id="app">
  <v-app id="inspire">
    <v-app id="inspire">
      <NavigationDrawer v-if="valid" />
  <v-content>
      <router-view @eventname="updateparent"></router-view>
    </v-content>
      <v-footer
        color="#d8dde2"
        app
        v-if="valid"
        padless
      >
      <v-col
      class="text-center"
      cols="12"
    >
    <span ><marquee><strong> <h5 style="font-weight: 600;color: #ff1100;" class="pl-5">{{announce}}</h5></strong></marquee></span>
        <span>&copy; {{ new Date().getFullYear() }} — <strong>Public Feedback Programme (PFP)</strong></span>
      </v-col>
      </v-footer>
    </v-app>
  </v-app>
</div>

  <!-- <v-app id="inspire">
    <NavigationDrawer v-if="valid" />
    <v-content>
      <router-view @eventname="updateparent"></router-view>
    </v-content>
    <v-footer v-if="valid" padless color="#d8dde2">
    <v-col
      class="text-center"
      cols="12"
      
    >
      {{ new Date().getFullYear() }} — <strong>Public Feedback Program</strong>
    </v-col>
  </v-footer>
  
  </v-app> -->
</template>

<script>
import NavigationDrawer from "./views/NavigationDrawer";
import announcementservice from "./services/announcementservice"
export default {
  name: "App",
  components: {
    NavigationDrawer,
  },
  data() {        
    return {
      drawer: null, // Hide mobile side menu by default
      valid: false,
      announce:"",
      isannounce:false,
    };
  },
  created() {
    this.getannouncement();
  },
  methods: {
    updateparent(val) {
      this.valid = val;
    },
    getannouncement(){
      var vm=this;
      announcementservice.GetAnnouncements().then((result) => {
        if(result.data != ""){
          vm.isannounce=true;
          vm.announce=result.data;
        }     
      });
    }
  },
};
</script>
