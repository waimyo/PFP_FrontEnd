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
export default {
  name: "App",
  components: {
    NavigationDrawer,
  },
  data() {
    return {
      drawer: null, // Hide mobile side menu by default
      valid: false,
    };
  },
  methods: {
    updateparent(val) {
      this.valid = val;
    },
  },
};
</script>
