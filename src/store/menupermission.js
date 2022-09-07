import MenuPermissionService from '../services/permission';
//import Constant from '../constant';

export const menupermission = {
    state: {
        menuList: [],
        permission: [],

    },
    getters: {
        getPermissionByMenuForView: (state) => (program_code, action) => {
            var allpermission = [];
            state.menuList.forEach(function(item) {
                allpermission.push(item);
                item.children.forEach(function(childrenitem) {
                    allpermission.push(childrenitem);
                });
            });
            state.permission = allpermission.filter(m => m.program_name === program_code && m.view === action);
            if (state.permission.length > 0) {
                return true;
            } else {
                return false;
            }

        },
        // getPermissionByChildrenMenuForView: (state) => (program_code, action) => {
        //     state.permission = state.menuList.children.filter(m => m.program_name === program_code && m.view === action);
        //     if (state.permission.length > 0) {
        //         return true;
        //     } else {
        //         return false;
        //     }
        // },
    },
    actions: {
        getMenuPermission({ commit }, items) {
            return new Promise((resolve, reject) => {
                MenuPermissionService.GeAllMenuPermission()
                    .then(response => {
                        resolve(response)
                        items = response.data;
                        commit('setMenuPermission', items)
                    }, error => {
                        reject(error)
                    })
            })
        },

    },
    mutations: {
        setMenuPermission(state, items) {
            state.menuList = items;
        },
    },

}