import { AppConstants } from "@/core/constants/ApplicationsConstants";
const DocMenuConfig = [
  {
    pages: [
      {
        heading: "main",
        route: "/dashboard",
        svgIcon: "/media/icons/duotune/art/art002.svg",
        fontIcon: "bi-app-indicator",
      },
      {
        heading: "layoutBuilder",
        route: "/builder",
        svgIcon: "/media/icons/duotune/general/gen019.svg",
        fontIcon: "bi-layers",
      },
    ],
  },
  {
    heading: "other",
    route: "/reprots",
    pages: [
      {
        sectionTitle: "usersManagement",
        svgIcon: "/media/icons/duotune/general/gen019.svg",
        fontIcon: "bi-sticky",
        requiredPermission: AppConstants.PERMISSIONS.ReadUsers,
        sub: [
          {
            heading: "admins",
            route: "/dashboard/UsersManagement",
            svgIcon: "/media/icons/duotune/general/gen019.svg",
            fontIcon: "bi-layers",
            requiredPermission: AppConstants.PERMISSIONS.ReadUsers,
          },
          {
            heading: "users",
            route: "/dashboard/RegularUsersManagement",
            svgIcon: "/media/icons/duotune/general/gen019.svg",
            fontIcon: "bi-layers",
            requiredPermission: AppConstants.PERMISSIONS.ReadUsers,
          },
        ],
      },
      {
        sectionTitle: "grades",
        svgIcon: "/media/icons/duotune/general/gen019.svg",
        fontIcon: "bi-sticky",
        requiredPermission: AppConstants.PERMISSIONS.ReadGrades,
        sub: [
          {
            heading: "grades",
            route: "/dashboard/Grades",
            svgIcon: "/media/icons/duotune/general/gen019.svg",
            fontIcon: "bi-layers",
            requiredPermission: AppConstants.PERMISSIONS.ReadGrades,
          },
          {
            heading: "subjects",
            route: "/dashboard/Subjects",
            svgIcon: "/media/icons/duotune/general/gen019.svg",
            fontIcon: "bi-layers",
            requiredPermission: AppConstants.PERMISSIONS.ReadGrades,
          },
        ],
      },
      {
        // todo: need packages permission
        heading: "packages",
        route: "/dashboard/packages",
        svgIcon: "/media/icons/duotune/general/gen019.svg",
        fontIcon: "bi-layers",
        requiredPermission: AppConstants.PERMISSIONS.ReadTermsAndPrivacy,
      },
      {
        heading: "courses",
        route: "/dashboard/Courses",
        svgIcon: "/media/icons/duotune/general/gen019.svg",
        fontIcon: "bi-layers",
        requiredPermission: AppConstants.PERMISSIONS.ReadCourses,
      },
      {
        sectionTitle: "citiesAndCountries",
        svgIcon: "/media/icons/duotune/general/gen019.svg",
        fontIcon: "bi-sticky",
        requiredPermission: AppConstants.PERMISSIONS.ReadCountries,
        sub: [
          {
            heading: "countries",
            route: "/dashboard/Countries",
            svgIcon: "/media/icons/duotune/general/gen019.svg",
            fontIcon: "bi-layers",
            requiredPermission: AppConstants.PERMISSIONS.ReadCountries,
          },
          {
            heading: "cities",
            route: "/dashboard/Cities",
            svgIcon: "/media/icons/duotune/general/gen019.svg",
            fontIcon: "bi-layers",
            requiredPermission: AppConstants.PERMISSIONS.ReadCountries,
          },
          {
            heading: "localities",
            route: "/dashboard/localities",
            svgIcon: "/media/icons/duotune/general/gen019.svg",
            fontIcon: "bi-layers",
          },
        ],
      },
      {
        heading: "systemSettings",
        route: "/dashboard/systemSettings",
        svgIcon: "/media/icons/duotune/general/gen019.svg",
        fontIcon: "bi-layers",
        requiredPermission: AppConstants.PERMISSIONS.ReadSystemSettings,
      },
      {
        heading: "termsAndPrivacy",
        route: "/dashboard/termsAndPrivacy",
        svgIcon: "/media/icons/duotune/general/gen019.svg",
        fontIcon: "bi-layers",
        requiredPermission: AppConstants.PERMISSIONS.ReadTermsAndPrivacy,
      },
      {
        heading: "bugReports",
        route: "/dashboard/bugReports",
        svgIcon: "/media/svg/bug.svg",
        fontIcon: "bi-layers",
        requiredPermission: AppConstants.PERMISSIONS.ReadBugs,
      },
      {
        heading: "faqs",
        route: "/dashboard/faqs",
        svgIcon: "/media/svg/bug.svg",
        fontIcon: "bi-layers",
        requiredPermission: AppConstants.PERMISSIONS.ReadFaqs,
      },
      {
        sectionTitle: "cards",
        svgIcon: "/media/icons/duotune/general/gen019.svg",
        fontIcon: "bi-sticky",
        requiredPermission: AppConstants.PERMISSIONS.ReadPrepaidCards,
        sub: [
          {
            heading: "prepaidCards",
            route: "/dashboard/PrepaidCards",
            svgIcon: "/media/svg/bug.svg",
            fontIcon: "bi-layers",
            requiredPermission: AppConstants.PERMISSIONS.ReadPrepaidCards,
          },
          {
            heading: "invoices",
            route: "/dashboard/Invoices",
            svgIcon: "/media/svg/bug.svg",
            fontIcon: "bi-layers",
            requiredPermission: AppConstants.PERMISSIONS.ReadPrepaidCards,
          },
        ],
      },
      {
        sectionTitle: "packages",
        svgIcon: "/media/icons/duotune/general/gen019.svg",
        fontIcon: "bi-sticky",
        requiredPermission: AppConstants.PERMISSIONS.ReadFaqs,
        sub: [
          {
            heading: "packages",
            route: "/dashboard/packages",
            svgIcon: "/media/svg/bug.svg",
            fontIcon: "bi-layers",
            requiredPermission: AppConstants.PERMISSIONS.ReadTermsAndPrivacy,
          },
        ],
      },
      {
        // todo: need promotion permission
        heading: "promotions",
        route: "/dashboard/promotions",
        svgIcon: "/media/svg/bug.svg",
        fontIcon: "bi-layers",
        requiredPermission: AppConstants.PERMISSIONS.ReadFaqs,
      },
      // {
      //   sectionTitle: "packages",
      //   svgIcon: "/media/icons/duotune/general/gen019.svg",
      //   fontIcon: "bi-sticky",
      //   requiredPermission: AppConstants.PERMISSIONS.ReadFaqs,
      //   sub: [
      //     {
      //       heading: "packages",
      //       route: "/dashboard/packages",
      //       svgIcon: "/media/svg/bug.svg",
      //       fontIcon: "bi-layers",
      //       requiredPermission: AppConstants.PERMISSIONS.ReadTermsAndPrivacy,
      //     }
      //   ],
      // },
      {
        sectionTitle: "Reports",
        svgIcon: "/media/icons/duotune/general/gen019.svg",
        fontIcon: "bi-sticky",
        requiredPermission: AppConstants.PERMISSIONS.ReadFaqs,
        sub: [
          {
            heading: "MostPurchasedCourses",
            route: "/dashboard/Reports/MostPurchasedCourses",
            svgIcon: "/media/icons/duotune/general/gen019.svg",
            fontIcon: "bi-layers",
            requiredPermission: AppConstants.PERMISSIONS.ReadFaqs,
          },
          {
            heading: "purchasedPackagesByUser",
            route: "/dashboard/Reports/PurchasedPackagesByUser",
            svgIcon: "/media/icons/duotune/general/gen019.svg",
            fontIcon: "bi-layers",
            requiredPermission: AppConstants.PERMISSIONS.None,
          },
          {
            heading: "purchasedPackagesBySubject",
            route: "/dashboard/Reports/PurchasedPackagesBySubject",
            svgIcon: "/media/icons/duotune/general/gen019.svg",
            fontIcon: "bi-layers",
            requiredPermission: AppConstants.PERMISSIONS.None,
          },
          {
            heading: "PurchasedPackagesWithCount",
            route: "/dashboard/Reports/PurchasedPackagesWithCount",
            svgIcon: "/media/icons/duotune/general/gen019.svg",
            fontIcon: "bi-layers",
            requiredPermission: AppConstants.PERMISSIONS.None,
          },
        ],
      },
    ],
  },
  {
    heading: "craft",
    route: "/crafted",
    pages: [
      {
        sectionTitle: "pages",
        route: "/pages",
        svgIcon: "/media/icons/duotune/general/gen022.svg",
        fontIcon: "bi-archive",
        sub: [],
      },
      {
        sectionTitle: "authentication",
        svgIcon: "/media/icons/duotune/technology/teh004.svg",
        fontIcon: "bi-sticky",
        sub: [
          {
            sectionTitle: "basicFlow",
            requiredPermission: AppConstants.PERMISSIONS.None,
            sub: [
              {
                heading: "signIn",
                route: "/sign-in",
                requiredPermission: AppConstants.PERMISSIONS.None,
              },
              {
                heading: "signUp",
                route: "/sign-up",
                requiredPermission: AppConstants.PERMISSIONS.None,
              },
              {
                heading: "passwordReset",
                route: "/password-reset",
                requiredPermission: AppConstants.PERMISSIONS.None,
              },
            ],
          },
          {
            heading: "error404",
            route: "/404",
            requiredPermission: AppConstants.PERMISSIONS.None,
          },
          {
            heading: "error500",
            route: "/500",
            requiredPermission: AppConstants.PERMISSIONS.None,
          },
        ],
      },
      {
        sectionTitle: "modals",
        route: "/modals",
        svgIcon: "/media/icons/duotune/art/art009.svg",
        fontIcon: "bi-shield-check",
        requiredPermission: AppConstants.PERMISSIONS.None,
        sub: [
          {
            sectionTitle: "forms",
            route: "/forms",
            requiredPermission: AppConstants.PERMISSIONS.None,
            sub: [
              {
                heading: "newTarget",
                route: "/crafted/modals/forms/new-target",
                requiredPermission: AppConstants.PERMISSIONS.None,
              },
              {
                heading: "newCard",
                route: "/crafted/modals/forms/new-card",
                requiredPermission: AppConstants.PERMISSIONS.None,
              },
              {
                heading: "newAddress",
                route: "/crafted/modals/forms/new-address",
                requiredPermission: AppConstants.PERMISSIONS.None,
              },
              {
                heading: "createAPIKey",
                route: "/crafted/modals/forms/create-api-key",
                requiredPermission: AppConstants.PERMISSIONS.None,
              },
            ],
          },
        ],
      },
    ],
  },
];

export default DocMenuConfig;
