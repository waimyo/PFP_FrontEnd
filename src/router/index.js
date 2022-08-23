/* eslint-disable */
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import AccountManagementList from "../views/AccountManagement/AccountManagementList";
import AccountManagementEntry from "../views/AccountManagement/AccountManagementEntry";
import InboundOutboundLetterList from "../views/InboundOutboundLetter/InboundOutboundLetterList";
import InboundOutboundLetterEntry from "../views/InboundOutboundLetter/InboundOutboundLetterEntry";
import InboundOutboundLetterDetail from "../views/InboundOutboundLetter/InboundOutboundLetterDetail";
import CategorizationStats from "../views/KPIs/CategorizationStats";
import ResponseStats from "../views/KPIs/ResponseStats";
import GroupList from "../views/SMSSending/GroupList";
import GroupEntry from "../views/SMSSending/GroupEntry";
import GroupConfirm from "../views/SMSSending/GroupConfirm";
import GroupDetail from "../views/SMSSending/GroupDetail";
import CampaignEntry from "../views/SMSSending/CampaignEntry";
import CampaignConfirm from "../views/SMSSending/CampaignConfirm";
import CampaignList from "../views/SMSSending/CampaignList";
import CampaignDetail from "../views/SMSSending/CampaignDetail";
import UncategorizedSMS from "../views/ManageCategoryGroup/UncategorizedSMS";
import CategorizedSMS from "../views/ManageCategoryGroup/CategorizedSMS";
import ManageCategory from "../views/ManageCategoryGroup/ManageCategory";
import DataList from "../views/Data/DataList";
import DataEntry from "../views/Data/DataEntry";
import UploadBulkExcel from "../views/Data/UploadBulkExcel";
import ManageValue from "../views/Data/ManageValue";
import MinistryList from "../views/Data Management/MinistryList";
import DepartmentList from "../views/Data Management/DepartmentList";
import ServiceList from "../views/Data Management/ServiceList";
import LocationList from "../views/Data Management/LocationList";
import AccessLog from "../views/Security/AccessLog";
import ChangePassword from "../views/ChangePassword/ChangePassword";
import AnnouncementList from "../views/Data Management/AnnouncementList";
import FAQList from "../views/Data Management/FAQList";
import Unauthorized from "../views/Unauthorized";
import Constant from "../constant";
import store from '../store'

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "Login",
        component: Login,

        beforeEnter: (to, from, next) => {
            const loggedIn = JSON.parse(localStorage.getItem("user"));
            if (loggedIn) {
                if (loggedIn.role_id == 4) {
                    // alert("4");
                    next("/DataList");
                } else {
                    //alert("not 4");
                    next("/home");
                }
            }
            //if not login,navigate to login page
            else {
                next();
            }
        }
    },

    {
        path: "/Unauthorized",
        name: "Unauthorized",
        component: Unauthorized,
    },

    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/home",
        name: "Home",
        component: Home,

        beforeEnter: (to, from, next) => {
            var h = store.getters.getPermissionByMenuForView(
                Constant.PCodeFor_DASHBOARD,
                Constant.PermissionForView
            );
            if (h == false) {
                next("/Unauthorized");
            } else {
                next();
            }
        }
    },
    {
        path: "/AccountManagementList",
        name: "AccountManagementList",
        component: AccountManagementList,
        children: [{
            path: "AccountManagementEntry",
            name: "AccountManagementEntry",
            component: AccountManagementEntry,
        }, ],

        beforeEnter: (to, from, next) => {
            var h = store.getters.getPermissionByMenuForView(
                Constant.PCodeFor_ACCOUNT,
                Constant.PermissionForView
            );
            if (h == false) {
                next("/Unauthorized");
            } else {
                next();
            }
        }
    },
    {
        path: "/InboundOutboundLetterList",
        name: "InboundOutboundLetterList",
        component: InboundOutboundLetterList,
        children: [{
                path: "InboundOutboundLetterEntry",
                name: "InboundOutboundLetterEntry",
                component: InboundOutboundLetterEntry,
            },
            {
                path: "InboundOutboundLetterDetail",
                name: "InboundOutboundLetterDetail",
                component: InboundOutboundLetterDetail,
            },
        ],

        beforeEnter: (to, from, next) => {
            var h = store.getters.getPermissionByMenuForView(
                Constant.PCodeFor_INBOX_OUTBOX,
                Constant.PermissionForView
            );
            if (h == false) {
                next("/Unauthorized");
            } else {
                next();
            }
        }
    },
    {
        path: "/CategorizationStats",
        name: "CategorizationStats",
        component: CategorizationStats,

        beforeEnter: (to, from, next) => {
            var h = store.getters.getPermissionByMenuForView(
                Constant.PCodeFor_CATEGORIZATION_STATS,
                Constant.PermissionForView
            );
            if (h == false) {
                next("/Unauthorized");
            } else {
                next();
            }
        }
    },
    {
        path: "/ResponseStats",
        name: "ResponseStats",
        component: ResponseStats,

        beforeEnter: (to, from, next) => {
            var h = store.getters.getPermissionByMenuForView(
                Constant.PCodeFor_RESPONSE_STATS,
                Constant.PermissionForView
            );
            if (h == false) {
                next("/Unauthorized");
            } else {
                next();
            }
        }
    },
    {
        path: "/GroupList",
        name: "GroupList",
        component: GroupList,
        children: [{
            path: "GroupDetail",
            name: "GroupDetail",
            component: GroupDetail,
        }, ],

        beforeEnter: (to, from, next) => {
            var h = store.getters.getPermissionByMenuForView(
                Constant.PCodeFor_MOBILE_GROUP_LIST,
                Constant.PermissionForView
            );
            if (h == false) {
                next("/Unauthorized");
            } else {
                next();
            }
        }
    },
    {
        path: "/GroupEntry",
        name: "GroupEntry",
        component: GroupEntry,
        props: true,
        // children: [{
        //         path: 'GroupConfirm',
        //         name: 'GroupConfirm',
        //         component: GroupConfirm,
        //     },

        // ]

        beforeEnter: (to, from, next) => {
            var h = store.getters.getPermissionByMenuForView(
                Constant.PCodeFor_MOBILE_GROUP_ENTRY,
                Constant.PermissionForView
            );
            if (h == false) {
                next("/Unauthorized");
            } else {
                next();
            }
        }
    },
    {
        path: "/GroupConfirm",
        name: "GroupConfirm",
        component: GroupConfirm,
    },
    {
        path: "/CampaignEntry",
        name: "CampaignEntry",
        component: CampaignEntry,
        children: [{
            path: "CampaignConfirm",
            name: "CampaignConfirm",
            component: CampaignConfirm,
        }, ],

        beforeEnter: (to, from, next) => {
            var h = store.getters.getPermissionByMenuForView(
                Constant.PCodeFor_CAMPAIGN_ENTRY,
                Constant.PermissionForView
            );
            if (h == false) {
                next("/Unauthorized");
            } else {
                next();
            }
        }
    },
    {
        path: "/CampaignList",
        name: "CampaignList",
        component: CampaignList,
        children: [{
            path: "CampaignDetail",
            name: "CampaignDetail",
            component: CampaignDetail,
        }, ],

        beforeEnter: (to, from, next) => {
            var h = store.getters.getPermissionByMenuForView(
                Constant.PCodeFor_CAMPAIGN_LIST,
                Constant.PermissionForView
            );
            if (h == false) {
                next("/Unauthorized");
            } else {
                next();
            }
        }
    },
    {
        path: "CampaignDetail",
        name: "CampaignDetail",
        component: CampaignDetail,
    },
    {
        path: "/UncategorizedSMS",
        name: "UncategorizedSMS",
        component: UncategorizedSMS,

        beforeEnter: (to, from, next) => {
            var h = store.getters.getPermissionByMenuForView(
                Constant.PCodeFor_UNCATEGORIZED_SMS,
                Constant.PermissionForView
            );
            if (h == false) {
                next("/Unauthorized");
            } else {
                next();
            }
        }
    },
    {
        path: "/CategorizedSMS",
        name: "CategorizedSMS",
        component: CategorizedSMS,

        beforeEnter: (to, from, next) => {
            var h = store.getters.getPermissionByMenuForView(
                Constant.PCodeFor_CATEGORIZED_SMS,
                Constant.PermissionForView
            );
            if (h == false) {
                next("/Unauthorized");
            } else {
                next();
            }
        }
    },
    {
        path: "/ManageCategory",
        name: "ManageCategory",
        component: ManageCategory,

        beforeEnter: (to, from, next) => {
            var h = store.getters.getPermissionByMenuForView(
                Constant.PCodeFor_MANAGE_CATEGORY,
                Constant.PermissionForView
            );
            var h1 = store.getters.getPermissionByMenuForView(
                Constant.PCodeFor_CATEGORY,
                Constant.PermissionForView
            );
            if (h == false && h1 == false) {
                next("/Unauthorized");
            } else {
                next();
            }
        }
    },
    {
        path: "/DataList",
        name: "DataList",
        component: DataList,

        beforeEnter: (to, from, next) => {
            var h = store.getters.getPermissionByMenuForView(
                Constant.PCodeFor_DATA,
                Constant.PermissionForView
            );
            var h1 = store.getters.getPermissionByMenuForView(
                Constant.PCodeFor_DATA_PORTAL,
                Constant.PermissionForView
            );
            if (h == false && h1 == false) {
                next("/Unauthorized");
            } else {
                next();
            }
        }
    },
    {
        path: "/DataEntry",
        name: "DataEntry",
        component: DataEntry,

        beforeEnter: (to, from, next) => {
            var h = store.getters.getPermissionByMenuForView(
                Constant.PCodeFor_DATA_ENTRY,
                Constant.PermissionForView
            );
            if (h == false) {
                next("/Unauthorized");
            } else {
                next();
            }
        }
    },
    {
        path: "/UploadBulkExcel",
        name: "UploadBulkExcel",
        component: UploadBulkExcel,

        beforeEnter: (to, from, next) => {
            var h = store.getters.getPermissionByMenuForView(
                Constant.PCodeFor_DATA_UPLOAD,
                Constant.PermissionForView
            );
            if (h == false) {
                next("/Unauthorized");
            } else {
                next();
            }
        }
    },
    {
        path: "/ManageValue",
        name: "ManageValue",
        component: ManageValue,

        beforeEnter: (to, from, next) => {
            var h = store.getters.getPermissionByMenuForView(
                Constant.PCodeFor_SERVICE_VIEW,
                Constant.PermissionForView
            );
            if (h == false) {
                next("/Unauthorized");
            } else {
                next();
            }
        }
    },
    {
        path: "/MinistryList",
        name: "MinistryList",
        component: MinistryList,

        beforeEnter: (to, from, next) => {
            var h = store.getters.getPermissionByMenuForView(
                Constant.PCodeFor_MINISTRY,
                Constant.PermissionForView
            );
            if (h == false) {
                next("/Unauthorized");
            } else {
                next();
            }
        }
    },
    {
        path: "/DepartmentList",
        name: "DepartmentList",
        component: DepartmentList,

        beforeEnter: (to, from, next) => {
            var h = store.getters.getPermissionByMenuForView(
                Constant.PCodeFor_DEPARTMENT,
                Constant.PermissionForView
            );
            if (h == false) {
                next("/Unauthorized");
            } else {
                next();
            }
        }
    },

    {
        path: "/ServiceList",
        name: "ServiceList",
        component: ServiceList,

        beforeEnter: (to, from, next) => {
            var h = store.getters.getPermissionByMenuForView(
                Constant.PCodeFor_SERVICES,
                Constant.PermissionForView
            );
            if (h == false) {
                next("/Unauthorized");
            } else {
                next();
            }
        }
    },
    {
        path: "/LocationList",
        name: "LocationList",
        component: LocationList,

        beforeEnter: (to, from, next) => {
            var h = store.getters.getPermissionByMenuForView(
                Constant.PCodeFor_LOCATION,
                Constant.PermissionForView
            );
            if (h == false) {
                next("/Unauthorized");
            } else {
                next();
            }
        }
    },
    {
        path: "/AnnouncementList",
        name: "AnnouncementList",
        component: AnnouncementList,

        beforeEnter: (to, from, next) => {
            var h = store.getters.getPermissionByMenuForView(
                Constant.PCodeFor_ANNOUNCEMENT,
                Constant.PermissionForView
            );
            if (h == false) {
                next("/Unauthorized");
            } else {
                next();
            }
        }
    },
    {
        path: "/FAQList",
        name: "FAQList",
        component: FAQList,

        beforeEnter: (to, from, next) => {
            var h = store.getters.getPermissionByMenuForView(
                Constant.PCodeFor_FAQ,
                Constant.PermissionForView
            );
            if (h == false) {
                next("/Unauthorized");
            } else {
                next();
            }
        }
    },
    {
        path: "/AccessLog",
        name: "AccessLog",
        component: AccessLog,

        beforeEnter: (to, from, next) => {
            var h = store.getters.getPermissionByMenuForView(
                Constant.PCodeFor_ACCESS_LOGS,
                Constant.PermissionForView
            );
            if (h == false) {
                next("/Unauthorized");
            } else {
                next();
            }
        }
    },
    {
        path: "/ChangePassword",
        name: "ChangePassword",
        component: ChangePassword,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;