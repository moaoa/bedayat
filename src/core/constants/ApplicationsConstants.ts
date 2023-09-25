export class AppConstants {
  static BASE_URL = import.meta.env.VITE_URL;
  static MANAGEMENT_URL = `${AppConstants.BASE_URL}/Management`;
  static COMMON = `${AppConstants.BASE_URL}/v1/Common`;
  static USERS_URL = `${AppConstants.COMMON}/UsersManagement`;
  static FAMILY_URL = `${AppConstants.COMMON}/Family`;
  static CITIES_URL = `${AppConstants.COMMON}/Cities`;
  static COUNTRIES_URL = `${AppConstants.COMMON}/Countries`;
  static FAQS_URL = `${AppConstants.COMMON}/Faqs`;
  static SYSTEMSETTINGS_URL = `${AppConstants.COMMON}/SystemSetting`;
  static COMMON_TERMS_AND_PRIVACY_URL = `${AppConstants.COMMON}/TermsAndPrivacy`;
  static COMMON_SUBSCRIPTION_URL = `${AppConstants.COMMON}/Subscription`;

  static FILTER_ADMIN_BY_OPTIONS = {
    ByPhoneNumber: 0,
    ByName: 1,
    ByType: 2,
  } as const;
  static FILTER_USER_BY_OPTIONS = {
    ALL: 0,
    Name: 1,
    PhoneNumber: 2,
    Email: 3,
  };
  static USER_ROLES = {
    None: 0,
    Admin: 1,
    Parent: 2,
    Child: 3,
    Teacher: 4,
    SchoolManager: 5,
  } as const;
  static PERMISSION_ACTIONS = {
    Add: 0,
    Remove: 1,
  } as const;
  static PERMISSIONS = {
    None: 0,
    Courses: 1,
    AddCourses: 2,
    ReadCourses: 3,
    UpdateCourses: 4,
    DeleteCourses: 5,
    ActivateDeactivateCourses: 6,
    Sections: 7,
    AddSections: 8,
    ReadSection: 9,
    UpdateSections: 10,
    DeleteSections: 11,
    Users: 12,
    AddUsers: 13,
    ReadUsers: 14,
    UpdateUsers: 15,
    DeleteUsers: 16,
    ActivateDeactivateUsers: 17,
    EditUserPermissions: 18,
    DeleteUserPermissions: 19,
    SubscriptionSettings: 20,
    AddSubscriptionSettings: 21,
    ReadSubscriptionSettings: 22,
    UpdateSubscriptionSettings: 23,
    DeleteSubscriptionSettings: 24,
    Subscriptions: 25,
    AddSubscriptions: 26,
    ReadSubscriptions: 27,
    UpdateSubscriptions: 28,
    DeleteSubscriptions: 29,
    Grades: 30,
    AddGrades: 31,
    ReadGrades: 32,
    UpdateGrades: 33,
    DeleteGrades: 34,
    Subjects: 35,
    AddSubjects: 36,
    ReadSubjects: 37,
    UpdateSubjects: 38,
    DeleteSubjects: 39,
    GradeSubjects: 40,
    AddGradeSubjects: 41,
    ReadGradeSubjects: 42,
    UpdateGradeSubjects: 43,
    DeleteGradeSubjects: 44,
    Countries: 45,
    AddCountries: 46,
    ReadCountries: 47,
    UpdateCountries: 48,
    DeleteCountries: 49,
    Faqs: 50,
    AddFaqs: 51,
    ReadFaqs: 52,
    UpdateFaqs: 53,
    DeleteFaqs: 54,
    Bugs: 55,
    AddBugs: 56,
    ReadBugs: 57,
    UpdateBugs: 58,
    DeleteBugs: 59,
    Notifications: 60,
    ReadNotifications: 61,
    SendNotifications: 62,
    SystemSettings: 63,
    AddSystemSettings: 64,
    ReadSystemSettings: 65,
    TermsAndPrivacy: 66,
    AddTermsAndPrivacy: 67,
    ReadTermsAndPrivacy: 68,
    UpdateTermsAndPrivacy: 69,
    DeleteTermsAndPrivacy: 70,
    PrepaidCards: 71,
    AddPrepaidCards: 72,
    ReadPrepaidCards: 73,
    DeletePrepaidCards: 74,
    ActivatePrepaidCards: 75,
    ExportInvoicePrepaidCards: 76,
    ExportPrepaidCards: 77,
  } as const;
  static USER_GENDER = {
    Male: 0,
    Female: 1,
  };
  static USER_STATE = {
    All: -1,
    InActive: 0,
    Active: 1,
  };
}
