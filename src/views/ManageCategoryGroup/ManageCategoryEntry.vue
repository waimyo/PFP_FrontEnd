<style scoped>
.theme--light.v-subheader.sub {
    float: left;
    margin-top: -35px;
}
</style>
<template>
<div>
    <v-snackbar class="pt-0" :color="color" v-model="snackbar" :right="x" :timeout="timeout" :top="y">
        {{ text }}
        <template v-slot:action="{ attrs }">
            <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
                <v-icon>mdi-close-circle</v-icon>
            </v-btn>
        </template>
    </v-snackbar>
    <v-dialog persistent v-model="dialog" width="600" autocomplete="off">
        <v-card :disabled="isDisabled">

            <v-card-title class="grey black--text lighten-3">
                Create New Category
                <v-spacer></v-spacer>
                <v-icon color="primary" text @click="dialog = false;reset()">mdi-close-circle</v-icon>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-form autocomplete="off" @submit.prevent="Insert" ref="form" v-model="valid" lazy-validation>
                        <v-row dense>
                            <v-col cols="12" md="12">
                                <v-row dense>
                                    <v-col cols="12" md="3">
                                        <v-subheader>Category Name<span class="red--text title">*</span></v-subheader>
                                    </v-col>
                                    <v-col cols="12" md="8">
                                        <v-text-field outlined dense v-model="category.name" :rules="catRules" autocomplete="off"></v-text-field>
                                    </v-col>
                                </v-row>

                                <v-row dense>
                                    <v-col cols="12" md="3"> </v-col>
                                    <v-col cols="12" md="8">
                                        <v-btn small outlined color="indigo" class="mr-2" type="submit">Save</v-btn>
                                        <v-btn @click="reset()" small outlined color="error">Reset</v-btn>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-container>
            </v-card-text>
        </v-card>
    </v-dialog>
    <!-- </v-col> -->
</div>
</template>

<script>
import CategoryService from "../../services/categoryservice"
import Category from "../../models/category"
export default {
    data() {
        return {
            isDisabled: false,
            category: new Category(),
            color: "",
            mode: "",
            snackbar: false,
            text: "",
            timeout: "5000",
            x: "right",
            y: "top",
            valid: true,
            dialog: false,
            catRules: [(v) => !!v || "အမျိုးအစားအမည်ထည့်ရန်လိုအပ်ပါသည်။"]
        };
    },
    computed: {},
    created() {
        this.$emit("eventname", true);
    },
    methods: {
        Insert() {
            var vm = this;
            if (vm.category.name == null || vm.category.name == "") {
                vm.validate();
            } else {
                vm.isDisabled = true;
                CategoryService.InsertData(vm.category).then(result => {
                    if (result.data.success) {
                        this.$emit("getData", {
                            methodCall: 'GetAllData'
                        });
                        vm.reset();

                        vm.color = "success";

                    } else {
                        vm.color = "red";

                    }
                    vm.isDisabled = false;
                    vm.snackbar = true;
                    vm.text = result.data.messages[0];

                })

            }
        },
        validate() {
            this.$refs.form.validate();
        },

        reset() {
            this.$refs.form.reset();

        },
    },
};
</script>
