import Toaster from "@/core/services/Toaster";
import { useAuthenticationStore } from "@/store/pinia_store/modules/AuthModule";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { AppConstants } from "@/core/constants/ApplicationsConstants";

import "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    authRequired: boolean;
    requiredPermission: number;
  }
}

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
        meta: {
          authRequired: true,
          requiredPermission: AppConstants.PERMISSIONS.None,
        },
        // component: () => import("@/views/Dashboard.vue"),
      },
      {
        path: "/dashboard/Main",
        name: "Main",
        component: () => import("@/views/dashboard/main/Main.vue"),
        meta: {
          authRequired: true,
          requiredPermission: AppConstants.PERMISSIONS.None,
        },
      },
      {
        path: "/dashboard/oldCities",
        name: "oldCities",
        component: () => import("@/views/dashboard/cities/Cities.vue"),
        meta: {
          authRequired: true,
          requiredPermission: AppConstants.PERMISSIONS.ReadCountries,
        },
      },
      {
        path: "/dashboard/Cities",
        name: "Cities",
        component: () => import("@/views/Cities/Cities.vue"),
        meta: {
          authRequired: true,
          requiredPermission: AppConstants.PERMISSIONS.ReadCountries,
        },
      },
      {
        path: "/dashboard/UsersManagement",
        name: "UsersManagement",
        meta: {
          authRequired: true,
          requiredPermission: AppConstants.PERMISSIONS.ReadUsers,
        },
        component: () => import("@/views/UsersManagement/UsersManagement.vue"),
      },
      {
        path: "/dashboard/RegularUsersManagement",
        name: "RegularUsersManagement",
        component: () =>
          import("@/views/UsersManagement/RegularUsersManagemen.vue"),
        meta: {
          authRequired: true,
          requiredPermission: AppConstants.PERMISSIONS.ReadUsers,
        },
      },
      {
        path: "/dashboard/FamilyMembers/:id",
        name: "FamilyMembers",
        component: () => import("@/views/UsersManagement/FamilyMembers.vue"),
        meta: {
          authRequired: true,
          requiredPermission: AppConstants.PERMISSIONS.ReadUsers,
        },
      },
      {
        path: "/dashboard/Grades",
        name: "Grades",
        component: () => import("@/views/Grades/Grades.vue"),
        meta: {
          authRequired: true,
          requiredPermission: AppConstants.PERMISSIONS.ReadGrades,
        },
      },
      {
        path: "/dashboard/Courses",
        name: "Courses",
        component: () => import("@/views/Courses/Courses.vue"),
        meta: {
          authRequired: true,
          requiredPermission: AppConstants.PERMISSIONS.ReadCourses,
        },
      },
      {
        path: "/dashboard/addCourse",
        name: "AddCourse",
        component: () => import("@/views/Courses/AddCoursePage.vue"),
        meta: {
          authRequired: true,
          requiredPermission: AppConstants.PERMISSIONS.ReadCourses,
        },
      },
      {
        path: "/dashboard/updateCourse/:id",
        name: "UpdateCourse",
        component: () => import("@/views/Courses/UpdateCoursePage.vue"),
        meta: {
          authRequired: true,
          requiredPermission: AppConstants.PERMISSIONS.ReadCourses,
        },
      },
      {
        path: "/dashboard/CourseSections/:id",
        name: "CourseSections",
        component: () => import("@/views/CourseSections/CourseSections.vue"),
        meta: {
          authRequired: true,
          requiredPermission: AppConstants.PERMISSIONS.ReadCourses,
        },
      },
      {
        path: "/dashboard/Lessons/:id",
        name: "CourseLessons",
        component: () => import("@/views/Lessons/Lessons.vue"),
        meta: {
          authRequired: true,
          requiredPermission: AppConstants.PERMISSIONS.ReadCourses,
        },
      },
      {
        path: "/dashboard/Subjects",
        name: "Subjects",
        component: () => import("@/views/Subjects/Subjects.vue"),
        meta: {
          authRequired: true,
          requiredPermission: AppConstants.PERMISSIONS.ReadSubjects,
        },
      },
      {
        path: "/dashboard/GradeSubjects/:id",
        name: "GradeSubjects",
        component: () => import("@/views/GradeSubjects/GradeSubjects.vue"),
        meta: {
          authRequired: true,
          requiredPermission: AppConstants.PERMISSIONS.ReadSubjects,
        },
      },
      {
        path: "/dashboard/PrepaidCards",
        name: "PrepaidCards",
        component: () => import("@/views/PrepaidCards/PrepaidCards.vue"),
        meta: {
          authRequired: true,
          requiredPermission: AppConstants.PERMISSIONS.ReadPrepaidCards,
        },
      },
      {
        path: "/dashboard/ExportPrepaidCards",
        name: "ExportPrepaidCards",
        component: () =>
          import("@/views/PrepaidCards/ExportPrepaidCardsPage.vue"),
        meta: {
          authRequired: true,
          requiredPermission: AppConstants.PERMISSIONS.ReadPrepaidCards,
        },
      },
      {
        path: "/dashboard/Invoices",
        name: "Invoices",
        component: () => import("@/views/Invoices/Invoices.vue"),
        meta: {
          authRequired: true,
          requiredPermission: AppConstants.PERMISSIONS.ReadPrepaidCards,
        },
      },
      {
        path: "/dashboard/Countries",
        name: "Countries",
        component: () => import("@/views/Countries/Countries.vue"),
        meta: {
          authRequired: true,
          requiredPermission: AppConstants.PERMISSIONS.ReadCountries,
        },
      },
      {
        path: "/dashboard/Localities",
        name: "Localities",
        component: () => import("@/views/Localities/Localities.vue"),
        meta: {
          authRequired: true,
          requiredPermission: AppConstants.PERMISSIONS.ReadCountries,
        },
      },
      {
        path: "/dashboard/bugReports",
        name: "bugReports",
        component: () => import("@/views/BugReport/BugReport.vue"),
        meta: {
          authRequired: true,
          requiredPermission: AppConstants.PERMISSIONS.ReadBugs,
        },
      },
      {
        path: "/dashboard/promotions",
        name: "promotions",
        component: () => import("@/views/Promotions/Promotions.vue"),
        meta: {
          authRequired: true,
          requiredPermission: AppConstants.PERMISSIONS.ReadBugs,
        },
      },

      {
        path: "/dashboard/faqs",
        name: "faqs",
        component: () => import("@/views/Faqs/Faqs.vue"),
        meta: {
          authRequired: true,
          requiredPermission: AppConstants.PERMISSIONS.ReadFaqs,
        },
      },
      {
        path: "/builder",
        name: "builder",
        component: () => import("@/views/Builder.vue"),
        meta: {
          authRequired: true,
          requiredPermission: AppConstants.PERMISSIONS.None,
        },
      },
      {
        path: "/crafted/modals/forms/new-target",
        name: "modals-forms-new-target",
        component: () => import("@/views/crafted/modals/forms/NewTarget.vue"),
        meta: {
          authRequired: true,
          requiredPermission: AppConstants.PERMISSIONS.None,
        },
      },
      {
        path: "/crafted/modals/forms/new-card",
        name: "modals-forms-new-card",
        component: () => import("@/views/crafted/modals/forms/NewCard.vue"),
        meta: {
          authRequired: true,
          requiredPermission: AppConstants.PERMISSIONS.None,
        },
      },
      {
        path: "/crafted/modals/forms/new-address",
        name: "modals-forms-new-address",
        component: () => import("@/views/crafted/modals/forms/NewAddress.vue"),
        meta: {
          authRequired: true,
          requiredPermission: AppConstants.PERMISSIONS.None,
        },
      },
      {
        path: "/crafted/modals/forms/create-api-key",
        name: "modals-forms-create-api-key",
        component: () =>
          import("@/views/crafted/modals/forms/CreateApiKey.vue"),
        meta: {
          authRequired: true,
          requiredPermission: AppConstants.PERMISSIONS.None,
        },
      },
      {
        path: "/dashboard/SystemSettings",
        name: "systemSettings",
        component: () => import("@/views/SystemSettings/SystemSettings.vue"),
        meta: {
          authRequired: true,
          requiredPermission: AppConstants.PERMISSIONS.ReadSystemSettings,
        },
      },
      {
        path: "/dashboard/TermsAndPrivacy",
        name: "TermsAndPrivacy",
        component: () => import("@/views/TermsAndPrivacy/TermsAndPrivacy.vue"),
        meta: {
          authRequired: true,
          requiredPermission: AppConstants.PERMISSIONS.ReadTermsAndPrivacy,
        },
      },
      {
        path: "/dashboard/Reports/PurchasedPackagesByUser",
        name: "PurchasedPackagesByUser",
        component: () => import("@/views/Reports/PurchasedPackagesByUser.vue"),
        meta: {
          authRequired: true,
          requiredPermission: AppConstants.PERMISSIONS.ReadTermsAndPrivacy,
        },
      },
      {
        path: "/dashboard/Reports/PurchasedPackagesBySpecificUser",
        name: "PurchasedPackagesBySpecificUser",
        component: () =>
          import("@/views/Reports/AllPurchasedPackagesBySpecifcUser.vue"),
        meta: {
          authRequired: true,
          requiredPermission: AppConstants.PERMISSIONS.ReadTermsAndPrivacy,
        },
      },
      {
        path: "/dashboard/Reports/PurchasedPackagesBySubject",
        name: "PurchasedPackagesBySubject",
        component: () =>
          import("@/views/Reports/PurchasedPackagesBySubject.vue"),
        meta: {
          authRequired: true,
          requiredPermission: AppConstants.PERMISSIONS.ReadTermsAndPrivacy,
        },
      },
      {
        path: "/dashboard/Reports/PurchasedPackagesWithCount",
        name: "PurchasedPackagesWithCount",
        component: () =>
          import("@/views/Reports/PurchasedPackagesWithCount.vue"),
        meta: {
          authRequired: true,
          requiredPermission: AppConstants.PERMISSIONS.ReadTermsAndPrivacy,
        },
      },
      {
        path: "/dashboard/Reports/PurchasedPackagesByGrade",
        name: "PurchasedPackagesByGrade",
        component: () => import("@/views/Reports/PurchasedPackagesByGrade.vue"),
        meta: {
          authRequired: true,
          requiredPermission: AppConstants.PERMISSIONS.ReadTermsAndPrivacy,
        },
      },
      {
          path: "/dashboard/Reports/PurchasedPackagesByPackage/:id/:packageType",
        name: "PurchasedPackagesByPackage",
        component: () =>
          import("@/views/Reports/PurchasedPackagesByPackage.vue"),
        meta: {
          authRequired: true,
          requiredPermission: AppConstants.PERMISSIONS.ReadTermsAndPrivacy,
        },
      },
      {
        path: "/dashboard/packages/addPackages",
        name: "AddPackages",
        component: () => import("@/views/Packages/AddPackage.vue"),
        meta: {
          authRequired: true,
          requiredPermission: AppConstants.PERMISSIONS.None,
        },
      },
      {
        path: "/dashboard/packages/updatePackages/:id",
        name: "UpdatePackages",
        component: () => import("@/views/Packages/UpdatePackage.vue"),
        meta: {
          authRequired: true,
          requiredPermission: AppConstants.PERMISSIONS.None,
        },
      },
      {
        path: "/dashboard/packages",
        name: "ViewPackages",
        component: () => import("@/views/Packages/Package.vue"),
        meta: {
          authRequired: true,
          requiredPermission: AppConstants.PERMISSIONS.None,
        },
      },
      {
        path: "/dashboard/packages/Subscriptions/:id",
        name: "Subscriptions",
        component: () => import("@/views/Packages/Subscriptions/Subscriptions.vue"),
        meta: {
          authRequired: true,
          requiredPermission: AppConstants.PERMISSIONS.None,
        },
      },
      {
        path: "/dashboard/packages/Subscriptions/AddSubscription/:id",
        name: "AddSubscription",
        component: () => import("@/views/Packages/Subscriptions/AddSubscriptionPage.vue"),
        meta: {
          authRequired: true,
          requiredPermission: AppConstants.PERMISSIONS.None,
        },
      },
      {
        path: "/dashboard/packages/Subscriptions/EditSubscriptions/:id",
        name: "EditSubscriptions",
        component: () => import("@/views/Packages/Subscriptions/EditSubscriptionPage.vue"),
        meta: {
          authRequired: true,
          requiredPermission: AppConstants.PERMISSIONS.None,
        },
      },
    ],
  },
  {
    path: "/sign-in",
    name: "sign-in",
    component: () => import("@/views/public/authentication/SignIn.vue"),
    meta: {
      authRequired: false,
      requiredPermission: AppConstants.PERMISSIONS.None,
    },
  },
  {
    path: "/reset-password",
    name: "reset-password",
    component: () => import("@/views/public/authentication/PasswordReset.vue"),
    meta: {
      authRequired: false,
      requiredPermission: AppConstants.PERMISSIONS.None,
    },
  },
  {
    path: "/otp",
    name: "otp",
    component: () => import("@/views/public/authentication/OtpPage.vue"),
    meta: {
      authRequired: false,
      requiredPermission: AppConstants.PERMISSIONS.None,
    },
  },
  {
    // the 404 route, when none of the above matches
    path: "/404",
    name: "404",
    component: () => import("@/views/public/Error/Error404.vue"),
    meta: {
      authRequired: true,
      requiredPermission: AppConstants.PERMISSIONS.None,
    },
  },
  {
    path: "/500",
    name: "500",
    component: () => import("@/views/public/Error/Error500.vue"),
    meta: {
      authRequired: true,
      requiredPermission: AppConstants.PERMISSIONS.None,
    },
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

router.beforeEach(async (to, from) => {
  const auth = useAuthenticationStore();

  if (!auth.isAuthenticated && to.meta.authRequired) {
    return router.push({ name: "sign-in" });
  }

  // no permission required
  if (to.meta.requiredPermission === AppConstants.PERMISSIONS.None) {
    return true;
  }

  const hasPermission = auth.hasPermission(
    to.meta.requiredPermission as number
  );

  if (!hasPermission) {
    Toaster.error("you do not have permission to access this page");
    router.push({ name: "dashboard" });
  }
});
export default router;
