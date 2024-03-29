import { createI18n } from "vue-i18n";
import languageConfig from "@/core/config/LanguageDefaultConfig";

const messages = {
  en: {
    attachments: "Attachments",
    addNewLesson: "Add New Lesson",
    numberOfLessons: "Number Of Lessons",
    rating: "Rating",
    numberOfRatings: "Number Of Ratings",
    sections: "Sections",
    main: "Main",
    cities: "Faqs",
    countries: "Countries",
    localities: "Localities",
    remove: "Remove",
    delete: "Delete",
    citiesAndCountries: "Cities And Countries",
    other: "Other",
    pickUpCountry: "Pick Up Country",
    pickUpCity: "Pick Up City",
    pickUpLocality: "Pick Up Locality",
    arabicName: "Arabic Name",
    englishName: "English Name",
    save: "Save",
    cancel: "Cancel",
    pleaseWait: "Please Wait",
    addNewCity: "Add New City",
    deleteCity: "Delete City",
    addNewCountry: "Add New Country",
    addNewLocality: "Add New Locality",
    deleteLocality: "Deleting a locality",
    noNumber: "NO",
    hash: "#",
    at: "@",

    someFieldsNotFill: " Please make sure to fill in the required fields",

    deleteCancelation: "item was not deleted",
    deleteConfirmation: "item was deleted successfully",
    ok: "Ok",
    deleteMessage: "this item will be delete are you shure?",
    warning: "Warning",
    required: "required",
    stringLength: "value must contain between {min} and {max} letters",
    createCity: "Create City",
    country: "country",
    edit: "Edit",
    createdAt: "Created At",
    lastUpdated: "Last Updated",
    addCity: "Add City",
    updateCityDialogTitle: "Update City",
    bugReports: "bug Reports",
    faqs: "Faqs",
    faq: "The Faq",
    faqQuestion: "The Question",
    faqAnswer: "the Answer",
    confirmDelete: "Are You Sure To Delete {field} Data",

    englishQuestion: "The Question With English Language",
    englishAnswer: "The Answer With English Language",
    thisFieldIsRequired: "This Field Is Required",
    theFieldIsRequired: "the {0} Field Is Required",
    faqCategory: "Faq Category",
    addNewFaq: "Add New Faq",
    updateFaq: "Edit Faq",
    choseCategory: "Select Category",
    addFaq: "Add New Faq",
    question: "The Question",
    answer: "The Answer",
    login: "Login",
    general: "General",
    courses: "Courses",
    subscription: "Subscription",
    coinPrice: "Coin Price",
    dashboard: "Dashboard",
    layoutBuilder: "Layout builder",
    craft: "Crafted",
    pages: "Pages",
    profile: "Profile",
    profileOverview: "Overview",
    projects: "Projects",
    campaigns: "Campaigns",
    documents: "Documents",
    connections: "Connections",
    wizards: "Wizards",
    horizontal: "Horizontal",
    vertical: "Vertical",
    account: "Account",
    accountOverview: "Overview",
    settings: "Settings",
    authentication: "Authentication",
    basicFlow: "Basic Flow",
    signIn: "Sign in",
    signUp: "Sign-up",
    passwordReset: "Password Reset",
    error404: "Error 404",
    error500: "Error 500",
    apps: "Apps",
    chat: "Chat",
    privateChat: "Private Chat",
    groupChat: "Group Chat",
    drawerChat: "Drawer Chat",
    widgets: "Widgets",
    widgetsLists: "Lists",
    widgetsStatistics: "Statistics",
    widgetsCharts: "Charts",
    widgetsMixed: "Mixed",
    widgetsTables: "Tables",
    widgetsFeeds: "Feeds",
    changelog: "Changelog",
    docsAndComponents: "Docs & Components",
    megaMenu: "Teco Teco",
    exampleLink: "Example link",
    modals: "Modals",
    inviteFriends: "Invite Friends",
    viewUsers: "View Users",
    upgradePlan: "Upgrade Plan",
    shareAndEarn: "Share & Earn",
    forms: "Forms",
    newTarget: "New Target",
    newCard: "New Card",
    newAddress: "New Address",
    createAPIKey: "Create API Key",
    twoFactorAuth: "Two Factor Auth",
    createApp: "Create App",
    createAccount: "Create Account",
    documentation: "Documentation",
    components: "Components",
    pageHeader: "Resources",
    activity: "Activity",
    customers: "Customers",
    gettingStarted: "Getting Started",
    customersListing: "Customers Listing",
    customerDetails: "Customers Details",
    usersManagement: "Users Management",
    admins: "Admins",
    users: "Users",
    firstName: "First Name",
    fatherName: "Father Name",
    surName: "Sur Name",
    email: "Email",
    phoneNumber: "Phone Number",
    phone: "Phone Number",
    birthDate: "Birth Date",
    gender: "Gender",
    status: "Status",
    searchByName: "Search By Name",
    searchByPhoneNumber: "Search By Phone Number",
    all: "All",
    search: "Search",
    addNewUser: "Add New User",
    addUser: "Add User",
    name: "Name",
    phoneMustBe10Digits: "Phone Must Be 10 Digits",
    password: "Password",
    passwordConfirmation: "Password Confirmation",
    permissions: "Permissions",
    otherPhone: "Other Phone",
    updateUserData: "Update User Data",
    family: "Family",
    active: "Active",
    inactive: "Inactive",
    children: "Children",
    parents: "Parents",
    actions: "Actions",
    notifyUser: "Sent Notification To User",
    text: "Text",
    startOfYearDate: "Beginning of year date ",
    endOfYearDate: "Beginning of year date ",
    period: "Period",
    createdDate: "created Date",
    updatedDate: "updated Date",
    subscriptionSettings: "subscription Settings",
    generalSettings: "general Settings",
    numberOfDays: "number Of Days",
    discard: "Discard",
    arabic: "Arabic",
    english: "English",
    addPrivacy: "Add Privacy",
    addTerms: "Add Terms",
    termsAndConditions: "Terms And Conditions",
    privacy: "Privacy",
    termsAndPrivacy: "Terms And Privacy",
    systemSettings: "SystemSettings",
    notify: "Notify",
    addNewGrade: "Add New Grade",
    grades: "Grades",
    subjects: "Subjects",
    addNewSubject: "Add New Subject",

    submit: "Submit",
    addSubscriptionSettings: "Add Subscription Settings",
    areYouSure: "Are you Sure?",
    logout: "Logout",
    Technical: "Technical",
    Admin: "Admin",
    Financial: "Financial",
    Support: "Support",
    Pending: "Pending",
    Solved: "Solved",
    All: "All",
    title: "title",
    description: "description",
    bugResponse: "bugResponse",
    bugReport: "bugReport",
    department: "department",
    book: "book",
    logo: "logo",
    deleteSubject: "deleting a subject",
    deleteGrade: "deleteGrade",
    deleteGradeSubject: "deleteGradeSubject",
    scientific: "Scientific",
    none: "none",
    literary: "Literary",
    state: "state",
    subjectType: "Subject Type",
    uploadLogo: "upload Logo",
    nameMustBeEnglish: "name Must Be English",
    nameMustBeArabic: "name Must Be Arabic",
    Packages: "Packages",
    selectCourses: "selectCourses",
    coursesCount: "coursesCount",
    deletePackage: "deletePackage",
    addPackage: "addPackage",
    courseName: "courseName",
    subjectName: "subjectName",
    courseLogo: "courseLogo",
    path: "path",
    course: "course",
    packageType: "packageType",
    packageStatus: "packageStatus",
    image: "image",
    information: "Promotion information",
    englishTitle: "English Title",
    englishDescription: "English Description",
    grade: "Grade",
    gradeSubject: "Subject",
    author: "Author",
    chooseFile: "Choose File",
    noFiles: "No Files Selected",
    addCourse: "Add Course",
    minPrice: "Min Price",
    maxPrice: "Max Price",
    minNumberOfLessons: "Min Number Of Lessons",
    maxNumberOfLessons: "Max Number Of Lessons",
    filteredInList: "Filtered In List?",
    lessons: "Lessons",
    gradeTypeIndex: "Grade Order",
    forPreview: "For Preview",
    semester: "Semester",
    yearly: "Yearly",
    gradeType: "gradeType",
    priority: "priority",
    subjectsEnglish: "subjectsEnglish",
    gradesEnglish: "gradesEnglish",
    addNewGradeSubject: "addNewGradeSubject",
    gradeSubjects: "gradeSubjects",
    chooseSubject: "chooseSubject",
    updateGradeSubject: "updateGradeSubject",
    deleteGeneralSubscriptionPeriod: "deleteGeneralSubscriptionPeriod",
    addnewGeneralSubscriptionDate: "addNewGeneralSubscriptionDate",
    firstSection: "First Section",
    secondSection: "Second Section",
    thirdSection: "Third Section",
    addNewSection: "Add New Section",
    previewImage: "Preview Image",
    lessonVideo: "Lesson Video",
    additionalContent: "Additional Content",
    attachmentRemovedSuccessfully: "Attachment Removed Successfully",

    serialNumber: "Serial Number",
    number: "Number",
    addPrepaidCard: "Add Prepaid Card",
    prepaidCards: "Prepaid Cards",
    coinAmount: "Coins Amount",
    sellingPrice: "Selling Price",
    consumed: "Consumed",
    thirdParty: "Third Party",
    addInvoice: "Add Invoice",
    exportAs: "Export As",
    exportPrepaidCards: "Export Prepaid Cards",
    details: "Details",
    categories: "Categories",
    count: "Number Of Cards",
    cards: "Cards",
    consumedType: "Consumed By",
    consumedByThirdParty: "Consumed By Third Party",
    consumedByUser: "Consumed By User",
    notConsumed: "Not Consumed",
    exportInvoices: "Export Invoices",
    total: "Total",
    numberOfItems: "Number Of Items",
    numberOfCategories: "Number Of Categories",
    isPaid: "Paid",
    paidAt: "Paid At",
    export: "Export",
    createdNewItem: "Created New Item",
    success: "the operation was done successfully",
    paid: "Paid",
    notPaid: "Not Paid",
    packages: "packages",
    updateLocality: "Update Locality",
    addLocality: "Add Locality",
    updateGeneralSubscriptionPeriod: "Update General Subscription Period",
    noDataToDisplay: "No Data To Display",
    deleteFaq: "delete FAQ",
    addPromotion: "Add Promotions",
    updatePromotion: "Add Promotions",
    deletePromotion: "Add Promotions",

    userName: "User Name",
    price: "Price",
    numberOfPurchases: "Number Of Purchases",
    sumOfPrice: "Sum Of Price",
    totalPurchases: "Total Purchases",
    purchasedAt: "Purchased At",
    reports: "Reports",
    fromDate: "From Date",
    toDate: "To Date",
    checkExpiryDate: "Check Expiry Date",
    purchasedPackagesByUser: "User Purchases",
    searchForUserWithPhoneEmail: "Search For User With Phone Or Email",
    user: "User",
    promotions: "Promotions",

    gradeName: "Grade Name",
    purchasedPackagesWithCount: "Purchased Packages With Count",
    orderByMostPurchased: "Order By Most Purchased",
    totalOfPurchased: "Total Of Purchased",
    purchasedPackagesByGrade: "Purchased Packages By Grade",
    purchasedPackagesBySubject: "Subject Purchases",
    package: "Package",
    subject: "Subject",
    purchasedPackagesBySpecificUser: "Purchased Packages By Specific User",
    deleteCountry: "Delete Country",
    chooseGrade: "chooseGrade",
    lessonContent: "Lesson Content",
    additinoalContent: "Additinoal Content",
    attachmentAddedSuccessfully: "Attachment Added Successfully",
    purchases: "Purchases",
    subscriptions: "Subscriptions",
    englishDetails: "English Details",
    subTitle: "SubTitle",
    englishSubTitle: "English SubTitle",
    discount: "Discount (%)",
    addNewSubscription: "Add New Subscription",
    editSubscription: "Edit Subscription",
    deleteSubscription: "Delete Subscription",
    contentManagement: "Content Management",
    gradesManagement: "Grades Management",

    cardsManagement: "Prepaid Cards Management",
    addSubscription: "Add Subscription",
    notifications: "Notifications",
    sendNotification: "Send Notification",
    notificationsManagement: "Notifications Management",
    notificationWasSentSuccessfully: "Notification Was Sent Successfully",
    admin: "Admin",
    parent: "Parent",
    child: "Child",
    schoolManager: "School Manager",
    CountriesAndCities: "Countries And Cities",
    selectUserFirst: "Please select a user first",
    userRole: "User Role",
    city: "City",
    locality: "Locality",
    countriesAndCities: "Countries And Cities",
    notificationType: "Notification Type",
    notificationFor: "Notification For",
    wallet: "Wallet",
    critical: "Critical",
    default: "Default",
    error: "Error",
    promotional: "Promotional",
    userGuide: "User Guide",
    level: "Level",
    allParents: "All Parents",
    allChildren: "All Children",
    teachers: "Teachres",
    file: "File",
    welcomeToHomeScreen: "Welcome To Home Screen",
    mainPage: "Main Page",
    noFileToShow: "No file to show",
    fileType: "File Type",
    attachmentFor: "Attachment For",
    resolution: "Resolution",
    updateSubject: "Update Subject",
    updateCountry: "Update Country",
    updateCourseSection: "Update Course Section",
    deleteCourse: "Delete Course",
    updateLesson: "Update Lesson",
    deleteLesson: "Delete Lesson",
    pdf: "PDF",
    sound: "Sound",
    video: "Video",
    word: "Word",
    signOut: "Sign Out",
    closedIssue: "Closed",
    pending: "Pending",
    respondToBugDialogTitle: "Respond To Bug Report",
    attachedBugImages: "Attached Images",
    response: "Response",
    cityName: "City Name",
    cityEnglishName: "City Name",

    addNewCourseSection: "Add New Section",
    addNewPrepaidCard: "Add new prepaid card",
    updatedSuccessfully: "updated Successfully",
    noAttachment: "No Attachments",

    monthlyPackagePrice: "Monthly Package Price",
    filterByExpiryDate: "Filter By Expiry Date",
    currentlyActiveCourses: "Currently Active Courses",

    home: "Home",
    avatar: "Avatar",
    addAvatar: "Add Avatar",
  },
  //////////////////////////////////////////////////////////////////////////
  ar: {
    home: "الرئيسية",
    currentlyActiveCourses: "الدورات المفعلة حاليا",
    filterByExpiryDate: "تصفية حسب تاريخ الانتهاء",
    monthlyPackagePrice: "سعر الحزمة الشهرية",
    noAttachment: "لا يوجد مرفقات",
    cityName: "اسم المدينة",
    cityEnglishName: "اسم المدينة بالإنجليزي",
    response: "الرد",
    attachedBugImages: "الصور المرفقة",

    respondToBugDialogTitle: "الرد على الشكوى",
    pending: "قيد الانتظار",
    closedIssue: "تم الحل",
    signOut: "تسجيل الخروج",
    pdf: "بي دي اف",
    sound: "صوت",
    video: "فيديو",
    word: "ملف وورد",
    deleteLesson: "حذف درس",
    updateLesson: "تعديل درس",
    deleteCourse: "حذف دورة",
    updateCourseSection: "تعديل قسم الدورة",
    updateSubject: "تعديل مادة",
    updateCountry: "تعديل بلد",
    purchases: "تاريخ الشراء",
    deleteCountry: "حذف بلد",
    gradesManagement: "إدارة الفصول و المواد",
    addSubscription: "إضافة إشتراك",

    contentManagement: "إدارة المحتوى",
    subscriptions: "الإشتراكات",
    englishDetails: "التفاصيل بالإنجليزي",
    subTitle: "عنوان فرعي",
    englishSubTitle: "عنوان فرعي بلإنجليزي",
    discount: "الخصم (%)",
    addNewSubscription: "إضافة اشتراك",
    editSubscription: "تعديل إشتراك",
    deleteSubscription: "حذف إشتراك",

    chooseGrade: "إختر الصف",
    purchasedPackagesByGrade: "المبيعات بناء على الصف",
    totalOfPurchased: "إجمالي البيع",
    gradeName: "السنة الدراسية",
    price: "السعر",
    numberOfPurchases: "عدد مرات البيع",
    sumOfPrice: "إجمالي البيع",
    purchasedPackagesWithCount: "تقرير البيع و العدد",
    fromDate: "من ",
    toDate: "إلى",
    orderByMostPurchased: "رتب بالأعلى مبيعا",

    promotions: "إدارة الدعايات",
    addPromotion: "إضافه دعاية",
    updatePromotion: "حذف الدعاية",
    deletePromotion: "تعديل الدعاية",
    image: "الصورة",
    information: "معلومات الدعاية",
    deleteFaq: "حذف سؤال",
    noDataToDisplay: "لا توجد بيانات",
    updateLocality: "تعديل بيانات الحي",
    addLocality: "إضافة حي",
    updateGeneralSubscriptionPeriod: "تعديل المده",
    packageStatus: "الحاله",
    packageType: "نوع الحزمه",
    path: "حزم",
    course: "دوره",
    courseLogo: "شعار الدوره",
    selectCourses: "اضف دورات",
    addPackage: "اضافه حزمه",
    courseName: "اسم الدوره",
    subjectName: "اسم الماده",
    deletePackage: "حذف حزمه",
    uploadLogo: "حمل الشعار",
    nameMustBeEnglish: "الاسم يجب ان يكون بالانجبيزي",
    nameMustBeArabic: "الاسم يجب ان يكون بالعربي",
    Packages: "الحزم",
    coursesCount: "عدد الدورات",
    addnewGeneralSubscriptionDate: "إضافه مده",
    deleteGeneralSubscriptionPeriod: "حذف هذه المده",
    updateGradeSubject: "تعديل",
    chooseSubject: "اختر ماده",
    gradeSubjects: "المواد لسنه معينه",
    addNewGradeSubject: "اضافه ماده جديده",
    subjectsEnglish: "المواد بالإنجليزي",
    gradesEnglish: "السنه بالإنجليزي",
    yearly: "سنوي",
    gradeType: "نظام السنة",
    priority: "الترتيب",
    semester: "سيميستر",
    state: "الحاله",
    forPreview: "للمعاينة",
    gradeTypeIndex: "ترتيب الصف",
    lessons: "الدروس",
    addNewLesson: "إضافة درس جديد",
    numberOfLessons: "عدد الدروس",
    attachments: "المرفقات",
    addSubscriptionSettings: "إضافة جديدة",
    sections: "الأقسام",
    submit: "تأكيد",
    scientific: "علمي",
    literary: "أدبي",
    subjectType: "نوع المادة",
    none: "غير مصنف",
    deleteGrade: "حذف سنه دراسية",
    deleteGradeSubject: "حذف مادة معينة",
    deleteSubject: "حذف ماده",
    book: "الكتاب",
    logo: "الشعار",
    bugReport: "تقارير المشاكل",
    Pending: "قيد المراجعة",
    Solved: "تم الحل",
    All: "الكل",
    title: "العنوان",
    description: "الوصف",
    bugResponse: "الرد ",
    department: "القسم المعني",
    Technical: "القسم التقني",
    Admin: "مدير النظام",
    Financial: "القسم المالي",
    Support: "الدعم الفني",
    systemSettings: "إعدادات النظام",
    areYouSure: "هل انت متأكد ؟",
    deleteLocality: "حذف حي",
    termsAndPrivacy: "الشروط العامة و الخصوصية",
    termsAndConditions: "الشروط العامة ",
    privacy: "الخصوصيه",
    addPrivacy: "إضافة شروط الخصوصيه",
    addTerms: "إضافة الشروط العامة",
    english: "الإنجليزية",
    arabic: "العربية",
    discard: "إلغاء",
    numberOfDays: "عدد الايام",
    period: "المدة",
    periodInDays: "المدة (أيام)",
    createdDate: "تاريخ الإضافة",
    updatedDate: "تاريخ التعديل",
    subscriptionSettings: "إعدادات الباقات",
    generalSettings: "الإعدادات العامة",
    main: "الرئيسية",
    cities: "المدن",
    countries: "البلدان",
    localities: "الأحياء",
    remove: "حذف",
    delete: "حذف",
    other: "أخرى",
    pickUpCountry: "أختر البلد",
    pickUpCity: "أختر المدينة",
    pickUpLocality: "أختر الحي",
    arabicName: "الإسم العربي",
    englishName: "الإسم الأنجليزي",
    pleaseWait: "الرجاء الأنتظار",
    addNewCity: "أضافة مدينة جديدة",
    deleteCity: "حذف بيانات مدينة",
    someFieldsNotFill: " الرجاء التأكد من تعبئة الحقول المطلوبة",
    faq: "السوال",
    addNewCountry: "أضافة بلد جديد",
    addNewLocality: "أضافة حي جديد",
    noNumber: "الترتيب",
    hash: "#",
    at: "@",
    citiesAndCountries: "البلدان و المدن",
    deleteCancelation: "تم الغاء عملية الحذف",
    deleteConfirmation: "تم مسح العنصر بنجاح",
    ok: "موافق",
    deleteMessage: "سيتم حذف هذا العنصر هل أنت متأكد؟",
    warning: "تحذير",
    required: "مطلوب",
    stringLength: "يجب أن يكون طول القيمة بين {min} و {max} أحرف ",
    createCity: "إانشاء مدينة",
    cancel: "الغاء",
    save: "حفظ",
    country: "البلد",
    edit: "تعديل",
    createdAt: "تاريخ الإنشاء",
    lastUpdated: "أخر تعديل",
    addCity: "اضف مدينة",
    updateCityDialogTitle: "تعديل المدينة",
    bugReports: "أراء و شكاوي المستخدمين",
    faqs: "الأسئلة الشائعة",
    faqQuestion: "السؤال",
    faqAnswer: "الجواب",
    faqCategory: "تصنيف",
    addNewFaq: "أضافة سؤال شائع جديد",
    updateFaq: "تعديل بيانات سؤال شائع",
    choseCategory: "أختر التصنيف",
    addFaq: "أضافة سؤال شائع",
    question: "السؤال",
    answer: "الأجابة",
    englishQuestion: "السؤال باللغة الأنجليزية",
    englishAnswer: "الأجابة باللغة الأنجليزية",
    thisFieldIsRequired: "الحقل مطلوب",
    theFieldIsRequired: "حقل {field} مطلوب ",
    login: "تسجيل الدخول",
    general: "عام",
    courses: "الدورات",
    subscription: "أشتراكات",
    confirmDelete: "هل أنت متأكد من حذف بيانات {field}",
    dashboard: "Générateur de mise",
    layoutBuilder: "التخطيط",
    session: "الجلسة",
    pages: "Pages",
    profile: "Profil",
    profileOverview: "Aperçu",
    projects: "Projets",
    campaigns: "Campagnes",
    documents: "Documents",
    connections: "Connexions",
    wizards: "Sorciers",
    horizontal: "Horizontal",
    vertical: "Verticale",
    account: "حساب",
    accountOverview: "Aperçu",
    settings: "Paramètres",
    authentication: "Authentification",
    basicFlow: "Flux de base",
    signUp: "Inscrivez-vous",
    passwordReset: "Réinitialisation du mot de passe",
    error404: "Erreur 404",
    error500: "Erreur 500",
    apps: "Applications",
    chat: "Discuter",
    privateChat: "Discussion privée",
    groupChat: "Discussion de groupe",
    drawerChat: "Chat de tiroir",
    widgets: "Widgets",
    widgetsLists: "Listes",
    widgetsStatistics: "Statistiques",
    widgetsCharts: "Graphiques",
    widgetsMixed: "Mixte",
    widgetsTables: "Les tables",
    widgetsFeeds: "Flux",
    changelog: "Journal des modifications",
    docsAndComponents: "Documents & composants",
    megaMenu: "تيكو تيكو",
    exampleLink: "Exemple de lien",
    modals: "Modals",
    inviteFriends: "Inviter Des Amis",
    viewUsers: "Voir Les Utilisateurs",
    upgradePlan: "Plan De Mise À Niveau",
    shareAndEarn: "Partager Et Gagner",
    forms: "Formes",
    newTarget: "Nouvelle Cible",
    newCard: "Nouvelle Carte",
    newAddress: "Nouvelle Adresse",
    createAPIKey: "Créer Une Touche Api",
    twoFactorAuth: "Deux Facteurs D'Authentification",
    createApp: "Créer Une Application",
    createAccount: "Créer Un Compte",
    activity: "Activité",
    documentation: "Documentation",
    components: "Composants",
    pageHeader: "الموارد",
    customers: "Les Clients",
    gettingStarted: "Commencer",
    customersListing: "Liste Des Clients",
    customerDetails: "Détails Des Clients",
    usersManagement: "إدارة المستخدمين",
    admins: "مدير النظام",
    users: "المستخدمين",
    firstName: "الأسم",
    fatherName: "اسم الأب",
    surName: "اللقب",
    email: "البريد الإلكتروني",
    phoneNumber: "رقم الهاتف",
    phone: "رقم الهاتف",
    birthDate: "تاريخ الميلاد",
    gender: "الجنس",
    signIn: "تسجيل الدخول",
    status: "الحالة",
    teacher: "الاستاذ",
    address: "العنوان",
    searchByName: "البحث بالإسم",
    searchByPhoneNumber: "البحث برقم الهاتف",
    all: "الكل",
    search: "بحث",
    addNewUser: "إضافة مستخدم جديد",
    addUser: "إضافة مستخدم",
    name: "الأسم",
    phoneMustBe10Digits: "رقم الهاتف يجب أن يكون 10 أرقام",
    password: "كلمة المرور",
    passwordConfirmation: "تأكيد كلمة المرور",
    permissions: "الصلاحيات",
    otherPhone: "هاتف آخر",
    updateUserData: "تعديل بيانات المستخدم",
    family: "العائلة",
    active: "فعال",
    inactive: "غير فعال",
    children: "الأبناء",
    parents: "الأباء",
    actions: "العمليات",
    notifyUser: "ارسل إشعار للمستخدم",
    text: "النص",
    coinPrice: "سعر العملة",
    startOfYearDate: "تاريخ بداية السنة الدراسية",
    endOfYearDate: "تاريخ نهاية السنة الدراسية",
    notify: "إشعار",
    addNewGrade: "إضافة صف جديد",
    grades: "السنوات الدراسية",
    subjects: "المواد",
    addNewSubject: "إضافة مادة جديدة",
    logout: "تسجيل الخروج",
    englishTitle: "العنوان الإنجليزي",
    englishDescription: "الوصف الإنجليزي",
    grade: "السنة الدراسية",
    gradeSubject: "المادة الدراسية",
    author: "الكاتب",
    chooseFile: "إختر ملف",
    noFiles: "لم يتم إختيار اي ملف",
    addCourse: "إضافة كورس جديد",
    minPrice: "السعر الأدنى",
    maxPrice: "السعر الأعلى",
    minNumberOfLessons: "الحد الأدنى لعدد الدروس",
    maxNumberOfLessons: "الحد الأعلى لعدد الدروس",
    rating: "التقييم",
    numberOfRatings: "عدد التقييمات",
    filteredInList: "تم تصفية النتائج في القائمة",

    firstSection: "القسم الأول",
    secondSection: "القسم الثاني",
    thirdSection: "القسم الثالث",
    addNewSection: "إضافة قسم جديد",
    previewImage: "صورة المعاينة",
    lessonVideo: "فيديو الدرس",
    additionalContent: "محتوى إضافي",
    attachmentRemovedSuccessfully: "تم حذف المرفق بنجاح",
    serialNumber: "الرقم التسلسلي",
    number: "الرقم",
    addPrepaidCard: "إضافة بطاقة شحن ",
    prepaidCards: "البطاقات المسبقة الدفع",
    coinAmount: "قيمة العملة",
    sellingPrice: "سعر البيع",
    consumed: "مستهلك",
    thirdParty: "طرف ثالث",
    addInvoice: "إضافة فاتورة",
    exportAs: "تصدير كـ",
    exportPrepaidCards: "تصدير بطاقات",
    details: "التفاصيل",
    categories: "الأصناف",
    invoices: "الفواتير",
    count: "عدد الكروت",
    cardsManagement: "إدارة كروت الدفع المسبق",
    cards: "الكروت",
    consumedType: "مستهلك بواسطة",
    consumedByThirdParty: "مستهلك بواسطة طرف ثالث",
    consumedByUser: "مستهلك بواسطة المستخدم",
    notConsumed: "غير مستهلك",
    exportInvoices: "تصدير الفواتير",
    total: "الإجمالي",
    numberOfItems: "عدد العناصر",
    numberOfCategories: "عدد الأصناف",
    isPaid: "مدفوعة",
    paidAt: "تاريخ الدفع",
    export: "تصدير",
    createdNewItem: "تم إنشاء عنصر جديد بنجاح",
    createdSuccessfully: "تمت العملية بنجاح",
    updatedSuccessfully: "تم تحديث البيانات بنجاح",
    deletedSuccessfully: "تم الحذف بنجاح",
    success: "تمت العملية بنجاح",
    paid: "مدفوع",
    notPaid: "غير مدفوع",

    packages: "حزم",
    userName: "إسم المستخدم",
    totalPurchases: "مجموع المشتريات",
    purchasedAt: "تاريخ الشراء",
    reports: "التقارير",
    checkExpiryDate: "تاريخ الإنتهاء",
    purchasedPackagesByUser: "الحزم المشتراة من قبل المستخدم",
    searchForUserWithPhoneEmail: "البحث عن طريق الهاتف او الايميل",
    user: "المستخدم",
    purchasedPackagesBySubject: "مبيعات المواد",
    package: "حزمة",
    subject: "المادة",
    purchasedPackagesBySpecificUser: "مشتريات مستخدم محدد",
    lessonContent: "محتوي الدرس",
    additinoalContent: "محتوي إضافي",
    attachmentAddedSuccessfully: "تم إضافة المرفق بنجاح",
    notifications: "الإشعارات",
    sendNotification: "إرسال إشعار",
    notificationsManagement: "إدارة الإشعارات",
    notificationWasSentSuccessfully: "تم إرسال الإشعار بنجاح",
    admin: "مدير النظام",
    parent: "أب",
    child: "طفل",
    schoolManager: "مدير المدرسة",
    CountriesAndCities: "بلدان ومدن",
    selectUserFirst: "قم بإختيار المستخدم أولا",
    userRole: "نوع المستخدم",
    city: "المدينة",
    locality: "المنطقة",
    countriesAndCities: "البلدان و المدن",
    notificationType: "نوع الإشعار",
    notificationFor: "الإشعار لـ",
    wallet: "المحفظة",
    critical: "حرج",
    default: "إفتراضي",
    error: "خطأ",
    promotional: "ترويجي",
    userGuide: "دليل المستخدم",
    level: "المستوى",
    allParents: "كل الأباء",
    allChildren: "كل الابناء",
    teachers: "الأساتذة",
    file: "الملف",
    welcomeToHomeScreen: "مرحبا بك في الشاشة الرئيسية",
    mainPage: "الصفحة الرئيسية",
    noFileToShow: "لا يوجد ملفات لعرضها",
    fileType: "نوع الملف",
    attachmentFor: "المرفق لـ",
    resolution: "الدقة",
    addNewCourseSection: "إضافة قسم جديد",
    addNewPrepaidCard: "إضافة بطاقة شحن جديدة",
    avatar: "صورة المستخدم",
    addAvatar: "إضافة صورة",
  },
};

const i18n = createI18n({
  legacy: false,
  locale: languageConfig.defaultLanguage,
  globalInjection: true,
  messages,
});

export default i18n;
