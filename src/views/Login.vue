<style scoped>
  .programtitle{
    text-shadow: 1px 1px 2px black, 0 0 1em rgb(250, 250, 250), 0 0 0.2em blue;
    color: white;
    font: 1.2em Georgia, serif;
/* 
    color: #FFFFFF;
background: #996D6D;
text-shadow: #474747 3px 5px 2px;
color: #FFFFFF;
background: #996D6D; */
  }
</style>

<template>
  <v-app id="inspire">
    <v-main>

      <v-snackbar
          class="pt-0"
          :color="color"
          v-model="snackbar"
          :timeout="timeout"
          :top="y"
          :right="x"
        >
          {{ message }}
          <template v-slot:action="{ attrs }">
            <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
              <v-icon>mdi-close-circle</v-icon>
            </v-btn>
          </template>
        </v-snackbar>

      <v-container class="fill-height" fluid style="background: #e7ebee">
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-3">
              <v-toolbar color="#ff5959" dark flat height="120px" class="text-center">
                <v-toolbar-title class="flex text-center programtitle"
                  >PUBLIC FEEDBACK PROGRAMME</v-toolbar-title
                >
              </v-toolbar>
              <v-card-text>
                <v-form class="mt-5">
                  <v-col cols="12" md="12">
                    <v-text-field
                    v-model="user.name"
                      name="login"
                      prepend-inner-icon="mdi-account-circle"
                      outlined
                      dense
                    ></v-text-field>

                    <v-text-field
                    v-model="user.password"
                     :type="show2 ? 'text' : 'password'"
                      prepend-inner-icon="mdi-key"
                      outlined
                      dense
                      v-on:keyup.enter="HandleLogin"
                      @click:append="show2 = !show2"
                      :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"

                    ></v-text-field>

                    <v-checkbox
                      class="mt-n2"
                      v-model="checkbox"
                      label="Remember me"
                    ></v-checkbox>

                    <v-btn @click="HandleLogin" color="success" block dark>Login</v-btn>
                  </v-col>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import User from "../models/user"
import MenuPermissionService from '../services/permission';
export default {
  props: {
    source: String,
  },
  data: () => ({
    show2: false,
    showpass: true,

    color: "",
    snackbar: false,
    message: "",
    timeout: "5000",
    x: "right",
    y: "top",

    user: new User(),
  }),
  created() {
    this.$emit("eventname", false);
  },
  methods:{

    GetAllMenu(result) {
      new Promise((resolve) => {
        MenuPermissionService.GeAllMenuPermission().then((response) => {
          this.$store.state.menupermission.menuList = response.data;
          resolve(response);
           if(result.role_id == 4){
              this.$router.push({ name: "DataList" });
            }
            else{
              this.$router.push({ name: "Home" });
            }
        });
      });
    },

    HandleLogin() {
      this.message = "";
      this.$store.dispatch("auth/login", this.user).then(
        (result) => {
          if (result.token) {
            this.GetAllMenu(result);
           
            
          } else {
            this.$router.push({ name: "Login" });
            this.color = "red";
            this.snackbar = true;
            this.message = result.msg;
          }
        },
        (error) => {
          this.message =
            (error.response && error.response.datat) || error.message || error.toString();
        }
      );
    },
  }


   


};
</script>
