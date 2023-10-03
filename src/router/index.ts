import store from "@/store";
import { Mutations, Actions } from "@/store/enums/StoreEnums";
import { useAuthenticationStore } from "@/store/pinia_store/modules/AuthModule";

import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/dashboard",
    redirect: "/dashboard/Main",
    component: () => import("@/layout/Layout.vue"),
    children: [
      {
        path: "/",
        name: "dashboard",
        redirect: "/dashboard/Main",
        // component: () => import("@/views/Dashboard.vue"),
      },
      {
        path: "/dashboard/Main",
        name: "Main",
        component: () => import("@/views/dashboard/main/Main.vue"),
      },
      {
        path: "/dashboard/oldCities",
        name: "oldCities",
        component: () => import("@/views/dashboard/cities/Cities.vue"),
      },
      {
        path: "/dashboard/Cities",
        name: "Cities",
        component: () => import("@/views/Cities/Cities.vue"),
      },
      {
        path: "/dashboard/UsersManagement",
        name: "UsersManagement",
        component: () => import("@/views/UsersManagement/UsersManagement.vue"),
      },
      {
        path: "/dashboard/RegularUsersManagement",
        name: "RegularUsersManagement",
        component: () =>
          import("@/views/UsersManagement/RegularUsersManagemen.vue"),
      },
      {
        path: "/dashboard/FamilyMembers/:id",
        name: "FamilyMembers",
        component: () => import("@/views/UsersManagement/FamilyMembers.vue"),
      },
      {
        path: "/dashboard/Grades",
        name: "Grades",
        component: () => import("@/views/Grades/Grades.vue"),
      },
      {
        path: "/dashboard/Subjects",
        name: "Subjects",
        component: () => import("@/views/Subjects/Subjects.vue"),
      },
      {
        path: "/dashboard/GradeSubjects/:id",
        name: "GradeSubjects",
        component: () => import("@/views/GradeSubjects/GradeSubjects.vue"),
      },

      {
        path: "/dashboard/Countries",
        name: "Countries",
        component: () => import("@/views/Countries/Countries.vue"),
      },
      {
        path: "/dashboard/Localities",
        name: "Localities",
        component: () => import("@/views/Localities/Localities.vue"),
      },
      {
        path: "/dashboard/bugReports",
        name: "bugReports",
        component: () => import("@/views/BugReport/BugReport.vue"),
      },
      {
        path: "/dashboard/faqs",
        name: "faqs",
        component: () => import("@/views/Faqs/Faqs.vue"),
      },
      {
        path: "/builder",
        name: "builder",
        component: () => import("@/views/Builder.vue"),
      },
      {
        path: "/crafted/modals/forms/new-target",
        name: "modals-forms-new-target",
        component: () => import("@/views/crafted/modals/forms/NewTarget.vue"),
      },
      {
        path: "/crafted/modals/forms/new-card",
        name: "modals-forms-new-card",
        component: () => import("@/views/crafted/modals/forms/NewCard.vue"),
      },
      {
        path: "/crafted/modals/forms/new-address",
        name: "modals-forms-new-address",
        component: () => import("@/views/crafted/modals/forms/NewAddress.vue"),
      },
      {
        path: "/crafted/modals/forms/create-api-key",
        name: "modals-forms-create-api-key",
        component: () =>
          import("@/views/crafted/modals/forms/CreateApiKey.vue"),
      },
      {
        path: "/dashboard/SystemSettings",
        name: "systemSettings",
        component: () => import("@/views/SystemSettings/SystemSettings.vue"),
      },
      {
        path: "/dashboard/TermsAndPrivacy",
        name: "TermsAndPrivacy",
        component: () => import("@/views/TermsAndPrivacy/TermsAndPrivacy.vue"),
      },
      {
        path: "/dashboard/Reports/MostPurchasedCourses",
        name: "MostPurchasedCoursesReport",
        component: () => import("@/views/Reports/MostPurchasedCourses.vue"),
      },
    ],
  },
  {
    path: "/sign-in",
    name: "sign-in",
    component: () => import("@/views/public/authentication/SignIn.vue"),
  },
  {
    // the 404 route, when none of the above matches
    path: "/404",
    name: "404",
    component: () => import("@/views/public/Error/Error404.vue"),
  },
  {
    path: "/500",
    name: "500",
    component: () => import("@/views/public/Error/Error500.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach(() => {
//   store.commit(Mutations.RESET_LAYOUT_CONFIG);

//   // store.dispatch(Actions.VERIFY_AUTH);
//   setTimeout(() => {
// window.scrollTo(0, 0);
// }, 100);
// });

// router.beforeEach(async (to, from, next) => {
//   const auth = useAuthenticationStore();
//   const { has } = useHasRole();

//   if (!auth.user.signedIn) {
//     if (auth.checkIsLoggedIn()) {

//       if (!has(to.meta.permission as number)) {
//         return next("/Forbidden");
//       }

//       // the user is logged in and trying to access the login page then redirect to dashboard
//       if (to.meta.guest) {
//         return next("/dashboard");
//       }

//       // continue to the route
//       document.getElementById("InitScreenDOM")?.remove();
//       return next();
//     }

//     // if the user is not logged in and the route is not guest only then redirect to login
//     if (to.meta.guest) {
//       return next();
//     }

//     return next("/");
//   }
//   // otherwise continue to the route
//   next();

//   // Scroll page to top on every route change
//   setTimeout(() => {
//     window.scrollTo(0, 0);
//   }, 100);
// });
export default router;
