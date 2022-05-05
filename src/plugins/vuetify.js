import Vue from 'vue';
import Vuetify from 'vuetify/lib';

import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

import 'zingchart/es6';
import zingchartVue from 'zingchart-vue';

import '@mdi/font/css/materialdesignicons.css'

Vue.component('zingchart', zingchartVue)

Vue.use(Vuetify);
Vue.use(DatePicker);

export default new Vuetify({
    icons: {
        iconfont: 'mdi',
    },
});