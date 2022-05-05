import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router/index'
import VuetifyConfirm from 'vuetify-confirm'
import store from './store/index'

import MenuPermissionService from './services/permission';

require('./assets/css/index.css');

Vue.config.productionTip = false
Vue.config.silent = true
    // new Vue({
    //         vuetify,
    //         router,
    //         store,
    //         render: h => h(App)
    //     })
    //.$mount('#app')

Vue.use(VuetifyConfirm, {
    buttonTrueText: 'Ok',
    buttonFalseText: 'Cancel',
    color: 'warning',
    icon: 'mdi-alert-decagram',
    title: 'Warning',
    width: 400,
    property: '$confirm'
})


new Promise(resolve => {
    MenuPermissionService.GeAllMenuPermission()
        .then(response => {
            store.state.menupermission.menuList = response.data;
            //window.console.log()
            new Vue({
                vuetify,
                router,
                store,
                //layoutstore,
                render: h => h(App)
            }).$mount('#app')
            resolve(response);
        });
})