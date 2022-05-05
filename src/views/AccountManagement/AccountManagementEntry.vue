<style scoped>
.theme--light.v-subheader.sub {
  float: left;
  margin-top: -35px;
}
</style>
<template>
  <div>
    <v-col cols="12" md="12">
      <v-card>
        <v-card-title
          ><router-link :to="{ name: 'AccountManagementList' }" tag="v-btn">
            <v-icon color="primary" class="mr-3"
              >mdi-arrow-left-bold-box</v-icon
            > </router-link
          >Create New Account</v-card-title
        >
        <v-divider></v-divider>
        <v-col cols="12" md="12">
          <!-- <v-form
            autocomplete="off"
            @submit.prevent="Insert"
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-row dense>
              <v-col cols="12" md="12">
                <v-row dense>
                  <v-col cols="12" md="2">
                    <v-subheader>Name</v-subheader>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field outlined dense></v-text-field>
                    <v-subheader class="sub">English</v-subheader>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field outlined dense></v-text-field>
                    <v-subheader class="sub">Myanmar</v-subheader>
                  </v-col>
                </v-row>

                <v-row dense>
                  <v-col cols="12" md="2">
                    <v-subheader>တည်နေရာ</v-subheader>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-autocomplete
                      outlined
                      dense
                      placeholder="-တိုင်းဒေသကြီး/ပြည်နယ်-"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-autocomplete
                      outlined
                      dense
                      placeholder="-Select District-"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="2">
                    <v-autocomplete
                      outlined
                      dense
                      placeholder="-Select Township-"
                    ></v-autocomplete>
                  </v-col>
                </v-row>

                <v-row dense>
                  <v-col cols="12" md="2">
                    <v-subheader>Account Link</v-subheader>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-autocomplete outlined dense></v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-autocomplete outlined dense placeholder="-Select Parent CPU-"></v-autocomplete>
                  </v-col>
                </v-row>

                <v-row dense>
                  <v-col cols="12" md="2">
                    <v-subheader>Login Details</v-subheader>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      outlined
                      dense
                      placeholder="Please write username in English only"
                    ></v-text-field>
                    <v-subheader class="sub">Username</v-subheader>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      outlined
                      dense
                      placeholder="Please write password in English only"
                    ></v-text-field>
                    <v-subheader class="sub">Password</v-subheader>
                  </v-col>
                </v-row>

                <v-row dense>
                  <v-col cols="12" md="2">
                    <v-subheader>Email Address</v-subheader>
                  </v-col>
                  <v-col cols="12" md="8">
                    <v-text-field outlined dense></v-text-field>
                    <v-subheader class="sub">Username</v-subheader>
                  </v-col>
                </v-row>

                <v-row dense>
                  <v-col cols="12" md="2"> </v-col>
                  <v-col cols="12" md="8">
                    <v-btn small outlined color="indigo" class="mr-2"
                      >Create Account</v-btn
                    >
                    <v-btn small outlined color="error">Reset</v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-form> -->

          <v-form
            autocomplete="off"
            @submit.prevent="Insert"
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-row dense>
              <v-col cols="12" md="12">
                <v-row dense>
                  <v-col cols="12" md="2"> </v-col>
                  <v-col cols="12" md="8">
                    <v-radio-group v-model="ex7" row>
                      <v-radio
                        label="Ministry Account"
                        color="primary"
                        value="red"
                      ></v-radio>
                      <v-radio
                        label="CPU Account"
                        color="red"
                        value="red darken-3"
                      ></v-radio>
                      <v-radio label="DEO Account" color="green" value="indigo"></v-radio>
                    </v-radio-group>
                  </v-col>
                </v-row>

                <v-row dense>
                  <v-col cols="12" md="2">
                    <v-subheader>Name</v-subheader>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field outlined dense></v-text-field>
                    <v-subheader class="sub">English</v-subheader>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field outlined dense></v-text-field>
                    <v-subheader class="sub">Myanmar</v-subheader>
                  </v-col>
                </v-row>

                <v-row dense>
                  <v-col cols="12" md="2">
                    <v-subheader>Account Link</v-subheader>
                  </v-col>
                  <v-col cols="12" md="8">
                    <v-autocomplete outlined dense></v-autocomplete>
                  </v-col>
                </v-row>

                <v-row dense>
                  <v-col cols="12" md="2">
                    <v-subheader>Login Details</v-subheader>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      outlined
                      dense
                      placeholder="Please write username in English only"
                    ></v-text-field>
                    <v-subheader class="sub">Username</v-subheader>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      outlined
                      dense
                      placeholder="Please write password in English only"
                    ></v-text-field>
                    <v-subheader class="sub">Password</v-subheader>
                  </v-col>
                </v-row>

                <v-row dense>
                  <v-col cols="12" md="2">
                    <v-subheader>Email Address</v-subheader>
                  </v-col>
                  <v-col cols="12" md="8">
                    <v-text-field outlined dense></v-text-field>
                    <v-subheader class="sub">Username</v-subheader>
                  </v-col>
                </v-row>

                <v-row dense>
                  <v-col cols="12" md="2"> </v-col>
                  <v-col cols="12" md="8">
                    <v-btn small outlined color="indigo" class="mr-2"
                      >Create Account</v-btn
                    >
                    <v-btn small outlined color="error">Reset</v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-form>
        </v-col>
      </v-card>
    </v-col>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ex7: "red",
      showMessages: true,
    };
  },
  computed: {
    messages() {
      return this.showMessages ? ["Active"] : undefined;
    },
  },
  created() {
    this.$emit("eventname", true);
  },
};
</script>
