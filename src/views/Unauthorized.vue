<style scoped>
.accessdenied {
  background: linear-gradient(rgba(255, 255, 255, 0.9), rgb(211 218 255 / 90%)) fixed
    center center;
  background-size: cover;
  padding: 60px 0;
}
.programtitle{
    text-shadow: 1px 1px 2px black, 0 0 1em rgb(250, 250, 250), 0 0 0.2em rgba(255, 255, 255, 0);
    color: white;
    font: 2.2em Georgia, serif;
}
</style>
<template>

<!-- <v-toolbar dark color="warning" class="text-center">
        
        <v-toolbar-title style="text-align: center" class="text-center">Access Denied!</v-toolbar-title>
         <v-btn @click="GoHome" class="white--text mt-5" color="indigo">Go Home</v-btn>
    </v-toolbar> -->
      
    <!-- <v-main class="accessdenied"> -->
      <div class="fill-height accessdenied">
        <v-col cols="12" md="12" class="text-center">
          <h1 class="font-weight red--text programtitle">Access Denied!</h1>

          
          <v-btn @click="GoHome" class="white--text mt-5" color="indigo">
            
            Go Home
            <v-icon class="ml-3" color="white">mdi-arrow-right-bold-hexagon-outline</v-icon>
            </v-btn>
          
          
        </v-col>
      </div>
    <!-- </v-main> -->
     
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    this.$emit("eventname", false);
    this.user = JSON.parse(localStorage.getItem("user"));

    //this.GoHome();
  },
  methods:{
    GoHome(){
      if(this.user.role_id != 4){
        this.$router.push({ name: "Home" });
      }
      else{
        //alert("datalist")
        this.$router.push({ path: "/DataList" });
      }
    }
  }
};
</script>
