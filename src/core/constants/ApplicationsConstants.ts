export class AppConstants {
  static BASE_URL = import.meta.env.VITE_URL;
  static MANAGEMENT_URL = `${AppConstants.BASE_URL}/v1/Management`;
  static PUBLIC_URL = `${AppConstants.BASE_URL}/v1/Public`;
  static COMMON = `${AppConstants.BASE_URL}/v1/Common`;
  static AUTH_URL = `${AppConstants.PUBLIC_URL}/Authentications`;

  static USERS_URL = `${AppConstants.MANAGEMENT_URL}/UsersManagement`;
  static FAMILY_URL = `${AppConstants.MANAGEMENT_URL}/Family`;

  static CITIES_URL = `${AppConstants.MANAGEMENT_URL}/Cities`;
  static LOCALITIES_URL = `${AppConstants.MANAGEMENT_URL}/Localities`;
  static COUNTRIES_URL = `${AppConstants.MANAGEMENT_URL}/Countries`;
  static FAQS_URL = `${AppConstants.MANAGEMENT_URL}/Faqs`;
  static GRADES_URL = `${AppConstants.MANAGEMENT_URL}/Grades`;

  static COURSES_URL = `${AppConstants.MANAGEMENT_URL}/Courses`;

  static Packages_URL = `${AppConstants.MANAGEMENT_URL}/Package`;

  static SECTIONS_URL = `${AppConstants.MANAGEMENT_URL}/Sections`;
  static lESSONS_URL = `${AppConstants.MANAGEMENT_URL}/Lessons`;


  static SUBJECTS_URL = `${AppConstants.MANAGEMENT_URL}/Subjects`;
  static GRADE_SUBJECTS_URL = `${AppConstants.MANAGEMENT_URL}/GradesSubjects`;

  static SYSTEMSETTINGS_URL = `${AppConstants.MANAGEMENT_URL}/SystemSetting`;
  static TERMS_AND_PRIVACY_URL = `${AppConstants.MANAGEMENT_URL}/TermsAndPrivacy`;

  static SUBSCRIPTION_URL = `${AppConstants.MANAGEMENT_URL}/Subscription`;
  static BUGS_REPORT_URL = `${AppConstants.MANAGEMENT_URL}/BugsReport`;

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
    AddCourses: 1,
    ReadCourses: 2,
    UpdateCourses: 3,
    DeleteCourses: 4,
    ActivateDeactivateCourses: 5,
    AddSections: 6,
    ReadSection: 7,
    UpdateSections: 8,
    DeleteSections: 9,
    AddUsers: 10,
    ReadUsers: 11,
    UpdateUsers: 12,
    DeleteUsers: 13,
    ActivateDeactivateUsers: 14,
    EditUserPermissions: 15,
    DeleteUserPermissions: 16,
    AddSubscriptionSettings: 17,
    ReadSubscriptionSettings: 18,
    UpdateSubscriptionSettings: 19,
    DeleteSubscriptionSettings: 20,
    AddSubscriptions: 21,
    ReadSubscriptions: 22,
    UpdateSubscriptions: 23,
    DeleteSubscriptions: 24,
    AddGrades: 25,
    ReadGrades: 26,
    UpdateGrades: 27,
    DeleteGrades: 28,
    AddSubjects: 29,
    ReadSubjects: 30,
    UpdateSubjects: 31,
    DeleteSubjects: 32,
    AddGradeSubjects: 33,
    ReadGradeSubjects: 34,
    UpdateGradeSubjects: 35,
    DeleteGradeSubjects: 36,
    AddCountries: 37,
    ReadCountries: 38,
    UpdateCountries: 39,
    DeleteCountries: 40,
    AddFaqs: 41,
    ReadFaqs: 42,
    UpdateFaqs: 43,
    DeleteFaqs: 44,
    AddBugs: 45,
    ReadBugs: 46,
    UpdateBugs: 47,
    DeleteBugs: 48,
    ReadNotifications: 49,
    SendNotifications: 50,
    AddSystemSettings: 51,
    ReadSystemSettings: 52,
    AddTermsAndPrivacy: 53,
    ReadTermsAndPrivacy: 54,
    UpdateTermsAndPrivacy: 55,
    DeleteTermsAndPrivacy: 56,
    AddPrepaidCards: 57,
    ReadPrepaidCards: 58,
    DeletePrepaidCards: 59,
    ActivatePrepaidCards: 60,
    ExportInvoicePrepaidCards: 61,
    ExportPrepaidCards: 62,
    ReadSecretCardNumber: 63,
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
  static LESSON_TYPES = {
    Lesson: 0,
    Preview: 1,
  };
  static LESSON_TYPES_AS_STRING = {
    Lesson: 0,
    Preview: 1,
  };
  static AttachmentTypes = {
    PreviewImage: 0,
    VideoLesson: 1,
    File: 2,
  };
  static GradeTypes = {
    Semester: 0,
    Yearly: 1,
  };
  static PackageTypes = {
    Course: 0,
    Package: 1,
  };
  static COURSE_STATUS = {
    InActive: 0,
    Active: 1,
  };
  static ATTATCHMENT_TYPES = {
    PreviewImage: 0,
    VideoLesson: 1,
    File: 2,
  };
}
