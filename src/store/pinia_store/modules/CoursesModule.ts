import {defineStore} from "pinia";
import {Course, NewCourseData, CourseFilters} from "@/types/Courses";

import coursesService from "@/core/repositories/CoursesService";
import {Package, PackageAddData, PackageFilter, SelectCoursesDto} from "@/types/Packages/Packages";
import {UnwrapNestedRefs, UnwrapRef} from "vue";
import CoursesService from "@/core/repositories/CoursesService";

export const useCoursesStore = defineStore({
    id: "coursesStore",
    state: () => ({
        courses: [] as Course[],
        pagination: {
            total: 0,
            currentPage: 1,
            currentSize: 0,
        },
        searchValue: "",

        isSwitchingCourseStatus: false,

        selectedCourse: null as Course | null,
        dataIsLoading: false,
        isCreatingNewItem: false,
        isUpdatingItem: false,
        isDeletingItem: false,

        errorMessage: "",
        errorLoadingData: false,


        //// packages
        selectedCoursesForPackage: [] as SelectCoursesDto[],
        coursesToSelectToAddToPackage: tableData as SelectCoursesDto[],
        packages: [] as Package[],
        selectedPackage: null as Package | null,
    }),

    actions: {
        async loadCourses(params: CourseFilters) {
            this.dataIsLoading = true;
            this.errorLoadingData = false;

            try {
                const items = await coursesService.getCourses(params);

                this.courses = items;
            } catch (e) {
                console.log((e as Error).message);
            } finally {
                this.dataIsLoading = false;
            }
        },
        unselectCourse() {
            this.selectedCourse = null;
        },
        selectCourse(selectedCourse: Course) {
            this.selectedCourse = selectedCourse;
        },
        async updateItem(newValues: NewCourseData) {
            this.isUpdatingItem = true;
            try {
                if (!this.selectedCourse) {
                    throw Error("no selected course");
                }

                const index = this.courses.findIndex(
                    (course) => course.id === this.selectedCourse!.id
                );

                await coursesService.updateCourse(this.selectedCourse.id, newValues);

                this.courses[index] = {...this.selectedCourse, ...newValues};
                this.isUpdatingItem = false;
            } catch (error) {
                this.isUpdatingItem = false;
                console.log(error);
            }
        },
        async createNewItem(courseData: NewCourseData) {
            this.isCreatingNewItem = true;
            try {
                const res = await coursesService.createCourse(courseData);
                this.courses.push(res.data.data);
                this.isCreatingNewItem = false;
            } catch (error) {
                this.isCreatingNewItem = false;
                console.log(error);
            }
        },
        async deleteItem() {
            this.isDeletingItem = true;

            if (!this.selectedCourse) {
                console.error("no course selected");
                return;
            }

            try {
                await coursesService.deleteCourse(this.selectedCourse.id);
                this.courses = this.courses.filter(
                    (item) => item.id !== this.selectedCourse?.id
                );
                this.unselectCourse();
            } catch (error) {
                console.log(error);
            } finally {
                this.isDeletingItem = false;
            }
        },
        async loadCoursesToAddToPackage(value: string): Promise<SelectCoursesDto[]> {

            this.coursesToSelectToAddToPackage = [];
            return []
        },
        async unselectCourseForPackage(id: string) {
            this.selectedCoursesForPackage = this.selectedCoursesForPackage.filter(x => x.id != id);
        },
        async createPackage(data: PackageAddData) {

            try {
                const result = await CoursesService.createPackage(data);

            } catch (error) {

            }
        },
        async loadPackages(params: PackageFilter) {
            this.dataIsLoading = true;
            this.errorLoadingData = false;

            try {

                this.packages = dummyData;
                // const items = await coursesService.getPackages(params);

                // this.packages = items;

            } catch (e) {
                console.log((e as Error).message);
            } finally {
                this.dataIsLoading = false;
            }
        },
         getPackageById(id: string){

            return this.packages.find(x=> x.id == id)

        },
        selectPackage (packageRow: Package){
            this.selectedPackage = packageRow
        },
        unSelectPackage (packageRow: Package){
            this.selectedPackage = null
        },
    },
});

const dummyData: Package[] = [
    {
        id: "1",
        title: "Package 1",
        englishTitle: "Package 1 (English)",
        description: "Description for Package 1",
        englishDescription: "English Description for Package 1",
        gradeSubjectId: "grade1",
        price: 9.99,
        logoPath: "/images/package1.png",
        packageStatus: "active",
        courses: [

        ],
        packageType: "basic",
        createdAt: "2023-10-01",
        lastUpdated: "2023-10-01",
    },
    // Add more dummy data entries...
    {
        id: "2",
        title: "Package 2",
        englishTitle: "Package 2 (English)",
        description: "Description for Package 2",
        englishDescription: "English Description for Package 2",
        gradeSubjectId: "grade2",
        price: 19.99,
        logoPath: "/images/package2.png",
        packageStatus: "inactive",
        courses: [
        ],
        packageType: "premium",
        createdAt: "2023-10-02",
        lastUpdated: "2023-10-03",
    },
    {
        id: "3",
        title: "Package 3",
        englishTitle: "Package 3 (English)",
        description: "Description for Package 3",
        englishDescription: "English Description for Package 3",
        gradeSubjectId: "grade3",
        price: 14.99,
        logoPath: "/images/package3.png",
        packageStatus: "active",
        courses: [

        ],
        packageType: "basic",
        createdAt: "2023-10-04",
        lastUpdated: "2023-10-04",
    },
    {
        id: "4",
        title: "Package 4",
        englishTitle: "Package 4 (English)",
        description: "Description for Package 4",
        englishDescription: "English Description for Package 4",
        gradeSubjectId: "grade4",
        price: 24.99,
        logoPath: "/images/package4.png",
        packageStatus: "active",
        courses: [

        ],
        packageType: "premium",
        createdAt: "2023-10-05",
        lastUpdated: "2023-10-05",
    },
    {
        id: "5",
        title: "Package 5",
        englishTitle: "Package 5 (English)",
        description: "Description for Package 5",
        englishDescription: "English Description for Package 5",
        gradeSubjectId: "grade5",
        price: 12.99,
        logoPath: "/images/package5.png",
        packageStatus: "inactive",
        courses: [

        ],
        packageType: "basic",
        createdAt: "2023-10-06",
        lastUpdated: "2023-10-06",
    },
    // Add more dummy data entries...
];


const tableData: SelectCoursesDto[] = [
    {
        id: "id1",
        logoPath: "logo/logo.png",
        subjectName: '2016-05-03',
        name: 'Tom',
        englishName: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: "id1",
        logoPath: "logo/logo.png",
        subjectName: '2016-05-04',
        name: 'Tom',
        englishName: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: "2",
        logoPath: "logo/logo.png",
        subjectName: '2016-05-01',
        name: 'Tom',
        englishName: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: "3",
        logoPath: "logo/logo.png",
        subjectName: '2016-05-08',
        name: 'Tom',
        englishName: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: "4",
        logoPath: "logo/logo.png",
        subjectName: '2016-05-08',
        name: 'Tom',
        englishName: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: "5",
        logoPath: "logo/logo.png",
        subjectName: '2016-05-08',
        name: 'Tom',
        englishName: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: "6",
        logoPath: "logo/logo.png",
        subjectName: '2016-05-08',
        name: 'Tom',
        englishName: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: "7",
        logoPath: "logo/logo.png",
        subjectName: '2016-05-08',
        name: 'Tom',
        englishName: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: "8",
        logoPath: "logo/logo.png",
        subjectName: '2016-05-08',
        name: 'Tom',
        englishName: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: "9",
        logoPath: "logo/logo.png",
        subjectName: '2016-05-06',
        name: 'Tom',
        englishName: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: "10",
        logoPath: "logo/logo.png",
        subjectName: '2016-05-07',
        name: 'Tom',
        englishName: 'No. 189, Grove St, Los Angeles',
    },
]




