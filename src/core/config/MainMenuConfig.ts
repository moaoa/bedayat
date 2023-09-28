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
        sub: [
          {
            heading: "admins",
            route: "/dashboard/UsersManagement",
            svgIcon: "/media/icons/duotune/general/gen019.svg",
            fontIcon: "bi-layers",
          },
          {
            heading: "users",
            route: "/dashboard/RegularUsersManagement",
            svgIcon: "/media/icons/duotune/general/gen019.svg",
            fontIcon: "bi-layers",
          },
        ],
      },
      {
        sectionTitle: "grades",
        svgIcon: "/media/icons/duotune/general/gen019.svg",
        fontIcon: "bi-sticky",
        sub: [
          {
            heading: "grades",
            route: "/dashboard/Grades",
            svgIcon: "/media/icons/duotune/general/gen019.svg",
            fontIcon: "bi-layers",
          },
          {
            heading: "subjects",
            route: "/dashboard/Subjects",
            svgIcon: "/media/icons/duotune/general/gen019.svg",
            fontIcon: "bi-layers",
          },
        ],
      },
      {
        sectionTitle: "citiesAndCountries",
        svgIcon: "/media/icons/duotune/general/gen019.svg",
        fontIcon: "bi-sticky",
        sub: [
          {
            heading: "countries",
            route: "/dashboard/Countries",
            svgIcon: "/media/icons/duotune/general/gen019.svg",
            fontIcon: "bi-layers",
          },
          {
            heading: "cities",
            route: "/dashboard/Cities",
            svgIcon: "/media/icons/duotune/general/gen019.svg",
            fontIcon: "bi-layers",
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
      },
      {
        heading: "termsAndPrivacy",
        route: "/dashboard/termsAndPrivacy",
        svgIcon: "/media/icons/duotune/general/gen019.svg",
        fontIcon: "bi-layers",
      },
      {
        heading: "bugReports",
        route: "/dashboard/bugReports",
        svgIcon: "/media/svg/bug.svg",
        fontIcon: "bi-layers",
      },
      {
        heading: "faqs",
        route: "/dashboard/faqs",
        svgIcon: "/media/svg/bug.svg",
        fontIcon: "bi-layers",
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
            sub: [
              {
                heading: "signIn",
                route: "/sign-in",
              },
              {
                heading: "signUp",
                route: "/sign-up",
              },
              {
                heading: "passwordReset",
                route: "/password-reset",
              },
            ],
          },
          {
            heading: "error404",
            route: "/404",
          },
          {
            heading: "error500",
            route: "/500",
          },
        ],
      },
      {
        sectionTitle: "modals",
        route: "/modals",
        svgIcon: "/media/icons/duotune/art/art009.svg",
        fontIcon: "bi-shield-check",
        sub: [
          {
            sectionTitle: "forms",
            route: "/forms",
            sub: [
              {
                heading: "newTarget",
                route: "/crafted/modals/forms/new-target",
              },
              {
                heading: "newCard",
                route: "/crafted/modals/forms/new-card",
              },
              {
                heading: "newAddress",
                route: "/crafted/modals/forms/new-address",
              },
              {
                heading: "createAPIKey",
                route: "/crafted/modals/forms/create-api-key",
              },
            ],
          },
        ],
      },
    ],
  },
];

export default DocMenuConfig;
