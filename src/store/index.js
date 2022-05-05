import Vue from 'vue';
import Vuex from 'vuex';
//import {permissions} from '../services/permission'
import { auth } from './auth.module';
import { menupermission } from './menupermission';

Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        auth,
        menupermission
    }
});